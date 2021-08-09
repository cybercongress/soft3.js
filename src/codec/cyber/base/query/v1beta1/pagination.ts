/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.base.query.v1beta1";

export interface PageRequest {
  page: number;
  perPage: number;
}

export interface PageResponse {
  total: number;
}

const basePageRequest: object = { page: 0, perPage: 0 };

export const PageRequest = {
  encode(message: PageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.page !== 0) {
      writer.uint32(8).uint32(message.page);
    }
    if (message.perPage !== 0) {
      writer.uint32(16).uint32(message.perPage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePageRequest } as PageRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.page = reader.uint32();
          break;
        case 2:
          message.perPage = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PageRequest {
    const message = { ...basePageRequest } as PageRequest;
    if (object.page !== undefined && object.page !== null) {
      message.page = Number(object.page);
    } else {
      message.page = 0;
    }
    if (object.perPage !== undefined && object.perPage !== null) {
      message.perPage = Number(object.perPage);
    } else {
      message.perPage = 0;
    }
    return message;
  },

  toJSON(message: PageRequest): unknown {
    const obj: any = {};
    message.page !== undefined && (obj.page = message.page);
    message.perPage !== undefined && (obj.perPage = message.perPage);
    return obj;
  },

  fromPartial(object: DeepPartial<PageRequest>): PageRequest {
    const message = { ...basePageRequest } as PageRequest;
    if (object.page !== undefined && object.page !== null) {
      message.page = object.page;
    } else {
      message.page = 0;
    }
    if (object.perPage !== undefined && object.perPage !== null) {
      message.perPage = object.perPage;
    } else {
      message.perPage = 0;
    }
    return message;
  },
};

const basePageResponse: object = { total: 0 };

export const PageResponse = {
  encode(message: PageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePageResponse } as PageResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PageResponse {
    const message = { ...basePageResponse } as PageResponse;
    if (object.total !== undefined && object.total !== null) {
      message.total = Number(object.total);
    } else {
      message.total = 0;
    }
    return message;
  },

  toJSON(message: PageResponse): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = message.total);
    return obj;
  },

  fromPartial(object: DeepPartial<PageResponse>): PageResponse {
    const message = { ...basePageResponse } as PageResponse;
    if (object.total !== undefined && object.total !== null) {
      message.total = object.total;
    } else {
      message.total = 0;
    }
    return message;
  },
};

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
