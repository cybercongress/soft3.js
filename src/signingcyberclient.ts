import {
  encodeSecp256k1Pubkey,
  makeSignDoc as makeSignDocAmino,
} from "@cosmjs/amino";
import { sha256 } from "@cosmjs/crypto";
import {
  EncodeObject,
  encodePubkey,
  isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc,
  OfflineSigner,
  Registry,
  TxBodyEncodeObject,
} from "@cosmjs/proto-signing";
import {
  AminoTypes,
  BroadcastTxFailure,
  BroadcastTxResponse,
  buildFeeTable,
  Coin,
  defaultGasLimits as defaultStargateGasLimits,
  defaultRegistryTypes,
  GasLimits,
  GasPrice,
  isBroadcastTxFailure,
  logs,
  MsgDelegateEncodeObject,
  MsgSendEncodeObject,
  MsgUndelegateEncodeObject,
  MsgWithdrawDelegatorRewardEncodeObject,
  MsgTransferEncodeObject,
  SignerData,
  StdFee,
} from "@cosmjs/stargate";
import { fromBase64, toHex, toUtf8 } from "@cosmjs/encoding";
import { Int53, Uint53 } from "@cosmjs/math";
import { MsgCyberlink } from "./codec/cyber/graph/v1beta1/tx";
import { MsgInvestmint } from "./codec/cyber/resources/v1beta1/tx";
import {
  MsgCreateRoute,
  MsgDeleteRoute,
  MsgEditRoute,
  MsgEditRouteAlias,
} from "./codec/cyber/energy/v1beta1/tx";
import { CyberClient } from "./cyberclient";
import { MsgWithdrawDelegatorReward } from "@cosmjs/stargate/build/codec/cosmos/distribution/v1beta1/tx";
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from "@cosmjs/stargate/build/codec/cosmos/staking/v1beta1/tx";
import { SignMode } from "@cosmjs/stargate/build/codec/cosmos/tx/signing/v1beta1/signing";
import { TxRaw } from "@cosmjs/stargate/build/codec/cosmos/tx/v1beta1/tx";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";
import {
  MsgClearAdminEncodeObject,
  MsgExecuteContractEncodeObject,
  MsgInstantiateContractEncodeObject,
  MsgMigrateContractEncodeObject,
  MsgStoreCodeEncodeObject,
  MsgUpdateAdminEncodeObject,
  defaultGasLimits as defaultCosmWasmGasLimits,
  ChangeAdminResult,
  CosmWasmFeeTable, // part of SigningCosmWasmClientOptions
  ExecuteResult,
  InstantiateOptions,
  InstantiateResult,
  MigrateResult,
  UploadMeta,
  UploadResult,
  cosmWasmTypes,
} from "@cosmjs/cosmwasm-stargate";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "@cosmjs/cosmwasm-stargate/build/codec/cosmwasm/wasm/v1beta1/tx";
import { isValidBuilder } from "@cosmjs/cosmwasm-launchpad";
import pako from "pako";
import Long from "long";
import { MsgTransfer } from "@cosmjs/stargate/build/codec/ibc/applications/transfer/v1/tx";
import { Height } from "@cosmjs/stargate/build/codec/ibc/core/client/v1/client";
import {
  MsgBeginRedelegateEncodeObject,
  isMsgBeginRedelegateEncodeObject,
  MsgCreateRouteEncodeObject,
  isMsgCreateRouteEncodeObject,
  MsgDeleteRouteEncodeObject,
  isMsgDeleteRouteEncodeObject,
  MsgEditRouteEncodeObject,
  isMsgEditRouteEncodeObject,
  MsgEditRouteAliasEncodeObject,
  isMsgEditRouteAliasEncodeObject,
  MsgCyberlinkEncodeObject,
  isMsgCyberlinkEncodeObject,
  MsgInvestmintEncodeObject,
  isMsgInvestmintEncodeObject,
} from "./encodeobjects";

export interface CyberFeeTable extends CosmWasmFeeTable {
  readonly cyberlink: StdFee;
  readonly investmint: StdFee;
  readonly createRoute: StdFee;
  readonly editRoute: StdFee;
  readonly editRouteAlias: StdFee;
  readonly deleteRoute: StdFee;
}

function prepareBuilder(builder: string | undefined): string {
  if (builder === undefined) {
    return ""; // normalization needed by backend
  } else {
    if (!isValidBuilder(builder))
      throw new Error("The builder (Docker Hub image with tag) is not valid");
    return builder;
  }
}

export const defaultGasPrice = GasPrice.fromString("0.001boot");

export const defaultGasLimits: GasLimits<CyberFeeTable> = {
  ...defaultStargateGasLimits,
  ...defaultCosmWasmGasLimits,
  cyberlink: 256000,
  investmint: 160000,
  createRoute: 128000,
  editRoute: 128000,
  editRouteAlias: 128000,
  deleteRoute: 128000,
};

export interface CyberlinkResult {
  readonly logs: readonly logs.Log[];
  readonly transactionHash: string;
}

export interface InvestmintResult {
  readonly logs: readonly logs.Log[];
  readonly transactionHash: string;
}

export interface CreateRouteResult {
  readonly logs: readonly logs.Log[];
  readonly transactionHash: string;
}

export interface EditRouteResult {
  readonly logs: readonly logs.Log[];
  readonly transactionHash: string;
}

export interface DeleteRouteResult {
  readonly logs: readonly logs.Log[];
  readonly transactionHash: string;
}

export interface EditRouteAliasResult {
  readonly logs: readonly logs.Log[];
  readonly transactionHash: string;
}

function createBroadcastTxErrorMessage(result: BroadcastTxFailure): string {
  return `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`;
}

function createDefaultRegistry(): Registry {
  return new Registry([
    ...defaultRegistryTypes,
    ["/cosmwasm.wasm.v1beta1.MsgClearAdmin", MsgClearAdmin],
    ["/cosmwasm.wasm.v1beta1.MsgExecuteContract", MsgExecuteContract],
    ["/cosmwasm.wasm.v1beta1.MsgMigrateContract", MsgMigrateContract],
    ["/cosmwasm.wasm.v1beta1.MsgStoreCode", MsgStoreCode],
    ["/cosmwasm.wasm.v1beta1.MsgInstantiateContract", MsgInstantiateContract],
    ["/cosmwasm.wasm.v1beta1.MsgUpdateAdmin", MsgUpdateAdmin],
    ["/cyber.graph.v1beta1.MsgCyberlink", MsgCyberlink],
    ["/cyber.resources.v1beta1.MsgInvestmint", MsgInvestmint],
    ["/cyber.energy.v1beta1.MsgCreateRoute", MsgCreateRoute],
    ["/cyber.energy.v1beta1.MsgEditRoute", MsgEditRoute],
    ["/cyber.energy.v1beta1.MsgEditRouteAlias", MsgEditRouteAlias],
    ["/cyber.energy.v1beta1.MsgDeleteRoute", MsgDeleteRoute],
  ]);
}

export interface SigningCyberClientOptions {
  readonly registry?: Registry;
  readonly aminoTypes?: AminoTypes;
  readonly prefix?: string;
  readonly gasPrice?: GasPrice;
  readonly gasLimits?: Partial<GasLimits<CyberFeeTable>>;
  readonly broadcastTimeoutMs?: number;
  readonly broadcastPollIntervalMs?: number;
}

export class SigningCyberClient extends CyberClient {
  public readonly fees: CyberFeeTable;
  public readonly registry: Registry;
  public readonly broadcastTimeoutMs: number | undefined;
  public readonly broadcastPollIntervalMs: number | undefined;

  private readonly signer: OfflineSigner;
  private readonly aminoTypes: AminoTypes;

  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningCyberClientOptions = {}
  ): Promise<SigningCyberClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SigningCyberClient(tmClient, signer, options);
  }

  /**
   * Creates a client in offline mode.
   *
   * This should only be used in niche cases where you know exactly what you're doing,
   * e.g. when building an offline signing application.
   *
   * When you try to use online functionality with such a signer, an
   * exception will be raised.
   */
  public static async offline(
    signer: OfflineSigner,
    options: SigningCyberClientOptions = {}
  ): Promise<SigningCyberClient> {
    return new SigningCyberClient(undefined, signer, options);
  }

  protected constructor(
    tmClient: Tendermint34Client | undefined,
    signer: OfflineSigner,
    options: SigningCyberClientOptions
  ) {
    super(tmClient);
    const {
      registry = createDefaultRegistry(),
      // TODO add cyber's amino types
      aminoTypes = new AminoTypes({
        additions: cosmWasmTypes,
        prefix: options.prefix,
      }),
      gasPrice = defaultGasPrice,
      gasLimits = {},
    } = options;
    this.fees = buildFeeTable<CyberFeeTable>(
      gasPrice,
      defaultGasLimits,
      gasLimits
    );
    this.registry = registry;
    this.aminoTypes = aminoTypes;
    this.signer = signer;
    this.broadcastTimeoutMs = options.broadcastTimeoutMs;
    this.broadcastPollIntervalMs = options.broadcastPollIntervalMs;
  }

  public async cyberlink(
    senderAddress: string,
    from: string,
    to: string,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const cyberlinkMsg: MsgCyberlinkEncodeObject = {
      typeUrl: "/cyber.graph.v1beta1.MsgCyberlink",
      value: {
        address: senderAddress,
        links: [
          {
            from: from,
            to: to,
          },
        ],
      },
    };

    return this.signAndBroadcast(
      senderAddress,
      [cyberlinkMsg],
      this.fees.cyberlink,
      memo
    );
  }

  public async investmint(
    senderAddress: string,
    amount: Coin,
    resource: string,
    length: number,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const investmintMsg: MsgInvestmintEncodeObject = {
      typeUrl: "/cyber.resources.v1beta1.MsgInvestmint",
      value: MsgInvestmint.fromPartial({
        agent: senderAddress,
        amount: amount,
        resource: resource,
        length: Long.fromString(new Uint53(length).toString()),
      }),
    };
    return this.signAndBroadcast(
      senderAddress,
      [investmintMsg],
      this.fees.investmint,
      memo
    );
  }

  public async createEnergyRoute(
    senderAddress: string,
    destination: string,
    alias: string,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const createEnergyRouteMsg: MsgCreateRouteEncodeObject = {
      typeUrl: "/cyber.energy.v1beta1.MsgCreateRoute",
      value: MsgCreateRoute.fromPartial({
        source: senderAddress,
        destination: destination,
        alias: alias,
      }),
    };
    return this.signAndBroadcast(
      senderAddress,
      [createEnergyRouteMsg],
      this.fees.createRoute,
      memo
    );
  }

  public async editEnergyRoute(
    senderAddress: string,
    destination: string,
    value: Coin,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const editEnergyRouteMsg: MsgEditRouteEncodeObject = {
      typeUrl: "/cyber.energy.v1beta1.MsgEditRoute",
      value: MsgEditRoute.fromPartial({
        source: senderAddress,
        destination: destination,
        value: value,
      }),
    };
    return this.signAndBroadcast(
      senderAddress,
      [editEnergyRouteMsg],
      this.fees.editRoute,
      memo
    );
  }

  public async deleteEnergyRoute(
    senderAddress: string,
    destination: string,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const deleteEnergyRouteMsg: MsgDeleteRouteEncodeObject = {
      typeUrl: "/cyber.energy.v1beta1.MsgDeleteRoute",
      value: MsgDeleteRoute.fromPartial({
        source: senderAddress,
        destination: destination,
      }),
    };
    return this.signAndBroadcast(
      senderAddress,
      [deleteEnergyRouteMsg],
      this.fees.deleteRoute,
      memo
    );
  }

  public async editEnergyRouteAlias(
    senderAddress: string,
    destination: string,
    alias: string,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const editEnergyRouteAliasMsg: MsgEditRouteAliasEncodeObject = {
      typeUrl: "/cyber.energy.v1beta1.MsgEditRouteAlias",
      value: MsgEditRouteAlias.fromPartial({
        source: senderAddress,
        destination: destination,
        alias: alias,
      }),
    };

    return this.signAndBroadcast(
      senderAddress,
      [editEnergyRouteAliasMsg],
      this.fees.editRouteAlias,
      memo
    );
  }

  /** Uploads code and returns a receipt, including the code ID */
  public async upload(
    senderAddress: string,
    wasmCode: Uint8Array,
    meta: UploadMeta = {},
    memo = ""
  ): Promise<UploadResult> {
    const source = meta.source || "";
    const builder = prepareBuilder(meta.builder);
    const compressed = pako.gzip(wasmCode, { level: 9 });
    const storeCodeMsg: MsgStoreCodeEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgStoreCode",
      value: MsgStoreCode.fromPartial({
        sender: senderAddress,
        wasmByteCode: compressed,
        source: source,
        builder: builder,
      }),
    };

    const result = await this.signAndBroadcast(
      senderAddress,
      [storeCodeMsg],
      this.fees.upload,
      memo
    );
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    const parsedLogs = logs.parseRawLog(result.rawLog);
    const codeIdAttr = logs.findAttribute(parsedLogs, "message", "code_id");
    return {
      originalSize: wasmCode.length,
      originalChecksum: toHex(sha256(wasmCode)),
      compressedSize: compressed.length,
      compressedChecksum: toHex(sha256(compressed)),
      codeId: Number.parseInt(codeIdAttr.value, 10),
      logs: parsedLogs,
      transactionHash: result.transactionHash,
    };
  }

  public async instantiate(
    senderAddress: string,
    codeId: number,
    msg: Record<string, unknown>,
    label: string,
    options: InstantiateOptions = {}
  ): Promise<InstantiateResult> {
    const instantiateContractMsg: MsgInstantiateContractEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgInstantiateContract",
      value: MsgInstantiateContract.fromPartial({
        sender: senderAddress,
        codeId: Long.fromString(new Uint53(codeId).toString()),
        label: label,
        initMsg: toUtf8(JSON.stringify(msg)),
        funds: [...(options.transferAmount || [])],
        admin: options.admin,
      }),
    };
    const result = await this.signAndBroadcast(
      senderAddress,
      [instantiateContractMsg],
      this.fees.init,
      options.memo
    );
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    const parsedLogs = logs.parseRawLog(result.rawLog);
    const contractAddressAttr = logs.findAttribute(
      parsedLogs,
      "message",
      "contract_address"
    );
    return {
      contractAddress: contractAddressAttr.value,
      logs: parsedLogs,
      transactionHash: result.transactionHash,
    };
  }

  public async updateAdmin(
    senderAddress: string,
    contractAddress: string,
    newAdmin: string,
    memo = ""
  ): Promise<ChangeAdminResult> {
    const updateAdminMsg: MsgUpdateAdminEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgUpdateAdmin",
      value: MsgUpdateAdmin.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        newAdmin: newAdmin,
      }),
    };
    const result = await this.signAndBroadcast(
      senderAddress,
      [updateAdminMsg],
      this.fees.changeAdmin,
      memo
    );
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: logs.parseRawLog(result.rawLog),
      transactionHash: result.transactionHash,
    };
  }

  public async clearAdmin(
    senderAddress: string,
    contractAddress: string,
    memo = ""
  ): Promise<ChangeAdminResult> {
    const clearAdminMsg: MsgClearAdminEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgClearAdmin",
      value: MsgClearAdmin.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
      }),
    };
    const result = await this.signAndBroadcast(
      senderAddress,
      [clearAdminMsg],
      this.fees.changeAdmin,
      memo
    );
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: logs.parseRawLog(result.rawLog),
      transactionHash: result.transactionHash,
    };
  }

  public async migrate(
    senderAddress: string,
    contractAddress: string,
    codeId: number,
    migrateMsg: Record<string, unknown>,
    memo = ""
  ): Promise<MigrateResult> {
    const migrateContractMsg: MsgMigrateContractEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgMigrateContract",
      value: MsgMigrateContract.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        codeId: Long.fromString(new Uint53(codeId).toString()),
        migrateMsg: toUtf8(JSON.stringify(migrateMsg)),
      }),
    };
    const result = await this.signAndBroadcast(
      senderAddress,
      [migrateContractMsg],
      this.fees.migrate,
      memo
    );
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: logs.parseRawLog(result.rawLog),
      transactionHash: result.transactionHash,
    };
  }

  public async execute(
    senderAddress: string,
    contractAddress: string,
    msg: Record<string, unknown>,
    memo = "",
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> {
    const executeContractMsg: MsgExecuteContractEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        msg: toUtf8(JSON.stringify(msg)),
        funds: [...(funds || [])],
      }),
    };
    const result = await this.signAndBroadcast(
      senderAddress,
      [executeContractMsg],
      this.fees.exec,
      memo
    );
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: logs.parseRawLog(result.rawLog),
      transactionHash: result.transactionHash,
    };
  }

  public async sendTokens(
    senderAddress: string,
    recipientAddress: string,
    amount: readonly Coin[],
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const sendMsg: MsgSendEncodeObject = {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: senderAddress,
        toAddress: recipientAddress,
        amount: [...amount],
      },
    };
    console.log(`this.fees.send,`, this.fees.send);
    return this.signAndBroadcast(
      senderAddress,
      [sendMsg],
      this.fees.send,
      memo
    );
  }

  public async delegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const delegateMsg: MsgDelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
      value: MsgDelegate.fromPartial({
        delegatorAddress: delegatorAddress,
        validatorAddress,
        amount,
      }),
    };
    return this.signAndBroadcast(
      delegatorAddress,
      [delegateMsg],
      this.fees.delegate,
      memo
    );
  }

  public async redelegateTokens(
    delegatorAddress: string,
    validatorSrcAddress: string,
    validatorDstAddress: string,
    amount: Coin,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const redelegateMsg: MsgBeginRedelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
      value: MsgBeginRedelegate.fromPartial({
        delegatorAddress: delegatorAddress,
        validatorSrcAddress,
        validatorDstAddress,
        amount,
      }),
    };
    return this.signAndBroadcast(
      delegatorAddress,
      [redelegateMsg],
      this.fees.delegate,
      memo
    );
  }

  public async undelegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const undelegateMsg: MsgUndelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
      value: MsgUndelegate.fromPartial({
        delegatorAddress: delegatorAddress,
        validatorAddress,
        amount,
      }),
    };
    return this.signAndBroadcast(
      delegatorAddress,
      [undelegateMsg],
      this.fees.undelegate,
      memo
    );
  }

  public async withdrawRewards(
    delegatorAddress: string,
    validatorAddresses: string[],
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const msgs = validatorAddresses.map((validatorAddress) => {
      return {
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: {
          delegatorAddress: delegatorAddress,
          validatorAddress: validatorAddress,
        },
      };
    });
    // const withdrawDelegatorRewardMsg: MsgWithdrawDelegatorRewardEncodeObject = {
    //   typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    //   value: MsgWithdrawDelegatorReward.fromPartial({
    //     delegatorAddress: delegatorAddress,
    //     validatorAddress,
    //   }),
    // };

    return this.signAndBroadcast(
      delegatorAddress,
      msgs,
      this.fees.withdraw,
      memo
    );
  }

  public async sendIbcTokens(
    senderAddress: string,
    recipientAddress: string,
    transferAmount: Coin,
    sourcePort: string,
    sourceChannel: string,
    timeoutHeight: Height | undefined,
    /** timeout in seconds */
    timeoutTimestamp: number | undefined,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const timeoutTimestampNanoseconds = timeoutTimestamp
      ? Long.fromNumber(timeoutTimestamp).multiply(1_000_000_000)
      : undefined;
    const transferMsg: MsgTransferEncodeObject = {
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: MsgTransfer.fromPartial({
        sourcePort: sourcePort,
        sourceChannel: sourceChannel,
        sender: senderAddress,
        receiver: recipientAddress,
        token: transferAmount,
        timeoutHeight: timeoutHeight,
        timeoutTimestamp: timeoutTimestampNanoseconds,
      }),
    };
    return this.signAndBroadcast(
      senderAddress,
      [transferMsg],
      this.fees.transfer,
      memo
    );
  }

  // -------------------------------------------------------- //

  /**
   * Creates a transaction with the given messages, fee and memo. Then signs and broadcasts the transaction.
   *
   * @param signerAddress The address that will sign transactions using this instance. The signer must be able to sign with this address.
   * @param messages
   * @param fee
   * @param memo
   */
  public async signAndBroadcast(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const txRaw = await this.sign(signerAddress, messages, fee, memo);
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastTx(
      txBytes,
      this.broadcastTimeoutMs,
      this.broadcastPollIntervalMs
    );
  }

  public async sign(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    explicitSignerData?: SignerData
  ): Promise<TxRaw> {
    let signerData: SignerData;
    if (explicitSignerData) {
      signerData = explicitSignerData;
    } else {
      const { accountNumber, sequence } = await this.getSequence(signerAddress);
      const chainId = await this.getChainId();
      signerData = {
        accountNumber: accountNumber,
        sequence: sequence,
        chainId: chainId,
      };
    }

    return isOfflineDirectSigner(this.signer)
      ? this.signDirect(signerAddress, messages, fee, memo, signerData)
      : this.signAmino(signerAddress, messages, fee, memo, signerData);
  }

  private async signAmino(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData
  ): Promise<TxRaw> {
    assert(!isOfflineDirectSigner(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey(
      encodeSecp256k1Pubkey(accountFromSigner.pubkey)
    );
    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
    const signDoc = makeSignDocAmino(
      msgs,
      fee,
      chainId,
      memo,
      accountNumber,
      sequence
    );
    const { signature, signed } = await this.signer.signAmino(
      signerAddress,
      signDoc
    );
    const signedTxBody: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: signed.msgs.map((msg) => this.aminoTypes.fromAmino(msg)),
        memo: signed.memo,
      },
    };
    const signedTxBodyBytes = this.registry.encode(signedTxBody);
    const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
    const signedSequence = Int53.fromString(signed.sequence).toNumber();
    const signedAuthInfoBytes = makeAuthInfoBytes(
      [pubkey],
      signed.fee.amount,
      signedGasLimit,
      signedSequence,
      signMode
    );
    return TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }

  private async signDirect(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData
  ): Promise<TxRaw> {
    assert(isOfflineDirectSigner(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey(
      encodeSecp256k1Pubkey(accountFromSigner.pubkey)
    );
    const txBody: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: messages,
        memo: memo,
      },
    };
    const txBodyBytes = this.registry.encode(txBody);
    const gasLimit = Int53.fromString(fee.gas).toNumber();
    const authInfoBytes = makeAuthInfoBytes(
      [pubkey],
      fee.amount,
      gasLimit,
      sequence
    );
    const signDoc = makeSignDoc(
      txBodyBytes,
      authInfoBytes,
      chainId,
      accountNumber
    );
    const { signature, signed } = await this.signer.signDirect(
      signerAddress,
      signDoc
    );
    return TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }
}
