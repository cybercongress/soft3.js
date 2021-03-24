/* eslint-disable */
import { DecProto } from "../../cosmos_proto/coin";
import { AccountBandwidth } from "../../bandwidth/v1beta1/bandwidth";
import { Params } from "../../bandwidth/v1beta1/params";
import _m0 from "protobufjs/minimal";
import Long from "long";

export const protobufPackage = "cyber.bandwidth.v1beta1";

export interface QueryLoadRequest {}

export interface QueryLoadResponse {
  load?: DecProto;
}

export interface QueryPriceRequest {}

export interface QueryPriceResponse {
  price?: DecProto;
}

export interface QueryAccountRequest {
  address: string;
}

export interface QueryAccountResponse {
  accountBandwidth?: AccountBandwidth;
}

export interface QueryParamsRequest {}

export interface QueryParamsResponse {
  params?: Params;
}

const baseQueryLoadRequest: object = {};

export const QueryLoadRequest = {
  encode(
    _: QueryLoadRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLoadRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryLoadRequest } as QueryLoadRequest;
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

  fromJSON(_: any): QueryLoadRequest {
    const message = { ...baseQueryLoadRequest } as QueryLoadRequest;
    return message;
  },

  toJSON(_: QueryLoadRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryLoadRequest>): QueryLoadRequest {
    const message = { ...baseQueryLoadRequest } as QueryLoadRequest;
    return message;
  },
};

const baseQueryLoadResponse: object = {};

export const QueryLoadResponse = {
  encode(
    message: QueryLoadResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.load !== undefined) {
      DecProto.encode(message.load, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLoadResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryLoadResponse } as QueryLoadResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.load = DecProto.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLoadResponse {
    const message = { ...baseQueryLoadResponse } as QueryLoadResponse;
    if (object.load !== undefined && object.load !== null) {
      message.load = DecProto.fromJSON(object.load);
    } else {
      message.load = undefined;
    }
    return message;
  },

  toJSON(message: QueryLoadResponse): unknown {
    const obj: any = {};
    message.load !== undefined &&
      (obj.load = message.load ? DecProto.toJSON(message.load) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryLoadResponse>): QueryLoadResponse {
    const message = { ...baseQueryLoadResponse } as QueryLoadResponse;
    if (object.load !== undefined && object.load !== null) {
      message.load = DecProto.fromPartial(object.load);
    } else {
      message.load = undefined;
    }
    return message;
  },
};

const baseQueryPriceRequest: object = {};

export const QueryPriceRequest = {
  encode(
    _: QueryPriceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPriceRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPriceRequest } as QueryPriceRequest;
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

  fromJSON(_: any): QueryPriceRequest {
    const message = { ...baseQueryPriceRequest } as QueryPriceRequest;
    return message;
  },

  toJSON(_: QueryPriceRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryPriceRequest>): QueryPriceRequest {
    const message = { ...baseQueryPriceRequest } as QueryPriceRequest;
    return message;
  },
};

const baseQueryPriceResponse: object = {};

export const QueryPriceResponse = {
  encode(
    message: QueryPriceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.price !== undefined) {
      DecProto.encode(message.price, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPriceResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPriceResponse } as QueryPriceResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = DecProto.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPriceResponse {
    const message = { ...baseQueryPriceResponse } as QueryPriceResponse;
    if (object.price !== undefined && object.price !== null) {
      message.price = DecProto.fromJSON(object.price);
    } else {
      message.price = undefined;
    }
    return message;
  },

  toJSON(message: QueryPriceResponse): unknown {
    const obj: any = {};
    message.price !== undefined &&
      (obj.price = message.price ? DecProto.toJSON(message.price) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryPriceResponse>): QueryPriceResponse {
    const message = { ...baseQueryPriceResponse } as QueryPriceResponse;
    if (object.price !== undefined && object.price !== null) {
      message.price = DecProto.fromPartial(object.price);
    } else {
      message.price = undefined;
    }
    return message;
  },
};

const baseQueryAccountRequest: object = { address: "" };

export const QueryAccountRequest = {
  encode(
    message: QueryAccountRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAccountRequest } as QueryAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountRequest {
    const message = { ...baseQueryAccountRequest } as QueryAccountRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryAccountRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAccountRequest>): QueryAccountRequest {
    const message = { ...baseQueryAccountRequest } as QueryAccountRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryAccountResponse: object = {};

export const QueryAccountResponse = {
  encode(
    message: QueryAccountResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.accountBandwidth !== undefined) {
      AccountBandwidth.encode(
        message.accountBandwidth,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAccountResponse } as QueryAccountResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountBandwidth = AccountBandwidth.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountResponse {
    const message = { ...baseQueryAccountResponse } as QueryAccountResponse;
    if (
      object.accountBandwidth !== undefined &&
      object.accountBandwidth !== null
    ) {
      message.accountBandwidth = AccountBandwidth.fromJSON(
        object.accountBandwidth
      );
    } else {
      message.accountBandwidth = undefined;
    }
    return message;
  },

  toJSON(message: QueryAccountResponse): unknown {
    const obj: any = {};
    message.accountBandwidth !== undefined &&
      (obj.accountBandwidth = message.accountBandwidth
        ? AccountBandwidth.toJSON(message.accountBandwidth)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAccountResponse>): QueryAccountResponse {
    const message = { ...baseQueryAccountResponse } as QueryAccountResponse;
    if (
      object.accountBandwidth !== undefined &&
      object.accountBandwidth !== null
    ) {
      message.accountBandwidth = AccountBandwidth.fromPartial(
        object.accountBandwidth
      );
    } else {
      message.accountBandwidth = undefined;
    }
    return message;
  },
};

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(
    _: QueryParamsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
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
  encode(
    message: QueryParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
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
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
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

export interface Query {
  Load(request: QueryLoadRequest): Promise<QueryLoadResponse>;
  Price(request: QueryPriceRequest): Promise<QueryPriceResponse>;
  Account(request: QueryAccountRequest): Promise<QueryAccountResponse>;
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Load(request: QueryLoadRequest): Promise<QueryLoadResponse> {
    const data = QueryLoadRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.bandwidth.v1beta1.Query",
      "Load",
      data
    );
    return promise.then((data) =>
      QueryLoadResponse.decode(new _m0.Reader(data))
    );
  }

  Price(request: QueryPriceRequest): Promise<QueryPriceResponse> {
    const data = QueryPriceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.bandwidth.v1beta1.Query",
      "Price",
      data
    );
    return promise.then((data) =>
      QueryPriceResponse.decode(new _m0.Reader(data))
    );
  }

  Account(request: QueryAccountRequest): Promise<QueryAccountResponse> {
    const data = QueryAccountRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.bandwidth.v1beta1.Query",
      "Account",
      data
    );
    return promise.then((data) =>
      QueryAccountResponse.decode(new _m0.Reader(data))
    );
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.bandwidth.v1beta1.Query",
      "Params",
      data
    );
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
