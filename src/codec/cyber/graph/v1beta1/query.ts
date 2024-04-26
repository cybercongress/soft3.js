/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.graph.v1beta1";

export interface QueryGraphStatsRequest {
}

export interface QueryGraphStatsResponse {
  cyberlinks: Long;
  particles: Long;
}

function createBaseQueryGraphStatsRequest(): QueryGraphStatsRequest {
  return {};
}

export const QueryGraphStatsRequest = {
  encode(_: QueryGraphStatsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGraphStatsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGraphStatsRequest();
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

  fromJSON(_: any): QueryGraphStatsRequest {
    return {};
  },

  toJSON(_: QueryGraphStatsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGraphStatsRequest>, I>>(base?: I): QueryGraphStatsRequest {
    return QueryGraphStatsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGraphStatsRequest>, I>>(_: I): QueryGraphStatsRequest {
    const message = createBaseQueryGraphStatsRequest();
    return message;
  },
};

function createBaseQueryGraphStatsResponse(): QueryGraphStatsResponse {
  return { cyberlinks: Long.UZERO, particles: Long.UZERO };
}

export const QueryGraphStatsResponse = {
  encode(message: QueryGraphStatsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.cyberlinks.equals(Long.UZERO)) {
      writer.uint32(8).uint64(message.cyberlinks);
    }
    if (!message.particles.equals(Long.UZERO)) {
      writer.uint32(16).uint64(message.particles);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGraphStatsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGraphStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.cyberlinks = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.particles = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGraphStatsResponse {
    return {
      cyberlinks: isSet(object.cyberlinks) ? Long.fromValue(object.cyberlinks) : Long.UZERO,
      particles: isSet(object.particles) ? Long.fromValue(object.particles) : Long.UZERO,
    };
  },

  toJSON(message: QueryGraphStatsResponse): unknown {
    const obj: any = {};
    if (!message.cyberlinks.equals(Long.UZERO)) {
      obj.cyberlinks = (message.cyberlinks || Long.UZERO).toString();
    }
    if (!message.particles.equals(Long.UZERO)) {
      obj.particles = (message.particles || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGraphStatsResponse>, I>>(base?: I): QueryGraphStatsResponse {
    return QueryGraphStatsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGraphStatsResponse>, I>>(object: I): QueryGraphStatsResponse {
    const message = createBaseQueryGraphStatsResponse();
    message.cyberlinks = (object.cyberlinks !== undefined && object.cyberlinks !== null)
      ? Long.fromValue(object.cyberlinks)
      : Long.UZERO;
    message.particles = (object.particles !== undefined && object.particles !== null)
      ? Long.fromValue(object.particles)
      : Long.UZERO;
    return message;
  },
};

export interface Query {
  GraphStats(request: QueryGraphStatsRequest): Promise<QueryGraphStatsResponse>;
}

export const QueryServiceName = "cyber.graph.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.GraphStats = this.GraphStats.bind(this);
  }
  GraphStats(request: QueryGraphStatsRequest): Promise<QueryGraphStatsResponse> {
    const data = QueryGraphStatsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GraphStats", data);
    return promise.then((data) => QueryGraphStatsResponse.decode(_m0.Reader.create(data)));
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
