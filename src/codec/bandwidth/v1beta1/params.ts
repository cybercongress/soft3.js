/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.bandwidth.v1beta1";

export interface Params {
  txCost: Long;
  linkCost: Long;
  recoveryPeriod: Long;
  adjustPricePeriod: Long;
  baseCreditPrice: string;
  desirableBandwidth: Long;
  maxBlockBandwidth: Long;
}

const baseParams: object = {
  txCost: Long.UZERO,
  linkCost: Long.UZERO,
  recoveryPeriod: Long.UZERO,
  adjustPricePeriod: Long.UZERO,
  baseCreditPrice: "",
  desirableBandwidth: Long.UZERO,
  maxBlockBandwidth: Long.UZERO,
};

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.txCost.isZero()) {
      writer.uint32(8).uint64(message.txCost);
    }
    if (!message.linkCost.isZero()) {
      writer.uint32(16).uint64(message.linkCost);
    }
    if (!message.recoveryPeriod.isZero()) {
      writer.uint32(24).uint64(message.recoveryPeriod);
    }
    if (!message.adjustPricePeriod.isZero()) {
      writer.uint32(32).uint64(message.adjustPricePeriod);
    }
    if (message.baseCreditPrice !== "") {
      writer.uint32(42).string(message.baseCreditPrice);
    }
    if (!message.desirableBandwidth.isZero()) {
      writer.uint32(48).uint64(message.desirableBandwidth);
    }
    if (!message.maxBlockBandwidth.isZero()) {
      writer.uint32(56).uint64(message.maxBlockBandwidth);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txCost = reader.uint64() as Long;
          break;
        case 2:
          message.linkCost = reader.uint64() as Long;
          break;
        case 3:
          message.recoveryPeriod = reader.uint64() as Long;
          break;
        case 4:
          message.adjustPricePeriod = reader.uint64() as Long;
          break;
        case 5:
          message.baseCreditPrice = reader.string();
          break;
        case 6:
          message.desirableBandwidth = reader.uint64() as Long;
          break;
        case 7:
          message.maxBlockBandwidth = reader.uint64() as Long;
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
    if (object.txCost !== undefined && object.txCost !== null) {
      message.txCost = Long.fromString(object.txCost);
    } else {
      message.txCost = Long.UZERO;
    }
    if (object.linkCost !== undefined && object.linkCost !== null) {
      message.linkCost = Long.fromString(object.linkCost);
    } else {
      message.linkCost = Long.UZERO;
    }
    if (object.recoveryPeriod !== undefined && object.recoveryPeriod !== null) {
      message.recoveryPeriod = Long.fromString(object.recoveryPeriod);
    } else {
      message.recoveryPeriod = Long.UZERO;
    }
    if (
      object.adjustPricePeriod !== undefined &&
      object.adjustPricePeriod !== null
    ) {
      message.adjustPricePeriod = Long.fromString(object.adjustPricePeriod);
    } else {
      message.adjustPricePeriod = Long.UZERO;
    }
    if (
      object.baseCreditPrice !== undefined &&
      object.baseCreditPrice !== null
    ) {
      message.baseCreditPrice = String(object.baseCreditPrice);
    } else {
      message.baseCreditPrice = "";
    }
    if (
      object.desirableBandwidth !== undefined &&
      object.desirableBandwidth !== null
    ) {
      message.desirableBandwidth = Long.fromString(object.desirableBandwidth);
    } else {
      message.desirableBandwidth = Long.UZERO;
    }
    if (
      object.maxBlockBandwidth !== undefined &&
      object.maxBlockBandwidth !== null
    ) {
      message.maxBlockBandwidth = Long.fromString(object.maxBlockBandwidth);
    } else {
      message.maxBlockBandwidth = Long.UZERO;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.txCost !== undefined &&
      (obj.txCost = (message.txCost || Long.UZERO).toString());
    message.linkCost !== undefined &&
      (obj.linkCost = (message.linkCost || Long.UZERO).toString());
    message.recoveryPeriod !== undefined &&
      (obj.recoveryPeriod = (message.recoveryPeriod || Long.UZERO).toString());
    message.adjustPricePeriod !== undefined &&
      (obj.adjustPricePeriod = (
        message.adjustPricePeriod || Long.UZERO
      ).toString());
    message.baseCreditPrice !== undefined &&
      (obj.baseCreditPrice = message.baseCreditPrice);
    message.desirableBandwidth !== undefined &&
      (obj.desirableBandwidth = (
        message.desirableBandwidth || Long.UZERO
      ).toString());
    message.maxBlockBandwidth !== undefined &&
      (obj.maxBlockBandwidth = (
        message.maxBlockBandwidth || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.txCost !== undefined && object.txCost !== null) {
      message.txCost = object.txCost as Long;
    } else {
      message.txCost = Long.UZERO;
    }
    if (object.linkCost !== undefined && object.linkCost !== null) {
      message.linkCost = object.linkCost as Long;
    } else {
      message.linkCost = Long.UZERO;
    }
    if (object.recoveryPeriod !== undefined && object.recoveryPeriod !== null) {
      message.recoveryPeriod = object.recoveryPeriod as Long;
    } else {
      message.recoveryPeriod = Long.UZERO;
    }
    if (
      object.adjustPricePeriod !== undefined &&
      object.adjustPricePeriod !== null
    ) {
      message.adjustPricePeriod = object.adjustPricePeriod as Long;
    } else {
      message.adjustPricePeriod = Long.UZERO;
    }
    if (
      object.baseCreditPrice !== undefined &&
      object.baseCreditPrice !== null
    ) {
      message.baseCreditPrice = object.baseCreditPrice;
    } else {
      message.baseCreditPrice = "";
    }
    if (
      object.desirableBandwidth !== undefined &&
      object.desirableBandwidth !== null
    ) {
      message.desirableBandwidth = object.desirableBandwidth as Long;
    } else {
      message.desirableBandwidth = Long.UZERO;
    }
    if (
      object.maxBlockBandwidth !== undefined &&
      object.maxBlockBandwidth !== null
    ) {
      message.maxBlockBandwidth = object.maxBlockBandwidth as Long;
    } else {
      message.maxBlockBandwidth = Long.UZERO;
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
