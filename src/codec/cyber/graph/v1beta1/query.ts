/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.graph.v1beta1";

export interface QueryLinksRequest {
  cid: string;
}

export interface QueryLinksResponse {
  cids: string[];
}

export interface QueryLinksAmountRequest {}

export interface QueryLinksAmountResponse {
  amount: Long;
}

export interface QueryCidsAmountRequest {}

export interface QueryCidsAmountResponse {
  amount: Long;
}

export interface QueryGraphStatsRequest {}

export interface QueryGraphStatsResponse {
  links: Long;
  cids: Long;
}

const baseQueryLinksRequest: object = { cid: "" };

export const QueryLinksRequest = {
  encode(
    message: QueryLinksRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLinksRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryLinksRequest } as QueryLinksRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLinksRequest {
    const message = { ...baseQueryLinksRequest } as QueryLinksRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    return message;
  },

  toJSON(message: QueryLinksRequest): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryLinksRequest>): QueryLinksRequest {
    const message = { ...baseQueryLinksRequest } as QueryLinksRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    return message;
  },
};

const baseQueryLinksResponse: object = { cids: "" };

export const QueryLinksResponse = {
  encode(
    message: QueryLinksResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.cids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLinksResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryLinksResponse } as QueryLinksResponse;
    message.cids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLinksResponse {
    const message = { ...baseQueryLinksResponse } as QueryLinksResponse;
    message.cids = [];
    if (object.cids !== undefined && object.cids !== null) {
      for (const e of object.cids) {
        message.cids.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: QueryLinksResponse): unknown {
    const obj: any = {};
    if (message.cids) {
      obj.cids = message.cids.map((e) => e);
    } else {
      obj.cids = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<QueryLinksResponse>): QueryLinksResponse {
    const message = { ...baseQueryLinksResponse } as QueryLinksResponse;
    message.cids = [];
    if (object.cids !== undefined && object.cids !== null) {
      for (const e of object.cids) {
        message.cids.push(e);
      }
    }
    return message;
  },
};

const baseQueryLinksAmountRequest: object = {};

export const QueryLinksAmountRequest = {
  encode(
    _: QueryLinksAmountRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryLinksAmountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryLinksAmountRequest,
    } as QueryLinksAmountRequest;
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

  fromJSON(_: any): QueryLinksAmountRequest {
    const message = {
      ...baseQueryLinksAmountRequest,
    } as QueryLinksAmountRequest;
    return message;
  },

  toJSON(_: QueryLinksAmountRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryLinksAmountRequest>
  ): QueryLinksAmountRequest {
    const message = {
      ...baseQueryLinksAmountRequest,
    } as QueryLinksAmountRequest;
    return message;
  },
};

const baseQueryLinksAmountResponse: object = { amount: Long.UZERO };

export const QueryLinksAmountResponse = {
  encode(
    message: QueryLinksAmountResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.amount.isZero()) {
      writer.uint32(8).uint64(message.amount);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryLinksAmountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryLinksAmountResponse,
    } as QueryLinksAmountResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLinksAmountResponse {
    const message = {
      ...baseQueryLinksAmountResponse,
    } as QueryLinksAmountResponse;
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Long.fromString(object.amount);
    } else {
      message.amount = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryLinksAmountResponse): unknown {
    const obj: any = {};
    message.amount !== undefined &&
      (obj.amount = (message.amount || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryLinksAmountResponse>
  ): QueryLinksAmountResponse {
    const message = {
      ...baseQueryLinksAmountResponse,
    } as QueryLinksAmountResponse;
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount as Long;
    } else {
      message.amount = Long.UZERO;
    }
    return message;
  },
};

const baseQueryCidsAmountRequest: object = {};

export const QueryCidsAmountRequest = {
  encode(
    _: QueryCidsAmountRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCidsAmountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryCidsAmountRequest } as QueryCidsAmountRequest;
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

  fromJSON(_: any): QueryCidsAmountRequest {
    const message = { ...baseQueryCidsAmountRequest } as QueryCidsAmountRequest;
    return message;
  },

  toJSON(_: QueryCidsAmountRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryCidsAmountRequest>): QueryCidsAmountRequest {
    const message = { ...baseQueryCidsAmountRequest } as QueryCidsAmountRequest;
    return message;
  },
};

const baseQueryCidsAmountResponse: object = { amount: Long.UZERO };

export const QueryCidsAmountResponse = {
  encode(
    message: QueryCidsAmountResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.amount.isZero()) {
      writer.uint32(8).uint64(message.amount);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCidsAmountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryCidsAmountResponse,
    } as QueryCidsAmountResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCidsAmountResponse {
    const message = {
      ...baseQueryCidsAmountResponse,
    } as QueryCidsAmountResponse;
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Long.fromString(object.amount);
    } else {
      message.amount = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryCidsAmountResponse): unknown {
    const obj: any = {};
    message.amount !== undefined &&
      (obj.amount = (message.amount || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryCidsAmountResponse>
  ): QueryCidsAmountResponse {
    const message = {
      ...baseQueryCidsAmountResponse,
    } as QueryCidsAmountResponse;
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount as Long;
    } else {
      message.amount = Long.UZERO;
    }
    return message;
  },
};

const baseQueryGraphStatsRequest: object = {};

export const QueryGraphStatsRequest = {
  encode(
    _: QueryGraphStatsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGraphStatsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGraphStatsRequest } as QueryGraphStatsRequest;
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

  fromJSON(_: any): QueryGraphStatsRequest {
    const message = { ...baseQueryGraphStatsRequest } as QueryGraphStatsRequest;
    return message;
  },

  toJSON(_: QueryGraphStatsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryGraphStatsRequest>): QueryGraphStatsRequest {
    const message = { ...baseQueryGraphStatsRequest } as QueryGraphStatsRequest;
    return message;
  },
};

const baseQueryGraphStatsResponse: object = {
  links: Long.UZERO,
  cids: Long.UZERO,
};

export const QueryGraphStatsResponse = {
  encode(
    message: QueryGraphStatsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.links.isZero()) {
      writer.uint32(8).uint64(message.links);
    }
    if (!message.cids.isZero()) {
      writer.uint32(16).uint64(message.cids);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGraphStatsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGraphStatsResponse,
    } as QueryGraphStatsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.links = reader.uint64() as Long;
          break;
        case 2:
          message.cids = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGraphStatsResponse {
    const message = {
      ...baseQueryGraphStatsResponse,
    } as QueryGraphStatsResponse;
    if (object.links !== undefined && object.links !== null) {
      message.links = Long.fromString(object.links);
    } else {
      message.links = Long.UZERO;
    }
    if (object.cids !== undefined && object.cids !== null) {
      message.cids = Long.fromString(object.cids);
    } else {
      message.cids = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryGraphStatsResponse): unknown {
    const obj: any = {};
    message.links !== undefined &&
      (obj.links = (message.links || Long.UZERO).toString());
    message.cids !== undefined &&
      (obj.cids = (message.cids || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGraphStatsResponse>
  ): QueryGraphStatsResponse {
    const message = {
      ...baseQueryGraphStatsResponse,
    } as QueryGraphStatsResponse;
    if (object.links !== undefined && object.links !== null) {
      message.links = object.links as Long;
    } else {
      message.links = Long.UZERO;
    }
    if (object.cids !== undefined && object.cids !== null) {
      message.cids = object.cids as Long;
    } else {
      message.cids = Long.UZERO;
    }
    return message;
  },
};

export interface Query {
  /** TODO add pagination on storage */
  InLinks(request: QueryLinksRequest): Promise<QueryLinksResponse>;
  /** TODO add pagination on storage */
  OutLinks(request: QueryLinksRequest): Promise<QueryLinksResponse>;
  LinksAmount(
    request: QueryLinksAmountRequest
  ): Promise<QueryLinksAmountResponse>;
  CidsAmount(request: QueryCidsAmountRequest): Promise<QueryCidsAmountResponse>;
  GraphStats(request: QueryGraphStatsRequest): Promise<QueryGraphStatsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.InLinks = this.InLinks.bind(this);
    this.OutLinks = this.OutLinks.bind(this);
    this.LinksAmount = this.LinksAmount.bind(this);
    this.CidsAmount = this.CidsAmount.bind(this);
    this.GraphStats = this.GraphStats.bind(this);
  }
  InLinks(request: QueryLinksRequest): Promise<QueryLinksResponse> {
    const data = QueryLinksRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.graph.v1beta1.Query",
      "InLinks",
      data
    );
    return promise.then((data) =>
      QueryLinksResponse.decode(new _m0.Reader(data))
    );
  }

  OutLinks(request: QueryLinksRequest): Promise<QueryLinksResponse> {
    const data = QueryLinksRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.graph.v1beta1.Query",
      "OutLinks",
      data
    );
    return promise.then((data) =>
      QueryLinksResponse.decode(new _m0.Reader(data))
    );
  }

  LinksAmount(
    request: QueryLinksAmountRequest
  ): Promise<QueryLinksAmountResponse> {
    const data = QueryLinksAmountRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.graph.v1beta1.Query",
      "LinksAmount",
      data
    );
    return promise.then((data) =>
      QueryLinksAmountResponse.decode(new _m0.Reader(data))
    );
  }

  CidsAmount(
    request: QueryCidsAmountRequest
  ): Promise<QueryCidsAmountResponse> {
    const data = QueryCidsAmountRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.graph.v1beta1.Query",
      "CidsAmount",
      data
    );
    return promise.then((data) =>
      QueryCidsAmountResponse.decode(new _m0.Reader(data))
    );
  }

  GraphStats(
    request: QueryGraphStatsRequest
  ): Promise<QueryGraphStatsResponse> {
    const data = QueryGraphStatsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.graph.v1beta1.Query",
      "GraphStats",
      data
    );
    return promise.then((data) =>
      QueryGraphStatsResponse.decode(new _m0.Reader(data))
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
  | boolean
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
