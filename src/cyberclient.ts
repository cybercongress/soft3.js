import {
    Account,
    accountFromProto,
    AuthExtension,
    BankExtension,
    BroadcastTxResponse,
    coinFromProto,
    IndexedTx,
    QueryClient,
    SequenceResponse,
    setupAuthExtension,
    setupBankExtension,
} from "@cosmjs/stargate";
import { fromAscii, toHex } from "@cosmjs/encoding";

import {
    broadcastTxCommitSuccess,
    Tendermint34Client,
  } from "@cosmjs/tendermint-rpc";
import { TxMsgData } from "@cosmjs/stargate/build/codec/cosmos/base/abci/v1beta1/abci";
import { QueryGraphStatsResponse } from "./codec/graph/v1beta1/query";

import {
    GraphExtension,
    setupGraphExtension,
} from "./queries/index";



export interface PrivateCyberClient {
    readonly tmClient: Tendermint34Client;
    readonly queryClient: QueryClient & AuthExtension & BankExtension & GraphExtension;
  }
  
  export class  CyberClient {
    private readonly tmClient: Tendermint34Client;
    private readonly queryClient: QueryClient & AuthExtension & BankExtension & GraphExtension;
    private chainId: string | undefined;
  
    public static async connect(endpoint: string): Promise<CyberClient> {
      const tmClient = await Tendermint34Client.connect(endpoint);
      return new CyberClient(tmClient);
    }
  
    protected constructor(tmClient: Tendermint34Client) {
      this.tmClient = tmClient;
      this.queryClient = QueryClient.withExtensions(
        tmClient,
        setupAuthExtension,
        setupBankExtension,
        setupGraphExtension,
      );
    }

    public async getChainId(): Promise<string> {
        if (!this.chainId) {
          const response = await this.tmClient.status();
          const chainId = response.nodeInfo.network;
          if (!chainId) throw new Error("Chain ID must not be empty");
          this.chainId = chainId;
        }
    
        return this.chainId;
    }

    public async getAccount(searchAddress: string): Promise<Account | null> {
      const account = await this.queryClient.auth.account(searchAddress);
      return account ? accountFromProto(account) : null;
    }

    public async graphStats(): Promise<QueryGraphStatsResponse> {
        return await this.queryClient.unverified.graph.graphStats();
    }

    public async broadcastTx(tx: Uint8Array): Promise<BroadcastTxResponse> {
      const response = await this.tmClient.broadcastTxCommit({ tx });
      if (broadcastTxCommitSuccess(response)) {
        return {
          height: response.height,
          transactionHash: toHex(response.hash).toUpperCase(),
          rawLog: response.deliverTx?.log,
          data: response.deliverTx?.data ? TxMsgData.decode(response.deliverTx?.data).data : undefined,
        };
      }
      return response.checkTx.code !== 0
        ? {
            height: response.height,
            code: response.checkTx.code,
            transactionHash: toHex(response.hash).toUpperCase(),
            rawLog: response.checkTx.log,
            data: response.checkTx.data ? TxMsgData.decode(response.checkTx.data).data : undefined,
          }
        : {
            height: response.height,
            code: response.deliverTx?.code,
            transactionHash: toHex(response.hash).toUpperCase(),
            rawLog: response.deliverTx?.log,
            data: response.deliverTx?.data ? TxMsgData.decode(response.deliverTx?.data).data : undefined,
          };
    }
}