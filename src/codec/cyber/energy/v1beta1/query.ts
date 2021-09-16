/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params, Route } from "../../../cyber/energy/v1beta1/types";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../cosmos_proto/coin";

export const protobufPackage = "cyber.energy.v1beta1";

export interface QueryParamsRequest {}

export interface QueryParamsResponse {
  params?: Params;
}

export interface QuerySourceRequest {
  source: string;
}

export interface QueryDestinationRequest {
  destination: string;
}

export interface QueryRoutedEnergyResponse {
  value: Coin[];
}

export interface QueryRouteRequest {
  source: string;
  destination: string;
}

export interface QueryRouteResponse {
  route?: Route;
}

export interface QueryRoutesRequest {
  pagination?: PageRequest;
}

export interface QueryRoutesResponse {
  routes: Route[];
  pagination?: PageResponse;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQuerySourceRequest: object = { source: "" };

export const QuerySourceRequest = {
  encode(message: QuerySourceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySourceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySourceRequest } as QuerySourceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.source = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySourceRequest {
    const message = { ...baseQuerySourceRequest } as QuerySourceRequest;
    if (object.source !== undefined && object.source !== null) {
      message.source = String(object.source);
    } else {
      message.source = "";
    }
    return message;
  },

  toJSON(message: QuerySourceRequest): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    return obj;
  },

  fromPartial(object: DeepPartial<QuerySourceRequest>): QuerySourceRequest {
    const message = { ...baseQuerySourceRequest } as QuerySourceRequest;
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    } else {
      message.source = "";
    }
    return message;
  },
};

const baseQueryDestinationRequest: object = { destination: "" };

export const QueryDestinationRequest = {
  encode(message: QueryDestinationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.destination !== "") {
      writer.uint32(10).string(message.destination);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDestinationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryDestinationRequest } as QueryDestinationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.destination = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDestinationRequest {
    const message = { ...baseQueryDestinationRequest } as QueryDestinationRequest;
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = String(object.destination);
    } else {
      message.destination = "";
    }
    return message;
  },

  toJSON(message: QueryDestinationRequest): unknown {
    const obj: any = {};
    message.destination !== undefined && (obj.destination = message.destination);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryDestinationRequest>): QueryDestinationRequest {
    const message = { ...baseQueryDestinationRequest } as QueryDestinationRequest;
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = object.destination;
    } else {
      message.destination = "";
    }
    return message;
  },
};

const baseQueryRoutedEnergyResponse: object = {};

export const QueryRoutedEnergyResponse = {
  encode(message: QueryRoutedEnergyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.value) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRoutedEnergyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryRoutedEnergyResponse } as QueryRoutedEnergyResponse;
    message.value = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRoutedEnergyResponse {
    const message = { ...baseQueryRoutedEnergyResponse } as QueryRoutedEnergyResponse;
    message.value = [];
    if (object.value !== undefined && object.value !== null) {
      for (const e of object.value) {
        message.value.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryRoutedEnergyResponse): unknown {
    const obj: any = {};
    if (message.value) {
      obj.value = message.value.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.value = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<QueryRoutedEnergyResponse>): QueryRoutedEnergyResponse {
    const message = { ...baseQueryRoutedEnergyResponse } as QueryRoutedEnergyResponse;
    message.value = [];
    if (object.value !== undefined && object.value !== null) {
      for (const e of object.value) {
        message.value.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryRouteRequest: object = { source: "", destination: "" };

export const QueryRouteRequest = {
  encode(message: QueryRouteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.destination !== "") {
      writer.uint32(18).string(message.destination);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRouteRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryRouteRequest } as QueryRouteRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.source = reader.string();
          break;
        case 2:
          message.destination = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRouteRequest {
    const message = { ...baseQueryRouteRequest } as QueryRouteRequest;
    if (object.source !== undefined && object.source !== null) {
      message.source = String(object.source);
    } else {
      message.source = "";
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = String(object.destination);
    } else {
      message.destination = "";
    }
    return message;
  },

  toJSON(message: QueryRouteRequest): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined && (obj.destination = message.destination);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryRouteRequest>): QueryRouteRequest {
    const message = { ...baseQueryRouteRequest } as QueryRouteRequest;
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    } else {
      message.source = "";
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = object.destination;
    } else {
      message.destination = "";
    }
    return message;
  },
};

const baseQueryRouteResponse: object = {};

export const QueryRouteResponse = {
  encode(message: QueryRouteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.route !== undefined) {
      Route.encode(message.route, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRouteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryRouteResponse } as QueryRouteResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.route = Route.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRouteResponse {
    const message = { ...baseQueryRouteResponse } as QueryRouteResponse;
    if (object.route !== undefined && object.route !== null) {
      message.route = Route.fromJSON(object.route);
    } else {
      message.route = undefined;
    }
    return message;
  },

  toJSON(message: QueryRouteResponse): unknown {
    const obj: any = {};
    message.route !== undefined && (obj.route = message.route ? Route.toJSON(message.route) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryRouteResponse>): QueryRouteResponse {
    const message = { ...baseQueryRouteResponse } as QueryRouteResponse;
    if (object.route !== undefined && object.route !== null) {
      message.route = Route.fromPartial(object.route);
    } else {
      message.route = undefined;
    }
    return message;
  },
};

const baseQueryRoutesRequest: object = {};

export const QueryRoutesRequest = {
  encode(message: QueryRoutesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRoutesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryRoutesRequest } as QueryRoutesRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRoutesRequest {
    const message = { ...baseQueryRoutesRequest } as QueryRoutesRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryRoutesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryRoutesRequest>): QueryRoutesRequest {
    const message = { ...baseQueryRoutesRequest } as QueryRoutesRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryRoutesResponse: object = {};

export const QueryRoutesResponse = {
  encode(message: QueryRoutesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.routes) {
      Route.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRoutesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryRoutesResponse } as QueryRoutesResponse;
    message.routes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.routes.push(Route.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRoutesResponse {
    const message = { ...baseQueryRoutesResponse } as QueryRoutesResponse;
    message.routes = [];
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(Route.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryRoutesResponse): unknown {
    const obj: any = {};
    if (message.routes) {
      obj.routes = message.routes.map((e) => (e ? Route.toJSON(e) : undefined));
    } else {
      obj.routes = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryRoutesResponse>): QueryRoutesResponse {
    const message = { ...baseQueryRoutesResponse } as QueryRoutesResponse;
    message.routes = [];
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(Route.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

export interface Query {
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  SourceRoutes(request: QuerySourceRequest): Promise<QueryRoutesResponse>;
  DestinationRoutes(request: QueryDestinationRequest): Promise<QueryRoutesResponse>;
  DestinationRoutedEnergy(request: QueryDestinationRequest): Promise<QueryRoutedEnergyResponse>;
  SourceRoutedEnergy(request: QuerySourceRequest): Promise<QueryRoutedEnergyResponse>;
  Route(request: QueryRouteRequest): Promise<QueryRouteResponse>;
  Routes(request: QueryRoutesRequest): Promise<QueryRoutesResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.SourceRoutes = this.SourceRoutes.bind(this);
    this.DestinationRoutes = this.DestinationRoutes.bind(this);
    this.DestinationRoutedEnergy = this.DestinationRoutedEnergy.bind(this);
    this.SourceRoutedEnergy = this.SourceRoutedEnergy.bind(this);
    this.Route = this.Route.bind(this);
    this.Routes = this.Routes.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  SourceRoutes(request: QuerySourceRequest): Promise<QueryRoutesResponse> {
    const data = QuerySourceRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Query", "SourceRoutes", data);
    return promise.then((data) => QueryRoutesResponse.decode(new _m0.Reader(data)));
  }

  DestinationRoutes(request: QueryDestinationRequest): Promise<QueryRoutesResponse> {
    const data = QueryDestinationRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Query", "DestinationRoutes", data);
    return promise.then((data) => QueryRoutesResponse.decode(new _m0.Reader(data)));
  }

  DestinationRoutedEnergy(request: QueryDestinationRequest): Promise<QueryRoutedEnergyResponse> {
    const data = QueryDestinationRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Query", "DestinationRoutedEnergy", data);
    return promise.then((data) => QueryRoutedEnergyResponse.decode(new _m0.Reader(data)));
  }

  SourceRoutedEnergy(request: QuerySourceRequest): Promise<QueryRoutedEnergyResponse> {
    const data = QuerySourceRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Query", "SourceRoutedEnergy", data);
    return promise.then((data) => QueryRoutedEnergyResponse.decode(new _m0.Reader(data)));
  }

  Route(request: QueryRouteRequest): Promise<QueryRouteResponse> {
    const data = QueryRouteRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Query", "Route", data);
    return promise.then((data) => QueryRouteResponse.decode(new _m0.Reader(data)));
  }

  Routes(request: QueryRoutesRequest): Promise<QueryRoutesResponse> {
    const data = QueryRoutesRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Query", "Routes", data);
    return promise.then((data) => QueryRoutesResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
