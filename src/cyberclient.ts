import {
  Coin,
  Block,
  isSearchByHeightQuery,
  isSearchBySentFromOrToQuery,
  isSearchByTagsQuery,
  SearchTxFilter,
  SearchTxQuery,
} from "@cosmjs/launchpad";
import {
  JsonObject,
} from "@cosmjs/cosmwasm-launchpad";
import {
  createPagination,
  Account,
  accountFromAny,
  AuthExtension,
  BankExtension,
  DistributionExtension,
  StakingExtension,
  BroadcastTxResponse,
  coinFromProto,
  IndexedTx,
  QueryClient,
  SequenceResponse,
  setupAuthExtension,
  setupBankExtension,
  setupDistributionExtension,
  setupStakingExtension,
} from "@cosmjs/stargate";
import {
  fromAscii,
  toHex
} from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";
import {
  broadcastTxCommitSuccess,
  Tendermint34Client,
  toRfc3339WithNanoseconds,
} from "@cosmjs/tendermint-rpc";
import {
  TxMsgData
} from "@cosmjs/stargate/build/codec/cosmos/base/abci/v1beta1/abci";
import {
  QueryGraphStatsResponse
} from "./codec/graph/v1beta1/query";
import {
  Query,
  QueryClientImpl,
  QuerySearchRequest,
  QuerySearchResponse,
  QueryRankRequest,
  QueryRankResponse,
  QueryTopRequest,
  QueryIsAnyLinkExistRequest,
  QueryIsLinkExistRequest,
  QueryLinkExistResponse,
} from "./codec/rank/v1beta1/query";
import {
  QueryLoadResponse,
  QueryAccountResponse,
  QueryPriceResponse,
} from "./codec/bandwidth/v1beta1/query"
import {
  GraphExtension,
  RankExtension,
  BandwidthExtension,
  setupGraphExtension,
  setupRankExtension,
  setupBandwidthExtension,
} from "./queries/index";



export interface PrivateCyberClient {
  readonly tmClient: Tendermint34Client;
  readonly queryClient: QueryClient & AuthExtension & BankExtension & DistributionExtension & StakingExtension & GraphExtension & RankExtension & BandwidthExtension;
}

export class CyberClient {
  private readonly tmClient: Tendermint34Client;
  private readonly queryClient: QueryClient & AuthExtension & BankExtension & DistributionExtension & StakingExtension & GraphExtension & RankExtension & BandwidthExtension;
  private chainId: string | undefined;

  public static async connect(endpoint: string): Promise < CyberClient > {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new CyberClient(tmClient);
  }

  protected constructor(tmClient: Tendermint34Client) {
    this.tmClient = tmClient;
    this.queryClient = QueryClient.withExtensions(
      tmClient,
      setupAuthExtension,
      setupBankExtension,
      setupDistributionExtension,
      setupStakingExtension,
      setupGraphExtension,
      setupRankExtension,
      setupBandwidthExtension,
    );
  }

  public async getChainId(): Promise < string > {
    if (!this.chainId) {
      const response = await this.tmClient.status();
      const chainId = response.nodeInfo.network;
      if (!chainId) throw new Error("Chain ID must not be empty");
      this.chainId = chainId;
    }

    return this.chainId;
  }

  public async getHeight(): Promise<number> {
    const status = await this.tmClient.status();
    return status.syncInfo.latestBlockHeight;
  }

  public async getAccount(searchAddress: string): Promise < Account | null > {
    console.log("ACCOUNT", searchAddress)
    const account = await this.queryClient.auth.account(searchAddress);
    console.log("ACCOUNT", account)
    return account ? accountFromAny(account) : null;
  }

  public async getSequence(address: string): Promise<SequenceResponse | null> {
    const account = await this.getAccount(address);
    if (account) {
      return {
        accountNumber: account.accountNumber,
        sequence: account.sequence,
      };
    } else {
      return null;
    }
  }

  public async getBlock(height?: number): Promise<Block> {
    const response = await this.tmClient.block(height);
    return {
      id: toHex(response.blockId.hash).toUpperCase(),
      header: {
        version: {
          block: new Uint53(response.block.header.version.block).toString(),
          app: new Uint53(response.block.header.version.app).toString(),
        },
        height: response.block.header.height,
        chainId: response.block.header.chainId,
        time: toRfc3339WithNanoseconds(response.block.header.time),
      },
      txs: response.block.txs,
    };
  }

  public async getBalance(address: string, searchDenom: string): Promise<Coin | null> {
    const balance = await this.queryClient.bank.balance(address, searchDenom);
    return balance ? coinFromProto(balance) : null;
  }


  public async getTx(id: string): Promise<IndexedTx | null> {
    const results = await this.txsQuery(`tx.hash='${id}'`);
    return results[0] ?? null;
  }

  public disconnect(): void {
    this.tmClient.disconnect();
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

  //-------------------------

  public async graphStats(): Promise < JsonObject > {
    const response =  await this.queryClient.unverified.graph.graphStats();
    return QueryGraphStatsResponse.toJSON(response)
  }

  //-------------------------

  public async search(cid: string, page?: number, perPage?: number): Promise < JsonObject > {
    const response = await this.queryClient.unverified.rank.search(cid, page, perPage);
    return QuerySearchResponse.toJSON(response)
  }

  public async backlinks(cid: string, page?: number, perPage?: number): Promise < JsonObject > {
    const response = await this.queryClient.unverified.rank.backlinks(cid, page, perPage);
    return QuerySearchResponse.toJSON(response)
  }

  public async rank(cid: string): Promise < JsonObject > {
    const response = await this.queryClient.unverified.rank.rank(cid);
    return QueryRankResponse.toJSON(response)
  }

  public async isLinkExist(from: string, to: string, agent: string): Promise < JsonObject > {
    const response = await this.queryClient.unverified.rank.isLinkExist(from, to, agent);
    return QueryLinkExistResponse.toJSON(response)
  }

  public async isAnyLinkExist(from: string, to: string, agent: string): Promise < JsonObject > {
     const response = await this.queryClient.unverified.rank.isAnyLinkExist(from, to);
     return QueryLinkExistResponse.toJSON(response)
  }
  
  //-------------------------

  public async load(): Promise < JsonObject > {
    const response = await this.queryClient.unverified.bandwidth.load();
    return QueryLoadResponse.toJSON(response)
 }

  public async price(): Promise < JsonObject > {
    const response = await this.queryClient.unverified.bandwidth.price();
    return QueryPriceResponse.toJSON(response)
  }

  public async account(agent: string): Promise < JsonObject > {
    const response = await this.queryClient.unverified.bandwidth.account(agent);
    return QueryAccountResponse.toJSON(response)
 }
 
  //-------------------------

  private async txsQuery(query: string): Promise<readonly IndexedTx[]> {
    const results = await this.tmClient.txSearchAll({ query: query });
    return results.txs.map((tx) => {
      return {
        height: tx.height,
        hash: toHex(tx.hash).toUpperCase(),
        code: tx.result.code,
        rawLog: tx.result.log || "",
        tx: tx.tx,
      };
    });
  }
}