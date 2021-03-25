import {
  CosmosFeeTable,
  makeSignDoc as makeSignDocAmino,
  buildFeeTable,
  GasLimits,
  GasPrice,
  StdFee
} from "@cosmjs/launchpad";
import {
  encodeSecp256k1Pubkey
} from "@cosmjs/amino";
import {
  EncodeObject,
  encodePubkey,
  isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc,
  OfflineSigner,
  Registry,
} from "@cosmjs/proto-signing";
import {
  AminoTypes,
  BroadcastTxFailure,
  BroadcastTxResponse,
  defaultRegistryTypes,
  isBroadcastTxFailure,
  logs,
} from "@cosmjs/stargate";
import {
  fromBase64,
  toHex,
  toUtf8
} from "@cosmjs/encoding";
import {
  Int53,
  Uint53
} from "@cosmjs/math";
import {
  Tendermint34Client
} from "@cosmjs/tendermint-rpc";
import {
  SignMode
} from "@cosmjs/stargate/build/codec/cosmos/tx/signing/v1beta1/signing";
import {
  TxRaw
} from "@cosmjs/stargate/build/codec/cosmos/tx/v1beta1/tx";
import {
  MsgCyberlink,
  MsgCyberlinkResponse
} from "./codec/graph/v1beta1/graph"
import {
  CyberClient
} from "./cyberclient";

interface CyberFeeTable extends CosmosFeeTable {
  readonly cyberlink: StdFee;
}

const defaultGasPrice = GasPrice.fromString("0.025nick");
const defaultGasLimits: GasLimits < CyberFeeTable > = {
  cyberlink: 128000,
  send: 100000,
};

function createBroadcastTxErrorMessage(result: BroadcastTxFailure): string {
  return `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`;
}

function createDefaultRegistry(): Registry {
  return new Registry([
    ...defaultRegistryTypes,
    ["/cyber.graph.v1beta1.MsgCyberlink", MsgCyberlink, ],
  ]);
}

export interface SigningCyberClientOptions {
  readonly registry ? : Registry;
  readonly aminoTypes ? : AminoTypes;
  readonly prefix ? : string;
  readonly gasPrice ? : GasPrice;
  readonly gasLimits ? : GasLimits < CosmosFeeTable > ;
}

export class SigningCyberClient extends CyberClient {
  public readonly fees: CosmosFeeTable;
  public readonly registry: Registry;

  private readonly signer: OfflineSigner;
  private readonly aminoTypes: AminoTypes;

  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningCyberClientOptions = {},
  ): Promise < SigningCyberClient > {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SigningCyberClient(tmClient, signer, options);
  }

  private constructor(
    tmClient: Tendermint34Client,
    signer: OfflineSigner,
    options: SigningCyberClientOptions,
  ) {
    super(tmClient);
    const {
      registry = createDefaultRegistry(),
        aminoTypes = new AminoTypes({
          additions: {},
          prefix: options.prefix
        }),
        gasPrice = defaultGasPrice,
        gasLimits = defaultGasLimits,
    } = options;
    this.fees = buildFeeTable < CosmosFeeTable > (gasPrice, defaultGasLimits, gasLimits);
    this.registry = registry;
    this.aminoTypes = aminoTypes;
    this.signer = signer;
  }

  public async cyberlink(
    senderAddress: string,
    from: string,
    to: string,
    memo = "",
  ): Promise < MsgCyberlinkResponse > {
    const cyberlinkMsg = {
      typeUrl: "/cyber.graph.v1beta1.MsgCyberlink",
      value: {
        address: senderAddress,
        links: [{
          from: from,
          to: to,
        }]
      },
    };
    const result = await this.signAndBroadcast(senderAddress, [cyberlinkMsg], this.fees.cyberlink, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      // logs: parseRawLog(result.rawLog),
      transactionHash: result.transactionHash,
    };
  }


  public async signAndBroadcast(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo = "",
  ): Promise < BroadcastTxResponse > {
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
    const accountFromChain = await this.getAccount(signerAddress);
    if (!accountFromChain) {
      throw new Error("Account not found");
    }
    const {
      accountNumber,
      sequence
    } = accountFromChain;
    const chainId = await this.getChainId();
    const txBody = {
      messages: messages,
      memo: memo,
    };
    const txBodyBytes = this.registry.encode({
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: txBody,
    });
    const gasLimit = Int53.fromString(fee.gas).toNumber();

    if (isOfflineDirectSigner(this.signer)) {
      const authInfoBytes = makeAuthInfoBytes([pubkey], fee.amount, gasLimit, sequence);
      const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
      const {
        signature,
        signed
      } = await this.signer.signDirect(signerAddress, signDoc);
      const txRaw = TxRaw.fromPartial({
        bodyBytes: signed.bodyBytes,
        authInfoBytes: signed.authInfoBytes,
        signatures: [fromBase64(signature.signature)],
      });
      const signedTx = Uint8Array.from(TxRaw.encode(txRaw).finish());
      return this.broadcastTx(signedTx);
    }

    // Amino signer
    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
    const signDoc = makeSignDocAmino(msgs, fee, chainId, memo, accountNumber, sequence);
    const {
      signature,
      signed
    } = await this.signer.signAmino(signerAddress, signDoc);
    const signedTxBody = {
      messages: signed.msgs.map((msg) => this.aminoTypes.fromAmino(msg)),
      memo: signed.memo,
    };
    const signedTxBodyBytes = this.registry.encode({
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: signedTxBody,
    });
    const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
    const signedSequence = Int53.fromString(signed.sequence).toNumber();
    const signedAuthInfoBytes = makeAuthInfoBytes(
      [pubkey],
      signed.fee.amount,
      signedGasLimit,
      signedSequence,
      signMode,
    );
    const txRaw = TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
    const signedTx = Uint8Array.from(TxRaw.encode(txRaw).finish());
    return this.broadcastTx(signedTx);
  }
}