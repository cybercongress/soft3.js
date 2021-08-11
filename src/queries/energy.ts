/* eslint-disable @typescript-eslint/naming-convention */
import { createPagination, createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import Long from "long";

import {
  Query,
  QueryClientImpl,
  QuerySourceRequest,
  QueryDestinationRequest,
  QueryRoutedEnergyResponse,
  QueryRouteRequest,
  QueryRouteResponse,
  QueryRoutesRequest,
  QueryRoutesResponse,
} from "../codec/cyber/energy/v1beta1/query";

export interface EnergyExtension {
  readonly energy: {
    readonly sourceRoutes: (source: string) => Promise<QueryRoutesResponse>;
    readonly destinationRoutes: (destination: string) => Promise<QueryRoutesResponse>;
    readonly destinationRoutedEnergy: (destination: string) => Promise<QueryRoutedEnergyResponse>;
    readonly sourceRoutedEnergy: (source: string) => Promise<QueryRoutedEnergyResponse>;
    readonly route: (source: string, destination: string) => Promise<QueryRouteResponse>;
    readonly routes: () => Promise<QueryRoutesResponse>;
  };
}

export function setupEnergyExtension(base: QueryClient): EnergyExtension {
  const rpc = createProtobufRpcClient(base);
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const queryService = new QueryClientImpl(rpc);

  return {
    energy: {
      sourceRoutes: async (source: string) => {
        try {
          const response = await queryService.SourceRoutes({ source: source });
          return response;
        } catch (error) {
          throw error;
        }
      },
      destinationRoutes: async (destination: string) => {
        try {
          const response = await queryService.DestinationRoutes({ destination: destination });
          return response;
        } catch (error) {
          throw error;
        }
      },
      destinationRoutedEnergy: async (destination: string) => {
        try {
          const response = await queryService.DestinationRoutedEnergy({ destination: destination });
          return response;
        } catch (error) {
          throw error;
        }
      },
      sourceRoutedEnergy: async (source: string) => {
        try {
          const response = await queryService.SourceRoutedEnergy({ source: source });
          return response;
        } catch (error) {
          throw error;
        }
      },
      route: async (source: string, destination: string) => {
        try {
          const response = await queryService.Route({
            source: source,
            destination: destination,
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
      routes: async () => {
        try {
          const response = await queryService.Routes({});
          return response;
        } catch (error) {
          throw error;
        }
      },
    },
  };
}
