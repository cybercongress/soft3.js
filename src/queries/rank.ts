/* eslint-disable @typescript-eslint/naming-convention */
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import Long from "long";

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
} from "../codec/cyber/rank/v1beta1/query";
import { PageRequest, PageResponse } from "../codec/cyber/base/query/v1beta1/pagination";

export function createPagination(page?: number, perPage?: number): PageRequest {
  return page
    ? {
        page: page,
        perPage: perPage ? perPage : 10,
      }
    : {
        page: 0,
        perPage: 10,
      };
}

export interface RankExtension {
  readonly rank: {
    readonly search: (cid: string, page?: number, perPage?: number) => Promise<QuerySearchResponse>;
    readonly backlinks: (cid: string, page?: number, perPage?: number) => Promise<QuerySearchResponse>;
    readonly rank: (cid: string) => Promise<QueryRankResponse>;
    readonly isLinkExist: (from: string, to: string, agent: string) => Promise<QueryLinkExistResponse>;
    readonly isAnyLinkExist: (from: string, to: string) => Promise<QueryLinkExistResponse>;
  };
}

export function setupRankExtension(base: QueryClient): RankExtension {
  const rpc = createProtobufRpcClient(base);
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const queryService = new QueryClientImpl(rpc);

  return {
    rank: {
      search: async (cid: string, page?: number, perPage?: number) => {
        try {
          const response = await queryService.Search({
            cid: cid,
            pagination: createPagination(page, perPage),
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
      backlinks: async (cid: string, page?: number, perPage?: number) => {
        try {
          const response = await queryService.Backlinks({
            cid: cid,
            pagination: createPagination(page, perPage),
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
      rank: async (cid: string) => {
        try {
          const response = await queryService.Rank({
            cid: cid,
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
      isLinkExist: async (from: string, to: string, agent: string) => {
        try {
          const response = await queryService.IsLinkExist({
            from: from,
            to: to,
            address: agent,
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
      isAnyLinkExist: async (from: string, to: string) => {
        try {
          const response = await queryService.IsAnyLinkExist({
            from: from,
            to: to,
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
    },
  };
}
