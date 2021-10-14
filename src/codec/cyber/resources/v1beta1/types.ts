/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "cyber.resources.v1beta1";

export interface Params {
  maxSlots: number;
  halvingPeriodVoltBlocks: number;
  halvingPeriodAmpereBlocks: number;
  baseInvestmintPeriodVolt: number;
  baseInvestmintPeriodAmpere: number;
  minInvestmintPeriod: number;
  baseInvestmintAmountVolt?: Coin;
  baseInvestmintAmountAmpere?: Coin;
}

const baseParams: object = {
  maxSlots: 0,
  halvingPeriodVoltBlocks: 0,
  halvingPeriodAmpereBlocks: 0,
  baseInvestmintPeriodVolt: 0,
  baseInvestmintPeriodAmpere: 0,
  minInvestmintPeriod: 0,
};

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxSlots !== 0) {
      writer.uint32(8).uint32(message.maxSlots);
    }
    if (message.halvingPeriodVoltBlocks !== 0) {
      writer.uint32(16).uint32(message.halvingPeriodVoltBlocks);
    }
    if (message.halvingPeriodAmpereBlocks !== 0) {
      writer.uint32(24).uint32(message.halvingPeriodAmpereBlocks);
    }
    if (message.baseInvestmintPeriodVolt !== 0) {
      writer.uint32(32).uint32(message.baseInvestmintPeriodVolt);
    }
    if (message.baseInvestmintPeriodAmpere !== 0) {
      writer.uint32(40).uint32(message.baseInvestmintPeriodAmpere);
    }
    if (message.minInvestmintPeriod !== 0) {
      writer.uint32(48).uint32(message.minInvestmintPeriod);
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
          message.halvingPeriodVoltBlocks = reader.uint32();
          break;
        case 3:
          message.halvingPeriodAmpereBlocks = reader.uint32();
          break;
        case 4:
          message.baseInvestmintPeriodVolt = reader.uint32();
          break;
        case 5:
          message.baseInvestmintPeriodAmpere = reader.uint32();
          break;
        case 6:
          message.minInvestmintPeriod = reader.uint32();
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
    if (object.halvingPeriodVoltBlocks !== undefined && object.halvingPeriodVoltBlocks !== null) {
      message.halvingPeriodVoltBlocks = Number(object.halvingPeriodVoltBlocks);
    } else {
      message.halvingPeriodVoltBlocks = 0;
    }
    if (object.halvingPeriodAmpereBlocks !== undefined && object.halvingPeriodAmpereBlocks !== null) {
      message.halvingPeriodAmpereBlocks = Number(object.halvingPeriodAmpereBlocks);
    } else {
      message.halvingPeriodAmpereBlocks = 0;
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
    if (object.minInvestmintPeriod !== undefined && object.minInvestmintPeriod !== null) {
      message.minInvestmintPeriod = Number(object.minInvestmintPeriod);
    } else {
      message.minInvestmintPeriod = 0;
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
    message.halvingPeriodVoltBlocks !== undefined &&
      (obj.halvingPeriodVoltBlocks = message.halvingPeriodVoltBlocks);
    message.halvingPeriodAmpereBlocks !== undefined &&
      (obj.halvingPeriodAmpereBlocks = message.halvingPeriodAmpereBlocks);
    message.baseInvestmintPeriodVolt !== undefined &&
      (obj.baseInvestmintPeriodVolt = message.baseInvestmintPeriodVolt);
    message.baseInvestmintPeriodAmpere !== undefined &&
      (obj.baseInvestmintPeriodAmpere = message.baseInvestmintPeriodAmpere);
    message.minInvestmintPeriod !== undefined && (obj.minInvestmintPeriod = message.minInvestmintPeriod);
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
    if (object.halvingPeriodVoltBlocks !== undefined && object.halvingPeriodVoltBlocks !== null) {
      message.halvingPeriodVoltBlocks = object.halvingPeriodVoltBlocks;
    } else {
      message.halvingPeriodVoltBlocks = 0;
    }
    if (object.halvingPeriodAmpereBlocks !== undefined && object.halvingPeriodAmpereBlocks !== null) {
      message.halvingPeriodAmpereBlocks = object.halvingPeriodAmpereBlocks;
    } else {
      message.halvingPeriodAmpereBlocks = 0;
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
    if (object.minInvestmintPeriod !== undefined && object.minInvestmintPeriod !== null) {
      message.minInvestmintPeriod = object.minInvestmintPeriod;
    } else {
      message.minInvestmintPeriod = 0;
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
