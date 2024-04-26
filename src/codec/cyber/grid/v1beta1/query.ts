/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params, Route } from "./types";

export const protobufPackage = "cyber.grid.v1beta1";

export interface QueryParamsRequest {
}

export interface QueryParamsResponse {
  params?: Params | undefined;
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
  route?: Route | undefined;
}

export interface QueryRoutesRequest {
  pagination?: PageRequest | undefined;
}

export interface QueryRoutesResponse {
  routes: Route[];
  pagination?: PageResponse | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQuerySourceRequest(): QuerySourceRequest {
  return { source: "" };
}

export const QuerySourceRequest = {
  encode(message: QuerySourceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySourceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySourceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySourceRequest {
    return { source: isSet(object.source) ? globalThis.String(object.source) : "" };
  },

  toJSON(message: QuerySourceRequest): unknown {
    const obj: any = {};
    if (message.source !== "") {
      obj.source = message.source;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySourceRequest>, I>>(base?: I): QuerySourceRequest {
    return QuerySourceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySourceRequest>, I>>(object: I): QuerySourceRequest {
    const message = createBaseQuerySourceRequest();
    message.source = object.source ?? "";
    return message;
  },
};

function createBaseQueryDestinationRequest(): QueryDestinationRequest {
  return { destination: "" };
}

export const QueryDestinationRequest = {
  encode(message: QueryDestinationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.destination !== "") {
      writer.uint32(10).string(message.destination);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDestinationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDestinationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.destination = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDestinationRequest {
    return { destination: isSet(object.destination) ? globalThis.String(object.destination) : "" };
  },

  toJSON(message: QueryDestinationRequest): unknown {
    const obj: any = {};
    if (message.destination !== "") {
      obj.destination = message.destination;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDestinationRequest>, I>>(base?: I): QueryDestinationRequest {
    return QueryDestinationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDestinationRequest>, I>>(object: I): QueryDestinationRequest {
    const message = createBaseQueryDestinationRequest();
    message.destination = object.destination ?? "";
    return message;
  },
};

function createBaseQueryRoutedEnergyResponse(): QueryRoutedEnergyResponse {
  return { value: [] };
}

export const QueryRoutedEnergyResponse = {
  encode(message: QueryRoutedEnergyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.value) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRoutedEnergyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRoutedEnergyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryRoutedEnergyResponse {
    return { value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: QueryRoutedEnergyResponse): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRoutedEnergyResponse>, I>>(base?: I): QueryRoutedEnergyResponse {
    return QueryRoutedEnergyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRoutedEnergyResponse>, I>>(object: I): QueryRoutedEnergyResponse {
    const message = createBaseQueryRoutedEnergyResponse();
    message.value = object.value?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryRouteRequest(): QueryRouteRequest {
  return { source: "", destination: "" };
}

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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRouteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.destination = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryRouteRequest {
    return {
      source: isSet(object.source) ? globalThis.String(object.source) : "",
      destination: isSet(object.destination) ? globalThis.String(object.destination) : "",
    };
  },

  toJSON(message: QueryRouteRequest): unknown {
    const obj: any = {};
    if (message.source !== "") {
      obj.source = message.source;
    }
    if (message.destination !== "") {
      obj.destination = message.destination;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRouteRequest>, I>>(base?: I): QueryRouteRequest {
    return QueryRouteRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRouteRequest>, I>>(object: I): QueryRouteRequest {
    const message = createBaseQueryRouteRequest();
    message.source = object.source ?? "";
    message.destination = object.destination ?? "";
    return message;
  },
};

function createBaseQueryRouteResponse(): QueryRouteResponse {
  return { route: undefined };
}

export const QueryRouteResponse = {
  encode(message: QueryRouteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.route !== undefined) {
      Route.encode(message.route, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRouteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRouteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.route = Route.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryRouteResponse {
    return { route: isSet(object.route) ? Route.fromJSON(object.route) : undefined };
  },

  toJSON(message: QueryRouteResponse): unknown {
    const obj: any = {};
    if (message.route !== undefined) {
      obj.route = Route.toJSON(message.route);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRouteResponse>, I>>(base?: I): QueryRouteResponse {
    return QueryRouteResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRouteResponse>, I>>(object: I): QueryRouteResponse {
    const message = createBaseQueryRouteResponse();
    message.route = (object.route !== undefined && object.route !== null) ? Route.fromPartial(object.route) : undefined;
    return message;
  },
};

function createBaseQueryRoutesRequest(): QueryRoutesRequest {
  return { pagination: undefined };
}

export const QueryRoutesRequest = {
  encode(message: QueryRoutesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRoutesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRoutesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryRoutesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryRoutesRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRoutesRequest>, I>>(base?: I): QueryRoutesRequest {
    return QueryRoutesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRoutesRequest>, I>>(object: I): QueryRoutesRequest {
    const message = createBaseQueryRoutesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryRoutesResponse(): QueryRoutesResponse {
  return { routes: [], pagination: undefined };
}

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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRoutesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.routes.push(Route.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryRoutesResponse {
    return {
      routes: globalThis.Array.isArray(object?.routes) ? object.routes.map((e: any) => Route.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryRoutesResponse): unknown {
    const obj: any = {};
    if (message.routes?.length) {
      obj.routes = message.routes.map((e) => Route.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRoutesResponse>, I>>(base?: I): QueryRoutesResponse {
    return QueryRoutesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRoutesResponse>, I>>(object: I): QueryRoutesResponse {
    const message = createBaseQueryRoutesResponse();
    message.routes = object.routes?.map((e) => Route.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
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

export const QueryServiceName = "cyber.grid.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
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
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  SourceRoutes(request: QuerySourceRequest): Promise<QueryRoutesResponse> {
    const data = QuerySourceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SourceRoutes", data);
    return promise.then((data) => QueryRoutesResponse.decode(_m0.Reader.create(data)));
  }

  DestinationRoutes(request: QueryDestinationRequest): Promise<QueryRoutesResponse> {
    const data = QueryDestinationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DestinationRoutes", data);
    return promise.then((data) => QueryRoutesResponse.decode(_m0.Reader.create(data)));
  }

  DestinationRoutedEnergy(request: QueryDestinationRequest): Promise<QueryRoutedEnergyResponse> {
    const data = QueryDestinationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DestinationRoutedEnergy", data);
    return promise.then((data) => QueryRoutedEnergyResponse.decode(_m0.Reader.create(data)));
  }

  SourceRoutedEnergy(request: QuerySourceRequest): Promise<QueryRoutedEnergyResponse> {
    const data = QuerySourceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SourceRoutedEnergy", data);
    return promise.then((data) => QueryRoutedEnergyResponse.decode(_m0.Reader.create(data)));
  }

  Route(request: QueryRouteRequest): Promise<QueryRouteResponse> {
    const data = QueryRouteRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Route", data);
    return promise.then((data) => QueryRouteResponse.decode(_m0.Reader.create(data)));
  }

  Routes(request: QueryRoutesRequest): Promise<QueryRoutesResponse> {
    const data = QueryRoutesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Routes", data);
    return promise.then((data) => QueryRoutesResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
