/* eslint-disable */
import { Coin } from "../../cosmos_proto/coin";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.resources.v1beta1";

export interface MsgConvert {
  agent: string;
  amount?: Coin;
  resource: string;
  endTime: Long;
}

export interface MsgConvertResponse {}

const baseMsgConvert: object = { agent: "", resource: "", endTime: Long.UZERO };

export const MsgConvert = {
  encode(
    message: MsgConvert,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.agent !== "") {
      writer.uint32(10).string(message.agent);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.resource !== "") {
      writer.uint32(26).string(message.resource);
    }
    if (!message.endTime.isZero()) {
      writer.uint32(32).uint64(message.endTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConvert {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgConvert } as MsgConvert;
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
          message.endTime = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgConvert {
    const message = { ...baseMsgConvert } as MsgConvert;
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
    if (object.endTime !== undefined && object.endTime !== null) {
      message.endTime = Long.fromString(object.endTime);
    } else {
      message.endTime = Long.UZERO;
    }
    return message;
  },

  toJSON(message: MsgConvert): unknown {
    const obj: any = {};
    message.agent !== undefined && (obj.agent = message.agent);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.resource !== undefined && (obj.resource = message.resource);
    message.endTime !== undefined &&
      (obj.endTime = (message.endTime || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MsgConvert>): MsgConvert {
    const message = { ...baseMsgConvert } as MsgConvert;
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
    if (object.endTime !== undefined && object.endTime !== null) {
      message.endTime = object.endTime as Long;
    } else {
      message.endTime = Long.UZERO;
    }
    return message;
  },
};

const baseMsgConvertResponse: object = {};

export const MsgConvertResponse = {
  encode(
    _: MsgConvertResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConvertResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgConvertResponse } as MsgConvertResponse;
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

  fromJSON(_: any): MsgConvertResponse {
    const message = { ...baseMsgConvertResponse } as MsgConvertResponse;
    return message;
  },

  toJSON(_: MsgConvertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgConvertResponse>): MsgConvertResponse {
    const message = { ...baseMsgConvertResponse } as MsgConvertResponse;
    return message;
  },
};

export interface Msg {
  /**
   * rpc CreateResource(MsgCreateResource) returns (MsgCreateResourceResponse);
   * rpc RedeemResource(MsgRedeemResource) returns (MsgRedeemResourceResponse);
   */
  Convert(request: MsgConvert): Promise<MsgConvertResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Convert(request: MsgConvert): Promise<MsgConvertResponse> {
    const data = MsgConvert.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.resources.v1beta1.Msg",
      "Convert",
      data
    );
    return promise.then((data) =>
      MsgConvertResponse.decode(new _m0.Reader(data))
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
