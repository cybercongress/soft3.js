/* eslint-disable @typescript-eslint/naming-convention */
import { createPagination, createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import Long from "long";

import {
  Query,
  QueryClientImpl,
  QueryGraphStatsRequest,
  QueryGraphStatsResponse,
  QueryCidsAmountRequest,
  QueryCidsAmountResponse,
  QueryLinksAmountRequest,
  QueryLinksAmountResponse,
  // QueryLinksParams,
  QueryLinksRequest,
  QueryLinksResponse,
} from "../codec/cyber/graph/v1beta1/query";

export interface GraphExtension {
  readonly graph: {
    readonly graphStats: () => Promise<QueryGraphStatsResponse>;
  };
}

export function setupGraphExtension(base: QueryClient): GraphExtension {
  const rpc = createProtobufRpcClient(base);
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const queryService = new QueryClientImpl(rpc);

  return {
    graph: {
      graphStats: async () => {
        return await queryService.GraphStats({});
      },
    },
  };
}
