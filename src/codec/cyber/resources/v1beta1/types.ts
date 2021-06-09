/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos_proto/coin";

export const protobufPackage = "cyber.resources.v1beta1";

export interface Params {
  maxSlots: number;
  baseVestingTime: Long;
  baseVestingResource?: Coin;
}

const baseParams: object = { maxSlots: 0, baseVestingTime: Long.UZERO };

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.maxSlots !== 0) {
      writer.uint32(8).uint32(message.maxSlots);
    }
    if (!message.baseVestingTime.isZero()) {
      writer.uint32(16).uint64(message.baseVestingTime);
    }
    if (message.baseVestingResource !== undefined) {
      Coin.encode(
        message.baseVestingResource,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxSlots = reader.uint32();
          break;
        case 2:
          message.baseVestingTime = reader.uint64() as Long;
          break;
        case 3:
          message.baseVestingResource = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    if (object.maxSlots !== undefined && object.maxSlots !== null) {
      message.maxSlots = Number(object.maxSlots);
    } else {
      message.maxSlots = 0;
    }
    if (
      object.baseVestingTime !== undefined &&
      object.baseVestingTime !== null
    ) {
      message.baseVestingTime = Long.fromString(object.baseVestingTime);
    } else {
      message.baseVestingTime = Long.UZERO;
    }
    if (
      object.baseVestingResource !== undefined &&
      object.baseVestingResource !== null
    ) {
      message.baseVestingResource = Coin.fromJSON(object.baseVestingResource);
    } else {
      message.baseVestingResource = undefined;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.maxSlots !== undefined && (obj.maxSlots = message.maxSlots);
    message.baseVestingTime !== undefined &&
      (obj.baseVestingTime = (
        message.baseVestingTime || Long.UZERO
      ).toString());
    message.baseVestingResource !== undefined &&
      (obj.baseVestingResource = message.baseVestingResource
        ? Coin.toJSON(message.baseVestingResource)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.maxSlots !== undefined && object.maxSlots !== null) {
      message.maxSlots = object.maxSlots;
    } else {
      message.maxSlots = 0;
    }
    if (
      object.baseVestingTime !== undefined &&
      object.baseVestingTime !== null
    ) {
      message.baseVestingTime = object.baseVestingTime as Long;
    } else {
      message.baseVestingTime = Long.UZERO;
    }
    if (
      object.baseVestingResource !== undefined &&
      object.baseVestingResource !== null
    ) {
      message.baseVestingResource = Coin.fromPartial(
        object.baseVestingResource
      );
    } else {
      message.baseVestingResource = undefined;
    }
    return message;
  },
};

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
