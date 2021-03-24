/* eslint-disable @typescript-eslint/naming-convention */
import { createPagination, createRpc, QueryClient } from "@cosmjs/stargate";
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
    QueryLinksParams,
    QueryLinksRequest,
    QueryLinksResponse
} from "../codec/graph/v1beta1/query"

export interface GraphExtension {
    readonly unverified: {
        readonly graph: {
            readonly graphStats: () => Promise<QueryGraphStatsResponse>;
        }
    }
}

export function setupGraphExtension(base: QueryClient): GraphExtension {
    const rpc = createRpc(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new QueryClientImpl(rpc);
  
    return {
      unverified: {
        graph: {
            graphStats: async() => {
                return await queryService.GraphStats({});
            }
        },
      },
    };
}