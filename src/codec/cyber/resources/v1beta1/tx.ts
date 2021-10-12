/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos_proto/coin";

export const protobufPackage = "cyber.resources.v1beta1";

export interface MsgInvestmint {
  agent: string;
  amount?: Coin;
  resource: string;
  length: Long;
}

/**
 * cosmos.base.v1beta1.Coin investmint_resource = 1 [
 *        (gogoproto.moretags) = "yaml:\"investmint_resource\"",
 *        (gogoproto.nullable) = false
 *    ];
 */
export interface MsgInvestmintResponse {}

const baseMsgInvestmint: object = { agent: "", resource: "", length: Long.UZERO };

export const MsgInvestmint = {
  encode(message: MsgInvestmint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.agent !== "") {
      writer.uint32(10).string(message.agent);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.resource !== "") {
      writer.uint32(26).string(message.resource);
    }
    if (!message.length.isZero()) {
      writer.uint32(32).uint64(message.length);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInvestmint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgInvestmint } as MsgInvestmint;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.agent = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.resource = reader.string();
          break;
        case 4:
          message.length = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInvestmint {
    const message = { ...baseMsgInvestmint } as MsgInvestmint;
    if (object.agent !== undefined && object.agent !== null) {
      message.agent = String(object.agent);
    } else {
      message.agent = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromJSON(object.amount);
    } else {
      message.amount = undefined;
    }
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = String(object.resource);
    } else {
      message.resource = "";
    }
    if (object.length !== undefined && object.length !== null) {
      message.length = Long.fromString(object.length);
    } else {
      message.length = Long.UZERO;
    }
    return message;
  },

  toJSON(message: MsgInvestmint): unknown {
    const obj: any = {};
    message.agent !== undefined && (obj.agent = message.agent);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.resource !== undefined && (obj.resource = message.resource);
    message.length !== undefined && (obj.length = (message.length || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MsgInvestmint>): MsgInvestmint {
    const message = { ...baseMsgInvestmint } as MsgInvestmint;
    if (object.agent !== undefined && object.agent !== null) {
      message.agent = object.agent;
    } else {
      message.agent = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromPartial(object.amount);
    } else {
      message.amount = undefined;
    }
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = object.resource;
    } else {
      message.resource = "";
    }
    if (object.length !== undefined && object.length !== null) {
      message.length = object.length as Long;
    } else {
      message.length = Long.UZERO;
    }
    return message;
  },
};

const baseMsgInvestmintResponse: object = {};

export const MsgInvestmintResponse = {
  encode(_: MsgInvestmintResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInvestmintResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgInvestmintResponse } as MsgInvestmintResponse;
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

  fromJSON(_: any): MsgInvestmintResponse {
    const message = { ...baseMsgInvestmintResponse } as MsgInvestmintResponse;
    return message;
  },

  toJSON(_: MsgInvestmintResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgInvestmintResponse>): MsgInvestmintResponse {
    const message = { ...baseMsgInvestmintResponse } as MsgInvestmintResponse;
    return message;
  },
};

export interface Msg {
  Investmint(request: MsgInvestmint): Promise<MsgInvestmintResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Investmint = this.Investmint.bind(this);
  }
  Investmint(request: MsgInvestmint): Promise<MsgInvestmintResponse> {
    const data = MsgInvestmint.encode(request).finish();
    const promise = this.rpc.request("cyber.resources.v1beta1.Msg", "Investmint", data);
    return promise.then((data) => MsgInvestmintResponse.decode(new _m0.Reader(data)));
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
