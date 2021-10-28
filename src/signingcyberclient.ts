import { encodeSecp256k1Pubkey, makeSignDoc as makeSignDocAmino } from "@cosmjs/amino";
import {
  ChangeAdminResult,
  cosmWasmTypes,
  ExecuteResult,
  InstantiateOptions,
  InstantiateResult,
  MigrateResult,
  MsgClearAdminEncodeObject,
  MsgExecuteContractEncodeObject,
  MsgInstantiateContractEncodeObject,
  MsgMigrateContractEncodeObject,
  MsgStoreCodeEncodeObject,
  MsgUpdateAdminEncodeObject,
  UploadResult,
} from "@cosmjs/cosmwasm-stargate";
import { JsonObject } from "@cosmjs/cosmwasm-stargate";
import { sha256 } from "@cosmjs/crypto";
import { fromBase64, toHex, toUtf8 } from "@cosmjs/encoding";
import { Int53, Uint53 } from "@cosmjs/math";
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
  Coin,
  defaultRegistryTypes,
  isBroadcastTxFailure,
  logs,
  MsgDelegateEncodeObject,
  MsgSendEncodeObject,
  MsgTransferEncodeObject,
  MsgUndelegateEncodeObject,
  MsgWithdrawDelegatorRewardEncodeObject,
  SignerData,
  StdFee,
} from "@cosmjs/stargate";
import { longify } from "@cosmjs/stargate/build/queries/utils";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";
import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import { VoteOption } from "cosmjs-types/cosmos/gov/v1beta1/gov";
import { MsgDeposit, MsgSubmitProposal, MsgVote } from "cosmjs-types/cosmos/gov/v1beta1/tx";
import { MsgBeginRedelegate, MsgDelegate, MsgUndelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import Long from "long";
import pako from "pako";

import { createCyberTypes } from "./aminomsgs";
import { MsgCyberlink } from "./codec/cyber/graph/v1beta1/tx";
import {
  MsgCreateRoute,
  MsgDeleteRoute,
  MsgEditRoute,
  MsgEditRouteName,
} from "./codec/cyber/grid/v1beta1/tx";
import { MsgInvestmint } from "./codec/cyber/resources/v1beta1/tx";
import {
  MsgCreatePool,
  MsgDepositWithinBatch,
  MsgSwapWithinBatch,
  MsgWithdrawWithinBatch,
} from "./codec/tendermint/liquidity/v1beta1/tx";
import { CyberClient } from "./cyberclient";
import {
  MsgBeginRedelegateEncodeObject,
  MsgCreatePoolEncodeObject,
  MsgCreateRouteEncodeObject,
  MsgCyberlinkEncodeObject,
  MsgDeleteRouteEncodeObject,
  MsgDepositEncodeObject,
  MsgDepositWithinBatchEncodeObject,
  MsgEditRouteNameEncodeObject,
  MsgEditRouteEncodeObject,
  MsgInvestmintEncodeObject,
  MsgSubmitProposalEncodeObject,
  MsgSwapWithinBatchEncodeObject,
  MsgVoteEncodeObject,
  MsgWithdrawWithinBatchEncodeObject,
} from "./encodeobjects";

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

export interface EditRouteNameResult {
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
    ["/cyber.grid.v1beta1.MsgCreateRoute", MsgCreateRoute],
    ["/cyber.grid.v1beta1.MsgEditRoute", MsgEditRoute],
    ["/cyber.grid.v1beta1.MsgEditRouteName", MsgEditRouteName],
    ["/cyber.grid.v1beta1.MsgDeleteRoute", MsgDeleteRoute],
    ["/tendermint.liquidity.v1beta1.MsgSwapWithinBatch", MsgSwapWithinBatch],
    ["/tendermint.liquidity.v1beta1.MsgDepositWithinBatch", MsgDepositWithinBatch],
    ["/tendermint.liquidity.v1beta1.MsgWithdrawWithinBatch", MsgWithdrawWithinBatch],
    ["/tendermint.liquidity.v1beta1.MsgCreatePool", MsgCreatePool],
    ["/cosmos.gov.v1beta1.MsgVote", MsgDeposit],
  ]);
}

export interface SigningCyberClientOptions {
  readonly registry?: Registry;
  readonly aminoTypes?: AminoTypes;
  readonly prefix?: string;
  readonly broadcastTimeoutMs?: number;
  readonly broadcastPollIntervalMs?: number;
}

export class SigningCyberClient extends CyberClient {
  public readonly registry: Registry;
  public readonly broadcastTimeoutMs: number | undefined;
  public readonly broadcastPollIntervalMs: number | undefined;

  private readonly signer: OfflineSigner;
  private readonly aminoTypes: AminoTypes;

  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningCyberClientOptions = {},
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
    options: SigningCyberClientOptions = {},
  ): Promise<SigningCyberClient> {
    return new SigningCyberClient(undefined, signer, options);
  }

  protected constructor(
    tmClient: Tendermint34Client | undefined,
    signer: OfflineSigner,
    options: SigningCyberClientOptions,
  ) {
    super(tmClient);
    const {
      registry = createDefaultRegistry(),
      // TODO add cyber's amino types
      aminoTypes = new AminoTypes({
        additions: createCyberTypes(),
        prefix: options.prefix,
      }),
    } = options;
    this.registry = registry;
    this.aminoTypes = aminoTypes;
    this.signer = signer;
    this.broadcastTimeoutMs = options.broadcastTimeoutMs;
    this.broadcastPollIntervalMs = options.broadcastPollIntervalMs;
  }

  // Graph module

  public async cyberlink(
    neuron: string,
    from: string,
    to: string,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const cyberlinkMsg: MsgCyberlinkEncodeObject = {
      typeUrl: "/cyber.graph.v1beta1.MsgCyberlink",
      value: {
        neuron: neuron,
        links: [
          {
            from: from,
            to: to,
          },
        ],
      },
    };

    return this.signAndBroadcast(neuron, [cyberlinkMsg], fee, memo);
  }

  // Resources module

  public async investmint(
    senderAddress: string,
    amount: Coin,
    resource: string,
    length: number,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const investmintMsg: MsgInvestmintEncodeObject = {
      typeUrl: "/cyber.resources.v1beta1.MsgInvestmint",
      value: MsgInvestmint.fromPartial({
        neuron: senderAddress,
        amount: amount,
        resource: resource,
        length: Long.fromString(new Uint53(length).toString()),
      }),
    };
    return this.signAndBroadcast(senderAddress, [investmintMsg], fee, memo);
  }

  // Energy module

  public async createEnergyRoute(
    senderAddress: string,
    destination: string,
    name: string,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const createEnergyRouteMsg: MsgCreateRouteEncodeObject = {
      typeUrl: "/cyber.grid.v1beta1.MsgCreateRoute",
      value: MsgCreateRoute.fromPartial({
        source: senderAddress,
        destination: destination,
        name: name,
      }),
    };
    return this.signAndBroadcast(senderAddress, [createEnergyRouteMsg], fee, memo);
  }

  public async editEnergyRoute(
    senderAddress: string,
    destination: string,
    value: Coin,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const editEnergyRouteMsg: MsgEditRouteEncodeObject = {
      typeUrl: "/cyber.grid.v1beta1.MsgEditRoute",
      value: MsgEditRoute.fromPartial({
        source: senderAddress,
        destination: destination,
        value: value,
      }),
    };
    return this.signAndBroadcast(senderAddress, [editEnergyRouteMsg], fee, memo);
  }

  public async deleteEnergyRoute(
    senderAddress: string,
    destination: string,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const deleteEnergyRouteMsg: MsgDeleteRouteEncodeObject = {
      typeUrl: "/cyber.grid.v1beta1.MsgDeleteRoute",
      value: MsgDeleteRoute.fromPartial({
        source: senderAddress,
        destination: destination,
      }),
    };
    return this.signAndBroadcast(senderAddress, [deleteEnergyRouteMsg], fee, memo);
  }

  public async editEnergyRouteName(
    senderAddress: string,
    destination: string,
    name: string,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const editEnergyRouteNameMsg: MsgEditRouteNameEncodeObject = {
      typeUrl: "/cyber.grid.v1beta1.MsgEditRouteName",
      value: MsgEditRouteName.fromPartial({
        source: senderAddress,
        destination: destination,
        name: name,
      }),
    };

    return this.signAndBroadcast(senderAddress, [editEnergyRouteNameMsg], fee, memo);
  }

  // Wasm module

  /** Uploads code and returns a receipt, including the code ID */
  public async upload(
    senderAddress: string,
    wasmCode: Uint8Array,
    fee: StdFee,
    memo = "",
  ): Promise<UploadResult> {
    const compressed = pako.gzip(wasmCode, { level: 9 });
    const storeCodeMsg: MsgStoreCodeEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
      value: MsgStoreCode.fromPartial({
        sender: senderAddress,
        wasmByteCode: compressed,
      }),
    };

    const result = await this.signAndBroadcast(senderAddress, [storeCodeMsg], fee, memo);
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
    fee: StdFee,
    options: InstantiateOptions = {},
  ): Promise<InstantiateResult> {
    const instantiateContractMsg: MsgInstantiateContractEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
      value: MsgInstantiateContract.fromPartial({
        sender: senderAddress,
        codeId: Long.fromString(new Uint53(codeId).toString()),
        label: label,
        msg: toUtf8(JSON.stringify(msg)),
        funds: [...(options.funds || [])],
        admin: options.admin,
      }),
    };
    const result = await this.signAndBroadcast(senderAddress, [instantiateContractMsg], fee, options.memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    const parsedLogs = logs.parseRawLog(result.rawLog);
    const contractAddressAttr = logs.findAttribute(parsedLogs, "message", "_contract_address");
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
    fee: StdFee,
    memo = "",
  ): Promise<ChangeAdminResult> {
    const updateAdminMsg: MsgUpdateAdminEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1.MsgUpdateAdmin",
      value: MsgUpdateAdmin.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        newAdmin: newAdmin,
      }),
    };
    const result = await this.signAndBroadcast(senderAddress, [updateAdminMsg], fee, memo);
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
    fee: StdFee,
    memo = "",
  ): Promise<ChangeAdminResult> {
    const clearAdminMsg: MsgClearAdminEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1.MsgClearAdmin",
      value: MsgClearAdmin.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
      }),
    };
    const result = await this.signAndBroadcast(senderAddress, [clearAdminMsg], fee, memo);
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
    fee: StdFee,
    memo = "",
  ): Promise<MigrateResult> {
    const migrateContractMsg: MsgMigrateContractEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1.MsgMigrateContract",
      value: MsgMigrateContract.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        codeId: Long.fromString(new Uint53(codeId).toString()),
        msg: toUtf8(JSON.stringify(migrateMsg)),
      }),
    };
    const result = await this.signAndBroadcast(senderAddress, [migrateContractMsg], fee, memo);
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
    fee: StdFee,
    memo = "",
    funds?: readonly Coin[],
  ): Promise<ExecuteResult> {
    const executeContractMsg: MsgExecuteContractEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        msg: toUtf8(JSON.stringify(msg)),
        funds: [...(funds || [])],
      }),
    };
    const result = await this.signAndBroadcast(senderAddress, [executeContractMsg], fee, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: logs.parseRawLog(result.rawLog),
      transactionHash: result.transactionHash,
    };
  }

  // Bank module

  public async sendTokens(
    senderAddress: string,
    recipientAddress: string,
    amount: readonly Coin[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const sendMsg: MsgSendEncodeObject = {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: senderAddress,
        toAddress: recipientAddress,
        amount: [...amount],
      },
    };
    // console.log(`this.fees.send,`, fee);
    return this.signAndBroadcast(senderAddress, [sendMsg], fee, memo);
  }

  // Distribution module

  public async delegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const delegateMsg: MsgDelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
      value: MsgDelegate.fromPartial({
        delegatorAddress: delegatorAddress,
        validatorAddress,
        amount,
      }),
    };
    return this.signAndBroadcast(delegatorAddress, [delegateMsg], fee, memo);
  }

  public async redelegateTokens(
    delegatorAddress: string,
    validatorSrcAddress: string,
    validatorDstAddress: string,
    amount: Coin,
    fee: StdFee,
    memo = "",
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
    return this.signAndBroadcast(delegatorAddress, [redelegateMsg], fee, memo);
  }

  public async undelegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const undelegateMsg: MsgUndelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
      value: MsgUndelegate.fromPartial({
        delegatorAddress: delegatorAddress,
        validatorAddress,
        amount,
      }),
    };
    return this.signAndBroadcast(delegatorAddress, [undelegateMsg], fee, memo);
  }

  public async withdrawRewards(
    delegatorAddress: string,
    validatorAddress: string,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const withdrawDelegatorRewardMsg: MsgWithdrawDelegatorRewardEncodeObject = {
      typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: MsgWithdrawDelegatorReward.fromPartial({ delegatorAddress: delegatorAddress, validatorAddress }),
    };
    return this.signAndBroadcast(delegatorAddress, [withdrawDelegatorRewardMsg], fee, memo);
  }

  public async withdrawAllRewards(
    delegatorAddress: string,
    validatorAddresses: string[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const msgs = validatorAddresses.map((validatorAddress) => {
      return {
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: MsgWithdrawDelegatorReward.fromPartial({
          delegatorAddress: delegatorAddress,
          validatorAddress: validatorAddress,
        }),
      };
    });

    return this.signAndBroadcast(delegatorAddress, msgs, fee, memo);
  }

  // Gov module

  public async voteProposal(
    voter: string,
    proposalId: number,
    option: number,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const voteMsg: MsgVoteEncodeObject = {
      typeUrl: "/cosmos.gov.v1beta1.MsgVote",
      value: MsgVote.fromPartial({
        proposalId: longify(proposalId),
        voter: voter,
        option: option as VoteOption | undefined,
      }),
    };
    return this.signAndBroadcast(voter, [voteMsg], fee, memo);
  }

  public async submitProposal(
    proposer: string,
    content: JsonObject,
    initialDeposit: Coin[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const sumbitProposalMsg: MsgSubmitProposalEncodeObject = {
      typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: MsgSubmitProposal.fromPartial({
        content: content,
        initialDeposit: initialDeposit,
        proposer: proposer,
      }),
    };
    return this.signAndBroadcast(proposer, [sumbitProposalMsg], fee, memo);
  }

  public async depositProposal(
    depositor: string,
    proposalId: number,
    amount: Coin[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const depositMsg: MsgDepositEncodeObject = {
      typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
      value: MsgDeposit.fromPartial({
        depositor: depositor,
        proposalId: longify(proposalId),
        amount: amount,
      }),
    };
    return this.signAndBroadcast(depositor, [depositMsg], fee, memo);
  }

  // IBC module

  public async sendIbcTokens(
    senderAddress: string,
    recipientAddress: string,
    transferAmount: Coin,
    sourcePort: string,
    sourceChannel: string,
    timeoutHeight: Height | undefined,
    /** timeout in seconds */
    timeoutTimestamp: number | undefined,
    fee: StdFee,
    memo = "",
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
    return this.signAndBroadcast(senderAddress, [transferMsg], fee, memo);
  }

  // Liquidity module

  public async swapWithinBatch(
    swapRequesterAddress: string,
    poolId: number,
    swapTypeId: number,
    offerCoin: Coin,
    demandCoinDenom: string,
    offerCoinFee: Coin,
    orderPrice: string,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const swapWithinBatchMsg: MsgSwapWithinBatchEncodeObject = {
      typeUrl: "/tendermint.liquidity.v1beta1.MsgSwapWithinBatch",
      value: MsgSwapWithinBatch.fromPartial({
        swapRequesterAddress: swapRequesterAddress,
        poolId: Long.fromString(new Uint53(poolId).toString()),
        swapTypeId: swapTypeId,
        offerCoin: offerCoin,
        demandCoinDenom: demandCoinDenom,
        offerCoinFee: offerCoinFee,
        orderPrice: orderPrice,
      }),
    };
    // console.log(swapWithinBatchMsg);
    return this.signAndBroadcast(swapRequesterAddress, [swapWithinBatchMsg], fee, memo);
  }

  public async depositWithinBatch(
    depositorAddress: string,
    poolId: number,
    depositCoins: Coin[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const depositWithinBatchMsg: MsgDepositWithinBatchEncodeObject = {
      typeUrl: "/tendermint.liquidity.v1beta1.MsgDepositWithinBatch",
      value: MsgDepositWithinBatch.fromPartial({
        depositorAddress: depositorAddress,
        poolId: Long.fromString(new Uint53(poolId).toString()),
        depositCoins: depositCoins,
      }),
    };
    // console.log(depositWithinBatchMsg);
    return this.signAndBroadcast(depositorAddress, [depositWithinBatchMsg], fee, memo);
  }

  public async withdwawWithinBatch(
    withdrawerAddress: string,
    poolId: number,
    poolCoin: Coin,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const withdrawWithinBatchMsg: MsgWithdrawWithinBatchEncodeObject = {
      typeUrl: "/tendermint.liquidity.v1beta1.MsgWithdrawWithinBatch",
      value: MsgWithdrawWithinBatch.fromPartial({
        withdrawerAddress: withdrawerAddress,
        poolId: Long.fromString(new Uint53(poolId).toString()),
        poolCoin: poolCoin,
      }),
    };
    // console.log(withdrawWithinBatchMsg);
    return this.signAndBroadcast(withdrawerAddress, [withdrawWithinBatchMsg], fee, memo);
  }

  public async createPool(
    poolCreatorAddress: string,
    poolTypeId: number,
    depositCoins: Coin[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const createPoolMsg: MsgCreatePoolEncodeObject = {
      typeUrl: "/tendermint.liquidity.v1beta1.MsgCreatePool",
      value: MsgCreatePool.fromPartial({
        poolCreatorAddress: poolCreatorAddress,
        poolTypeId: poolTypeId,
        depositCoins: depositCoins,
      }),
    };
    // console.log(createPoolMsg);
    return this.signAndBroadcast(poolCreatorAddress, [createPoolMsg], fee, memo);
  }

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
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const txRaw = await this.sign(signerAddress, messages, fee, memo);
    const txBytes = TxRaw.encode(txRaw).finish();
    // return this.broadcastTx(txBytes, this.broadcastTimeoutMs, this.broadcastPollIntervalMs);
    return this.broadcastTx(txBytes);
  }

  public async sign(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    explicitSignerData?: SignerData,
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
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    assert(!isOfflineDirectSigner(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
    const signDoc = makeSignDocAmino(msgs, fee, chainId, memo, accountNumber, sequence);
    const { signature, signed } = await this.signer.signAmino(signerAddress, signDoc);
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
      [{ pubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signMode,
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
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    assert(isOfflineDirectSigner(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
    const txBody: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: messages,
        memo: memo,
      },
    };
    const txBodyBytes = this.registry.encode(txBody);
    const gasLimit = Int53.fromString(fee.gas).toNumber();
    const authInfoBytes = makeAuthInfoBytes([{ pubkey, sequence }], fee.amount, gasLimit);
    const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
    const { signature, signed } = await this.signer.signDirect(signerAddress, signDoc);
    return TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }
}
