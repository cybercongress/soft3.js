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

function createBasePageRequest(): PageRequest {
  return { page: 0, perPage: 0 };
}

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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.page = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.perPage = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PageRequest {
    return {
      page: isSet(object.page) ? globalThis.Number(object.page) : 0,
      perPage: isSet(object.perPage) ? globalThis.Number(object.perPage) : 0,
    };
  },

  toJSON(message: PageRequest): unknown {
    const obj: any = {};
    if (message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    if (message.perPage !== 0) {
      obj.perPage = Math.round(message.perPage);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PageRequest>, I>>(base?: I): PageRequest {
    return PageRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PageRequest>, I>>(object: I): PageRequest {
    const message = createBasePageRequest();
    message.page = object.page ?? 0;
    message.perPage = object.perPage ?? 0;
    return message;
  },
};

function createBasePageResponse(): PageResponse {
  return { total: 0 };
}

export const PageResponse = {
  encode(message: PageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PageResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.total = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PageResponse {
    return { total: isSet(object.total) ? globalThis.Number(object.total) : 0 };
  },

  toJSON(message: PageResponse): unknown {
    const obj: any = {};
    if (message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PageResponse>, I>>(base?: I): PageResponse {
    return PageResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PageResponse>, I>>(object: I): PageResponse {
    const message = createBasePageResponse();
    message.total = object.total ?? 0;
    return message;
  },
};

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
