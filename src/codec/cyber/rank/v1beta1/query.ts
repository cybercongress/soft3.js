/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params, RankedCid } from "../../../cyber/rank/v1beta1/types";
import {
  PageRequest,
  PageResponse,
} from "../../../cyber/base/query/v1beta1/pagination";

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

/** FIXME move to bool... */
export interface QueryLinkExistResponse {
  exist: boolean;
}

export interface QueryEntropyRequest {
  cid: string;
}

export interface QueryEntropyResponse {
  entropy: Long;
}

export interface QueryLuminosityRequest {
  cid: string;
}

export interface QueryLuminosityResponse {
  luminosity: Long;
}

export interface QueryKarmaRequest {
  address: string;
}

export interface QueryKarmaResponse {
  karma: Long;
}

export interface QueryKarmasRequest {}

/** TODO experimental and debug */
export interface QueryKarmasResponse {
  karmas: { [key: string]: Long };
}

export interface QueryKarmasResponse_KarmasEntry {
  key: string;
  value: Long;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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

const baseQueryTopRequest: object = {};

export const QueryTopRequest = {
  encode(
    _: QueryTopRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTopRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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

const baseQueryLinkExistResponse: object = { exist: false };

export const QueryLinkExistResponse = {
  encode(
    message: QueryLinkExistResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.exist === true) {
      writer.uint32(8).bool(message.exist);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryLinkExistResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryLinkExistResponse } as QueryLinkExistResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exist = reader.bool();
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
      message.exist = Boolean(object.exist);
    } else {
      message.exist = false;
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
      message.exist = false;
    }
    return message;
  },
};

const baseQueryEntropyRequest: object = { cid: "" };

export const QueryEntropyRequest = {
  encode(
    message: QueryEntropyRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEntropyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryEntropyRequest } as QueryEntropyRequest;
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

  fromJSON(object: any): QueryEntropyRequest {
    const message = { ...baseQueryEntropyRequest } as QueryEntropyRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    return message;
  },

  toJSON(message: QueryEntropyRequest): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryEntropyRequest>): QueryEntropyRequest {
    const message = { ...baseQueryEntropyRequest } as QueryEntropyRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    return message;
  },
};

const baseQueryEntropyResponse: object = { entropy: Long.UZERO };

export const QueryEntropyResponse = {
  encode(
    message: QueryEntropyResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.entropy.isZero()) {
      writer.uint32(8).uint64(message.entropy);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryEntropyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryEntropyResponse } as QueryEntropyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entropy = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryEntropyResponse {
    const message = { ...baseQueryEntropyResponse } as QueryEntropyResponse;
    if (object.entropy !== undefined && object.entropy !== null) {
      message.entropy = Long.fromString(object.entropy);
    } else {
      message.entropy = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryEntropyResponse): unknown {
    const obj: any = {};
    message.entropy !== undefined &&
      (obj.entropy = (message.entropy || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryEntropyResponse>): QueryEntropyResponse {
    const message = { ...baseQueryEntropyResponse } as QueryEntropyResponse;
    if (object.entropy !== undefined && object.entropy !== null) {
      message.entropy = object.entropy as Long;
    } else {
      message.entropy = Long.UZERO;
    }
    return message;
  },
};

const baseQueryLuminosityRequest: object = { cid: "" };

export const QueryLuminosityRequest = {
  encode(
    message: QueryLuminosityRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryLuminosityRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryLuminosityRequest } as QueryLuminosityRequest;
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

  fromJSON(object: any): QueryLuminosityRequest {
    const message = { ...baseQueryLuminosityRequest } as QueryLuminosityRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    return message;
  },

  toJSON(message: QueryLuminosityRequest): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryLuminosityRequest>
  ): QueryLuminosityRequest {
    const message = { ...baseQueryLuminosityRequest } as QueryLuminosityRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    return message;
  },
};

const baseQueryLuminosityResponse: object = { luminosity: Long.UZERO };

export const QueryLuminosityResponse = {
  encode(
    message: QueryLuminosityResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.luminosity.isZero()) {
      writer.uint32(8).uint64(message.luminosity);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryLuminosityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryLuminosityResponse,
    } as QueryLuminosityResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.luminosity = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLuminosityResponse {
    const message = {
      ...baseQueryLuminosityResponse,
    } as QueryLuminosityResponse;
    if (object.luminosity !== undefined && object.luminosity !== null) {
      message.luminosity = Long.fromString(object.luminosity);
    } else {
      message.luminosity = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryLuminosityResponse): unknown {
    const obj: any = {};
    message.luminosity !== undefined &&
      (obj.luminosity = (message.luminosity || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryLuminosityResponse>
  ): QueryLuminosityResponse {
    const message = {
      ...baseQueryLuminosityResponse,
    } as QueryLuminosityResponse;
    if (object.luminosity !== undefined && object.luminosity !== null) {
      message.luminosity = object.luminosity as Long;
    } else {
      message.luminosity = Long.UZERO;
    }
    return message;
  },
};

const baseQueryKarmaRequest: object = { address: "" };

export const QueryKarmaRequest = {
  encode(
    message: QueryKarmaRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKarmaRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryKarmaRequest } as QueryKarmaRequest;
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

  fromJSON(object: any): QueryKarmaRequest {
    const message = { ...baseQueryKarmaRequest } as QueryKarmaRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryKarmaRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryKarmaRequest>): QueryKarmaRequest {
    const message = { ...baseQueryKarmaRequest } as QueryKarmaRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryKarmaResponse: object = { karma: Long.UZERO };

export const QueryKarmaResponse = {
  encode(
    message: QueryKarmaResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.karma.isZero()) {
      writer.uint32(8).uint64(message.karma);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKarmaResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryKarmaResponse } as QueryKarmaResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.karma = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryKarmaResponse {
    const message = { ...baseQueryKarmaResponse } as QueryKarmaResponse;
    if (object.karma !== undefined && object.karma !== null) {
      message.karma = Long.fromString(object.karma);
    } else {
      message.karma = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryKarmaResponse): unknown {
    const obj: any = {};
    message.karma !== undefined &&
      (obj.karma = (message.karma || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryKarmaResponse>): QueryKarmaResponse {
    const message = { ...baseQueryKarmaResponse } as QueryKarmaResponse;
    if (object.karma !== undefined && object.karma !== null) {
      message.karma = object.karma as Long;
    } else {
      message.karma = Long.UZERO;
    }
    return message;
  },
};

const baseQueryKarmasRequest: object = {};

export const QueryKarmasRequest = {
  encode(
    _: QueryKarmasRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKarmasRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryKarmasRequest } as QueryKarmasRequest;
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

  fromJSON(_: any): QueryKarmasRequest {
    const message = { ...baseQueryKarmasRequest } as QueryKarmasRequest;
    return message;
  },

  toJSON(_: QueryKarmasRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryKarmasRequest>): QueryKarmasRequest {
    const message = { ...baseQueryKarmasRequest } as QueryKarmasRequest;
    return message;
  },
};

const baseQueryKarmasResponse: object = {};

export const QueryKarmasResponse = {
  encode(
    message: QueryKarmasResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.karmas).forEach(([key, value]) => {
      QueryKarmasResponse_KarmasEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKarmasResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryKarmasResponse } as QueryKarmasResponse;
    message.karmas = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = QueryKarmasResponse_KarmasEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.karmas[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryKarmasResponse {
    const message = { ...baseQueryKarmasResponse } as QueryKarmasResponse;
    message.karmas = {};
    if (object.karmas !== undefined && object.karmas !== null) {
      Object.entries(object.karmas).forEach(([key, value]) => {
        // message.karmas[key] = Long(value);
      });
    }
    return message;
  },

  toJSON(message: QueryKarmasResponse): unknown {
    const obj: any = {};
    obj.karmas = {};
    if (message.karmas) {
      Object.entries(message.karmas).forEach(([k, v]) => {
        obj.karmas[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<QueryKarmasResponse>): QueryKarmasResponse {
    const message = { ...baseQueryKarmasResponse } as QueryKarmasResponse;
    message.karmas = {};
    if (object.karmas !== undefined && object.karmas !== null) {
      Object.entries(object.karmas).forEach(([key, value]) => {
        if (value !== undefined) {
          // message.karmas[key] = Long(value);
        }
      });
    }
    return message;
  },
};

const baseQueryKarmasResponse_KarmasEntry: object = {
  key: "",
  value: Long.UZERO,
};

export const QueryKarmasResponse_KarmasEntry = {
  encode(
    message: QueryKarmasResponse_KarmasEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (!message.value.isZero()) {
      writer.uint32(16).uint64(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryKarmasResponse_KarmasEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryKarmasResponse_KarmasEntry,
    } as QueryKarmasResponse_KarmasEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryKarmasResponse_KarmasEntry {
    const message = {
      ...baseQueryKarmasResponse_KarmasEntry,
    } as QueryKarmasResponse_KarmasEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Long.fromString(object.value);
    } else {
      message.value = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryKarmasResponse_KarmasEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = (message.value || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryKarmasResponse_KarmasEntry>
  ): QueryKarmasResponse_KarmasEntry {
    const message = {
      ...baseQueryKarmasResponse_KarmasEntry,
    } as QueryKarmasResponse_KarmasEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value as Long;
    } else {
      message.value = Long.UZERO;
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
  Entropy(request: QueryEntropyRequest): Promise<QueryEntropyResponse>;
  Luminosity(request: QueryLuminosityRequest): Promise<QueryLuminosityResponse>;
  Karma(request: QueryKarmaRequest): Promise<QueryKarmaResponse>;
  Karmas(request: QueryKarmasRequest): Promise<QueryKarmasResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Rank = this.Rank.bind(this);
    this.Search = this.Search.bind(this);
    this.Backlinks = this.Backlinks.bind(this);
    this.Top = this.Top.bind(this);
    this.IsLinkExist = this.IsLinkExist.bind(this);
    this.IsAnyLinkExist = this.IsAnyLinkExist.bind(this);
    this.Entropy = this.Entropy.bind(this);
    this.Luminosity = this.Luminosity.bind(this);
    this.Karma = this.Karma.bind(this);
    this.Karmas = this.Karmas.bind(this);
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

  Entropy(request: QueryEntropyRequest): Promise<QueryEntropyResponse> {
    const data = QueryEntropyRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.rank.v1beta1.Query",
      "Entropy",
      data
    );
    return promise.then((data) =>
      QueryEntropyResponse.decode(new _m0.Reader(data))
    );
  }

  Luminosity(
    request: QueryLuminosityRequest
  ): Promise<QueryLuminosityResponse> {
    const data = QueryLuminosityRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.rank.v1beta1.Query",
      "Luminosity",
      data
    );
    return promise.then((data) =>
      QueryLuminosityResponse.decode(new _m0.Reader(data))
    );
  }

  Karma(request: QueryKarmaRequest): Promise<QueryKarmaResponse> {
    const data = QueryKarmaRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.rank.v1beta1.Query", "Karma", data);
    return promise.then((data) =>
      QueryKarmaResponse.decode(new _m0.Reader(data))
    );
  }

  Karmas(request: QueryKarmasRequest): Promise<QueryKarmasResponse> {
    const data = QueryKarmasRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.rank.v1beta1.Query",
      "Karmas",
      data
    );
    return promise.then((data) =>
      QueryKarmasResponse.decode(new _m0.Reader(data))
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
