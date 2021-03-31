/* eslint-disable @typescript-eslint/naming-convention */
import { createPagination, createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import Long from "long";

import {
    Query,
    QueryClientImpl,
    QueryAccountRequest,
    QueryAccountResponse,
    QueryLoadRequest,
    QueryLoadResponse,
    QueryParamsRequest,
    QueryParamsResponse,
    QueryPriceRequest,
    QueryPriceResponse,
} from "../codec/bandwidth/v1beta1/query"

export interface BandwidthExtension {
    readonly unverified: {
        readonly bandwidth: {
            readonly load: () => Promise<QueryLoadResponse>;
            readonly price: () => Promise<QueryPriceResponse>;
            readonly account: (agent: string) => Promise<QueryAccountResponse>;
        }
    }
}

export function setupBandwidthExtension(base: QueryClient): BandwidthExtension {
    const rpc = createProtobufRpcClient(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new QueryClientImpl(rpc);
  
    return {
      unverified: {
        bandwidth: {
            load: async() => {
                try {
                    const response = await queryService.Load({ });
                    return response;
                } catch(error) {
                    throw error
                }
            },
            price: async() => {
                try {
                    const response = await queryService.Price({ });
                    return response;
                } catch(error) {
                    throw error;
                }
            },
            account: async(agent: string) => {
                try {
                    const response = await queryService.Account({
                        address: agent,
                    });
                    return response;
                } catch(error) {
                    throw error
                }
            }
        },
      },
    };
}