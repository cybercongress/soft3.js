/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.graph.v1beta1";

export interface QueryGraphStatsRequest {}

export interface QueryGraphStatsResponse {
  cyberlinks: Long;
  particles: Long;
}

const baseQueryGraphStatsRequest: object = {};

export const QueryGraphStatsRequest = {
  encode(_: QueryGraphStatsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGraphStatsRequest {
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

const baseQueryGraphStatsResponse: object = { cyberlinks: Long.UZERO, particles: Long.UZERO };

export const QueryGraphStatsResponse = {
  encode(message: QueryGraphStatsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.cyberlinks.isZero()) {
      writer.uint32(8).uint64(message.cyberlinks);
    }
    if (!message.particles.isZero()) {
      writer.uint32(16).uint64(message.particles);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGraphStatsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGraphStatsResponse } as QueryGraphStatsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cyberlinks = reader.uint64() as Long;
          break;
        case 2:
          message.particles = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGraphStatsResponse {
    const message = { ...baseQueryGraphStatsResponse } as QueryGraphStatsResponse;
    if (object.cyberlinks !== undefined && object.cyberlinks !== null) {
      message.cyberlinks = Long.fromString(object.cyberlinks);
    } else {
      message.cyberlinks = Long.UZERO;
    }
    if (object.particles !== undefined && object.particles !== null) {
      message.particles = Long.fromString(object.particles);
    } else {
      message.particles = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryGraphStatsResponse): unknown {
    const obj: any = {};
    message.cyberlinks !== undefined && (obj.cyberlinks = (message.cyberlinks || Long.UZERO).toString());
    message.particles !== undefined && (obj.particles = (message.particles || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGraphStatsResponse>): QueryGraphStatsResponse {
    const message = { ...baseQueryGraphStatsResponse } as QueryGraphStatsResponse;
    if (object.cyberlinks !== undefined && object.cyberlinks !== null) {
      message.cyberlinks = object.cyberlinks as Long;
    } else {
      message.cyberlinks = Long.UZERO;
    }
    if (object.particles !== undefined && object.particles !== null) {
      message.particles = object.particles as Long;
    } else {
      message.particles = Long.UZERO;
    }
    return message;
  },
};

export interface Query {
  GraphStats(request: QueryGraphStatsRequest): Promise<QueryGraphStatsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GraphStats = this.GraphStats.bind(this);
  }
  GraphStats(request: QueryGraphStatsRequest): Promise<QueryGraphStatsResponse> {
    const data = QueryGraphStatsRequest.encode(request).finish();
    const promise = this.rpc.request("cyber.graph.v1beta1.Query", "GraphStats", data);
    return promise.then((data) => QueryGraphStatsResponse.decode(new _m0.Reader(data)));
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
