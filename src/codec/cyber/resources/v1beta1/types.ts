/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos_proto/coin";

export const protobufPackage = "cyber.resources.v1beta1";

export interface Params {
  maxSlots: number;
  baseHalvingPeriodVolt: number;
  baseHalvingPeriodAmpere: number;
  baseInvestmintPeriodVolt: number;
  baseInvestmintPeriodAmpere: number;
  minInvestmintPeriodSec: number;
  baseInvestmintAmountVolt?: Coin;
  baseInvestmintAmountAmpere?: Coin;
}

const baseParams: object = {
  maxSlots: 0,
  baseHalvingPeriodVolt: 0,
  baseHalvingPeriodAmpere: 0,
  baseInvestmintPeriodVolt: 0,
  baseInvestmintPeriodAmpere: 0,
  minInvestmintPeriodSec: 0,
};

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxSlots !== 0) {
      writer.uint32(8).uint32(message.maxSlots);
    }
    if (message.baseHalvingPeriodVolt !== 0) {
      writer.uint32(16).uint32(message.baseHalvingPeriodVolt);
    }
    if (message.baseHalvingPeriodAmpere !== 0) {
      writer.uint32(24).uint32(message.baseHalvingPeriodAmpere);
    }
    if (message.baseInvestmintPeriodVolt !== 0) {
      writer.uint32(32).uint32(message.baseInvestmintPeriodVolt);
    }
    if (message.baseInvestmintPeriodAmpere !== 0) {
      writer.uint32(40).uint32(message.baseInvestmintPeriodAmpere);
    }
    if (message.minInvestmintPeriodSec !== 0) {
      writer.uint32(48).uint32(message.minInvestmintPeriodSec);
    }
    if (message.baseInvestmintAmountVolt !== undefined) {
      Coin.encode(message.baseInvestmintAmountVolt, writer.uint32(58).fork()).ldelim();
    }
    if (message.baseInvestmintAmountAmpere !== undefined) {
      Coin.encode(message.baseInvestmintAmountAmpere, writer.uint32(66).fork()).ldelim();
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
          message.baseHalvingPeriodVolt = reader.uint32();
          break;
        case 3:
          message.baseHalvingPeriodAmpere = reader.uint32();
          break;
        case 4:
          message.baseInvestmintPeriodVolt = reader.uint32();
          break;
        case 5:
          message.baseInvestmintPeriodAmpere = reader.uint32();
          break;
        case 6:
          message.minInvestmintPeriodSec = reader.uint32();
          break;
        case 7:
          message.baseInvestmintAmountVolt = Coin.decode(reader, reader.uint32());
          break;
        case 8:
          message.baseInvestmintAmountAmpere = Coin.decode(reader, reader.uint32());
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
    if (object.baseHalvingPeriodVolt !== undefined && object.baseHalvingPeriodVolt !== null) {
      message.baseHalvingPeriodVolt = Number(object.baseHalvingPeriodVolt);
    } else {
      message.baseHalvingPeriodVolt = 0;
    }
    if (object.baseHalvingPeriodAmpere !== undefined && object.baseHalvingPeriodAmpere !== null) {
      message.baseHalvingPeriodAmpere = Number(object.baseHalvingPeriodAmpere);
    } else {
      message.baseHalvingPeriodAmpere = 0;
    }
    if (object.baseInvestmintPeriodVolt !== undefined && object.baseInvestmintPeriodVolt !== null) {
      message.baseInvestmintPeriodVolt = Number(object.baseInvestmintPeriodVolt);
    } else {
      message.baseInvestmintPeriodVolt = 0;
    }
    if (object.baseInvestmintPeriodAmpere !== undefined && object.baseInvestmintPeriodAmpere !== null) {
      message.baseInvestmintPeriodAmpere = Number(object.baseInvestmintPeriodAmpere);
    } else {
      message.baseInvestmintPeriodAmpere = 0;
    }
    if (object.minInvestmintPeriodSec !== undefined && object.minInvestmintPeriodSec !== null) {
      message.minInvestmintPeriodSec = Number(object.minInvestmintPeriodSec);
    } else {
      message.minInvestmintPeriodSec = 0;
    }
    if (object.baseInvestmintAmountVolt !== undefined && object.baseInvestmintAmountVolt !== null) {
      message.baseInvestmintAmountVolt = Coin.fromJSON(object.baseInvestmintAmountVolt);
    } else {
      message.baseInvestmintAmountVolt = undefined;
    }
    if (object.baseInvestmintAmountAmpere !== undefined && object.baseInvestmintAmountAmpere !== null) {
      message.baseInvestmintAmountAmpere = Coin.fromJSON(object.baseInvestmintAmountAmpere);
    } else {
      message.baseInvestmintAmountAmpere = undefined;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.maxSlots !== undefined && (obj.maxSlots = message.maxSlots);
    message.baseHalvingPeriodVolt !== undefined &&
      (obj.baseHalvingPeriodVolt = message.baseHalvingPeriodVolt);
    message.baseHalvingPeriodAmpere !== undefined &&
      (obj.baseHalvingPeriodAmpere = message.baseHalvingPeriodAmpere);
    message.baseInvestmintPeriodVolt !== undefined &&
      (obj.baseInvestmintPeriodVolt = message.baseInvestmintPeriodVolt);
    message.baseInvestmintPeriodAmpere !== undefined &&
      (obj.baseInvestmintPeriodAmpere = message.baseInvestmintPeriodAmpere);
    message.minInvestmintPeriodSec !== undefined &&
      (obj.minInvestmintPeriodSec = message.minInvestmintPeriodSec);
    message.baseInvestmintAmountVolt !== undefined &&
      (obj.baseInvestmintAmountVolt = message.baseInvestmintAmountVolt
        ? Coin.toJSON(message.baseInvestmintAmountVolt)
        : undefined);
    message.baseInvestmintAmountAmpere !== undefined &&
      (obj.baseInvestmintAmountAmpere = message.baseInvestmintAmountAmpere
        ? Coin.toJSON(message.baseInvestmintAmountAmpere)
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
    if (object.baseHalvingPeriodVolt !== undefined && object.baseHalvingPeriodVolt !== null) {
      message.baseHalvingPeriodVolt = object.baseHalvingPeriodVolt;
    } else {
      message.baseHalvingPeriodVolt = 0;
    }
    if (object.baseHalvingPeriodAmpere !== undefined && object.baseHalvingPeriodAmpere !== null) {
      message.baseHalvingPeriodAmpere = object.baseHalvingPeriodAmpere;
    } else {
      message.baseHalvingPeriodAmpere = 0;
    }
    if (object.baseInvestmintPeriodVolt !== undefined && object.baseInvestmintPeriodVolt !== null) {
      message.baseInvestmintPeriodVolt = object.baseInvestmintPeriodVolt;
    } else {
      message.baseInvestmintPeriodVolt = 0;
    }
    if (object.baseInvestmintPeriodAmpere !== undefined && object.baseInvestmintPeriodAmpere !== null) {
      message.baseInvestmintPeriodAmpere = object.baseInvestmintPeriodAmpere;
    } else {
      message.baseInvestmintPeriodAmpere = 0;
    }
    if (object.minInvestmintPeriodSec !== undefined && object.minInvestmintPeriodSec !== null) {
      message.minInvestmintPeriodSec = object.minInvestmintPeriodSec;
    } else {
      message.minInvestmintPeriodSec = 0;
    }
    if (object.baseInvestmintAmountVolt !== undefined && object.baseInvestmintAmountVolt !== null) {
      message.baseInvestmintAmountVolt = Coin.fromPartial(object.baseInvestmintAmountVolt);
    } else {
      message.baseInvestmintAmountVolt = undefined;
    }
    if (object.baseInvestmintAmountAmpere !== undefined && object.baseInvestmintAmountAmpere !== null) {
      message.baseInvestmintAmountAmpere = Coin.fromPartial(object.baseInvestmintAmountAmpere);
    } else {
      message.baseInvestmintAmountAmpere = undefined;
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
