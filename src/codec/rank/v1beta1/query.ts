/* eslint-disable */
import { Params } from "../../rank/v1beta1/params";
import Long from "long";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.rank.v1beta1";

export interface QueryParamsRequest {}

export interface QueryParamsResponse {
  params?: Params;
}

export interface QueryRankRequest {
  cid: string;
}

export interface QueryRankResponse {
  rank: Long;
}

export interface QuerySearchRequest {
  cid: string;
  pagination?: PageRequest;
}

export interface QuerySearchResponse {
  result: RankedCid[];
  pagination?: PageResponse;
}

export interface RankedCid {
  cid: string;
  rank: Long;
}

export interface QueryTopRequest {}

export interface QueryIsLinkExistRequest {
  from: string;
  to: string;
  address: string;
}

export interface QueryIsAnyLinkExistRequest {
  from: string;
  to: string;
}

export interface QueryLinkExistResponse {
  /** TODO move to bool... wtf with protobuf? omitempty shit */
  exist: number;
}

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

const baseQueryRankRequest: object = { cid: "" };

export const QueryRankRequest = {
  encode(
    message: QueryRankRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRankRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryRankRequest } as QueryRankRequest;
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

  fromJSON(object: any): QueryRankRequest {
    const message = { ...baseQueryRankRequest } as QueryRankRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    return message;
  },

  toJSON(message: QueryRankRequest): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryRankRequest>): QueryRankRequest {
    const message = { ...baseQueryRankRequest } as QueryRankRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    return message;
  },
};

const baseQueryRankResponse: object = { rank: Long.UZERO };

export const QueryRankResponse = {
  encode(
    message: QueryRankResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.rank.isZero()) {
      writer.uint32(8).uint64(message.rank);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRankResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryRankResponse } as QueryRankResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rank = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRankResponse {
    const message = { ...baseQueryRankResponse } as QueryRankResponse;
    if (object.rank !== undefined && object.rank !== null) {
      message.rank = Long.fromString(object.rank);
    } else {
      message.rank = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryRankResponse): unknown {
    const obj: any = {};
    message.rank !== undefined &&
      (obj.rank = (message.rank || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryRankResponse>): QueryRankResponse {
    const message = { ...baseQueryRankResponse } as QueryRankResponse;
    if (object.rank !== undefined && object.rank !== null) {
      message.rank = object.rank as Long;
    } else {
      message.rank = Long.UZERO;
    }
    return message;
  },
};

const baseQuerySearchRequest: object = { cid: "" };

export const QuerySearchRequest = {
  encode(
    message: QuerySearchRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySearchRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySearchRequest } as QuerySearchRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySearchRequest {
    const message = { ...baseQuerySearchRequest } as QuerySearchRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QuerySearchRequest): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QuerySearchRequest>): QuerySearchRequest {
    const message = { ...baseQuerySearchRequest } as QuerySearchRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQuerySearchResponse: object = {};

export const QuerySearchResponse = {
  encode(
    message: QuerySearchResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.result) {
      RankedCid.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySearchResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySearchResponse } as QuerySearchResponse;
    message.result = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result.push(RankedCid.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QuerySearchResponse {
    const message = { ...baseQuerySearchResponse } as QuerySearchResponse;
    message.result = [];
    if (object.result !== undefined && object.result !== null) {
      for (const e of object.result) {
        message.result.push(RankedCid.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QuerySearchResponse): unknown {
    const obj: any = {};
    if (message.result) {
      obj.result = message.result.map((e) =>
        e ? RankedCid.toJSON(e) : undefined
      );
    } else {
      obj.result = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QuerySearchResponse>): QuerySearchResponse {
    const message = { ...baseQuerySearchResponse } as QuerySearchResponse;
    message.result = [];
    if (object.result !== undefined && object.result !== null) {
      for (const e of object.result) {
        message.result.push(RankedCid.fromPartial(e));
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

const baseRankedCid: object = { cid: "", rank: Long.UZERO };

export const RankedCid = {
  encode(
    message: RankedCid,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    if (!message.rank.isZero()) {
      writer.uint32(16).uint64(message.rank);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RankedCid {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRankedCid } as RankedCid;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.rank = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RankedCid {
    const message = { ...baseRankedCid } as RankedCid;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    if (object.rank !== undefined && object.rank !== null) {
      message.rank = Long.fromString(object.rank);
    } else {
      message.rank = Long.UZERO;
    }
    return message;
  },

  toJSON(message: RankedCid): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    message.rank !== undefined &&
      (obj.rank = (message.rank || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<RankedCid>): RankedCid {
    const message = { ...baseRankedCid } as RankedCid;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    if (object.rank !== undefined && object.rank !== null) {
      message.rank = object.rank as Long;
    } else {
      message.rank = Long.UZERO;
    }
    return message;
  },
};

const baseQueryTopRequest: object = {};

export const QueryTopRequest = {
  encode(
    _: QueryTopRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTopRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTopRequest } as QueryTopRequest;
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

  fromJSON(_: any): QueryTopRequest {
    const message = { ...baseQueryTopRequest } as QueryTopRequest;
    return message;
  },

  toJSON(_: QueryTopRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryTopRequest>): QueryTopRequest {
    const message = { ...baseQueryTopRequest } as QueryTopRequest;
    return message;
  },
};

const baseQueryIsLinkExistRequest: object = { from: "", to: "", address: "" };

export const QueryIsLinkExistRequest = {
  encode(
    message: QueryIsLinkExistRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.to !== "") {
      writer.uint32(18).string(message.to);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryIsLinkExistRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryIsLinkExistRequest,
    } as QueryIsLinkExistRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.to = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryIsLinkExistRequest {
    const message = {
      ...baseQueryIsLinkExistRequest,
    } as QueryIsLinkExistRequest;
    if (object.from !== undefined && object.from !== null) {
      message.from = String(object.from);
    } else {
      message.from = "";
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = String(object.to);
    } else {
      message.to = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryIsLinkExistRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.to !== undefined && (obj.to = message.to);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryIsLinkExistRequest>
  ): QueryIsLinkExistRequest {
    const message = {
      ...baseQueryIsLinkExistRequest,
    } as QueryIsLinkExistRequest;
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    } else {
      message.from = "";
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = object.to;
    } else {
      message.to = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryIsAnyLinkExistRequest: object = { from: "", to: "" };

export const QueryIsAnyLinkExistRequest = {
  encode(
    message: QueryIsAnyLinkExistRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.to !== "") {
      writer.uint32(18).string(message.to);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryIsAnyLinkExistRequest {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryIsAnyLinkExistRequest,
    } as QueryIsAnyLinkExistRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.to = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryIsAnyLinkExistRequest {
    const message = {
      ...baseQueryIsAnyLinkExistRequest,
    } as QueryIsAnyLinkExistRequest;
    if (object.from !== undefined && object.from !== null) {
      message.from = String(object.from);
    } else {
      message.from = "";
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = String(object.to);
    } else {
      message.to = "";
    }
    return message;
  },

  toJSON(message: QueryIsAnyLinkExistRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.to !== undefined && (obj.to = message.to);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryIsAnyLinkExistRequest>
  ): QueryIsAnyLinkExistRequest {
    const message = {
      ...baseQueryIsAnyLinkExistRequest,
    } as QueryIsAnyLinkExistRequest;
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    } else {
      message.from = "";
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = object.to;
    } else {
      message.to = "";
    }
    return message;
  },
};

const baseQueryLinkExistResponse: object = { exist: 0 };

export const QueryLinkExistResponse = {
  encode(
    message: QueryLinkExistResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.exist !== 0) {
      writer.uint32(8).uint32(message.exist);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryLinkExistResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryLinkExistResponse } as QueryLinkExistResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exist = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLinkExistResponse {
    const message = { ...baseQueryLinkExistResponse } as QueryLinkExistResponse;
    if (object.exist !== undefined && object.exist !== null) {
      message.exist = Number(object.exist);
    } else {
      message.exist = 0;
    }
    return message;
  },

  toJSON(message: QueryLinkExistResponse): unknown {
    const obj: any = {};
    message.exist !== undefined && (obj.exist = message.exist);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryLinkExistResponse>
  ): QueryLinkExistResponse {
    const message = { ...baseQueryLinkExistResponse } as QueryLinkExistResponse;
    if (object.exist !== undefined && object.exist !== null) {
      message.exist = object.exist;
    } else {
      message.exist = 0;
    }
    return message;
  },
};

export interface Query {
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  Rank(request: QueryRankRequest): Promise<QueryRankResponse>;
  Search(request: QuerySearchRequest): Promise<QuerySearchResponse>;
  Backlinks(request: QuerySearchRequest): Promise<QuerySearchResponse>;
  Top(request: PageRequest): Promise<QuerySearchResponse>;
  IsLinkExist(
    request: QueryIsLinkExistRequest
  ): Promise<QueryLinkExistResponse>;
  IsAnyLinkExist(
    request: QueryIsAnyLinkExistRequest
  ): Promise<QueryLinkExistResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.rank.v1beta1.Query",
      "Params",
      data
    );
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }

  Rank(request: QueryRankRequest): Promise<QueryRankResponse> {
    const data = QueryRankRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.rank.v1beta1.Query", "Rank", data);
    return promise.then((data) =>
      QueryRankResponse.decode(new _m0.Reader(data))
    );
  }

  Search(request: QuerySearchRequest): Promise<QuerySearchResponse> {
    const data = QuerySearchRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.rank.v1beta1.Query",
      "Search",
      data
    );
    return promise.then((data) =>
      QuerySearchResponse.decode(new _m0.Reader(data))
    );
  }

  Backlinks(request: QuerySearchRequest): Promise<QuerySearchResponse> {
    const data = QuerySearchRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.rank.v1beta1.Query",
      "Backlinks",
      data
    );
    return promise.then((data) =>
      QuerySearchResponse.decode(new _m0.Reader(data))
    );
  }

  Top(request: PageRequest): Promise<QuerySearchResponse> {
    const data = PageRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.rank.v1beta1.Query", "Top", data);
    return promise.then((data) =>
      QuerySearchResponse.decode(new _m0.Reader(data))
    );
  }

  IsLinkExist(
    request: QueryIsLinkExistRequest
  ): Promise<QueryLinkExistResponse> {
    const data = QueryIsLinkExistRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.rank.v1beta1.Query",
      "IsLinkExist",
      data
    );
    return promise.then((data) =>
      QueryLinkExistResponse.decode(new _m0.Reader(data))
    );
  }

  IsAnyLinkExist(
    request: QueryIsAnyLinkExistRequest
  ): Promise<QueryLinkExistResponse> {
    const data = QueryIsAnyLinkExistRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.rank.v1beta1.Query",
      "IsAnyLinkExist",
      data
    );
    return promise.then((data) =>
      QueryLinkExistResponse.decode(new _m0.Reader(data))
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
