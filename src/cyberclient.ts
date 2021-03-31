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
  QuerySourceRequest,
  QueryDestinationRequest,
  QueryRouteResponse,
  QueryRoutesRequest,
  QueryRouteRequest,
  QueryRoutedEnergyResponse,
  QueryRoutesResponse,
} from "./codec/energy/v1beta1/query"
import {
  GraphExtension,
  RankExtension,
  BandwidthExtension,
  EnergyExtension,
  setupGraphExtension,
  setupRankExtension,
  setupBandwidthExtension,
  setupEnergyExtension,
} from "./queries/index";



export interface PrivateCyberClient {
  readonly tmClient: Tendermint34Client;
  readonly queryClient: QueryClient & AuthExtension & BankExtension & DistributionExtension & StakingExtension & GraphExtension & RankExtension & BandwidthExtension & EnergyExtension;
}

export class CyberClient {
  private readonly tmClient: Tendermint34Client;
  private readonly queryClient: QueryClient & AuthExtension & BankExtension & DistributionExtension & StakingExtension & GraphExtension & RankExtension & BandwidthExtension & EnergyExtension;
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
      setupEnergyExtension,
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
    const account = await this.queryClient.auth.account(searchAddress);
    return account ? accountFromAny(account) : null;
  }

  public async getAccountUnverified(searchAddress: string): Promise<Account | null> {
    const account = await this.queryClient.auth.unverified.account(searchAddress);
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

  public async getAllBalancesUnverified(address: string): Promise<readonly Coin[]> {
    const balances = await this.queryClient.bank.unverified.allBalances(address);
    return balances.map(coinFromProto);
  }

  public async getTx(id: string): Promise<IndexedTx | null> {
    const results = await this.txsQuery(`tx.hash='${id}'`);
    return results[0] ?? null;
  }

  public async searchTx(query: SearchTxQuery, filter: SearchTxFilter = {}): Promise<readonly IndexedTx[]> {
    const minHeight = filter.minHeight || 0;
    const maxHeight = filter.maxHeight || Number.MAX_SAFE_INTEGER;

    if (maxHeight < minHeight) return []; // optional optimization

    function withFilters(originalQuery: string): string {
      return `${originalQuery} AND tx.height>=${minHeight} AND tx.height<=${maxHeight}`;
    }

    let txs: readonly IndexedTx[];

    if (isSearchByHeightQuery(query)) {
      txs =
        query.height >= minHeight && query.height <= maxHeight
          ? await this.txsQuery(`tx.height=${query.height}`)
          : [];
    } else if (isSearchBySentFromOrToQuery(query)) {
      const sentQuery = withFilters(`message.module='bank' AND transfer.sender='${query.sentFromOrTo}'`);
      const receivedQuery = withFilters(
        `message.module='bank' AND transfer.recipient='${query.sentFromOrTo}'`,
      );
      const [sent, received] = await Promise.all(
        [sentQuery, receivedQuery].map((rawQuery) => this.txsQuery(rawQuery)),
      );
      const sentHashes = sent.map((t) => t.hash);
      txs = [...sent, ...received.filter((t) => !sentHashes.includes(t.hash))];
    } else if (isSearchByTagsQuery(query)) {
      const rawQuery = withFilters(query.tags.map((t) => `${t.key}='${t.value}'`).join(" AND "));
      txs = await this.txsQuery(rawQuery);
    } else {
      throw new Error("Unknown query type");
    }

    const filtered = txs.filter((tx) => tx.height >= minHeight && tx.height <= maxHeight);
    return filtered;
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

  public async sourceRoutes(source: string): Promise < JsonObject > {
    const response = await this.queryClient.unverified.energy.sourceRoutes(source);
    return QueryRoutesResponse.toJSON(response)
  }

  public async destinationRoutes(destination: string): Promise < JsonObject > {
    const response = await this.queryClient.unverified.energy.destinationRoutes(destination);
    return QueryRoutesResponse.toJSON(response)
  }

  public async destinationRoutedEnergy(destination: string): Promise < JsonObject > {
    const response = await this.queryClient.unverified.energy.destinationRoutedEnergy(destination);
    return QueryRoutedEnergyResponse.toJSON(response)
  }

  public async sourceRoutedEnergy(source: string): Promise < JsonObject > {
    const response = await this.queryClient.unverified.energy.sourceRoutedEnergy(source);
    return QueryRoutedEnergyResponse.toJSON(response)
  }

  public async route(source: string, destination: string): Promise < JsonObject > {
    const response = await this.queryClient.unverified.energy.route(source, destination);
    return QueryRouteResponse.toJSON(response)
  }

  public async routes(): Promise < JsonObject > {
    const response = await this.queryClient.unverified.energy.routes();
    return QueryRoutesResponse.toJSON(response)
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