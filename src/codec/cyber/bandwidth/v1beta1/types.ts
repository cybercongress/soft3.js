/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.bandwidth.v1beta1";

export interface Params {
  recoveryPeriod: Long;
  adjustPricePeriod: Long;
  basePrice: string;
  baseLoad: string;
  maxBlockBandwidth: Long;
}

export interface NeuronBandwidth {
  neuron: string;
  remainedValue: Long;
  lastUpdatedBlock: Long;
  maxValue: Long;
}

export interface Price {
  price: string;
}

const baseParams: object = {
  recoveryPeriod: Long.UZERO,
  adjustPricePeriod: Long.UZERO,
  basePrice: "",
  baseLoad: "",
  maxBlockBandwidth: Long.UZERO,
};

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.recoveryPeriod.isZero()) {
      writer.uint32(8).uint64(message.recoveryPeriod);
    }
    if (!message.adjustPricePeriod.isZero()) {
      writer.uint32(16).uint64(message.adjustPricePeriod);
    }
    if (message.basePrice !== "") {
      writer.uint32(26).string(message.basePrice);
    }
    if (message.baseLoad !== "") {
      writer.uint32(34).string(message.baseLoad);
    }
    if (!message.maxBlockBandwidth.isZero()) {
      writer.uint32(40).uint64(message.maxBlockBandwidth);
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
          message.recoveryPeriod = reader.uint64() as Long;
          break;
        case 2:
          message.adjustPricePeriod = reader.uint64() as Long;
          break;
        case 3:
          message.basePrice = reader.string();
          break;
        case 4:
          message.baseLoad = reader.string();
          break;
        case 5:
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
    if (object.recoveryPeriod !== undefined && object.recoveryPeriod !== null) {
      message.recoveryPeriod = Long.fromString(object.recoveryPeriod);
    } else {
      message.recoveryPeriod = Long.UZERO;
    }
    if (object.adjustPricePeriod !== undefined && object.adjustPricePeriod !== null) {
      message.adjustPricePeriod = Long.fromString(object.adjustPricePeriod);
    } else {
      message.adjustPricePeriod = Long.UZERO;
    }
    if (object.basePrice !== undefined && object.basePrice !== null) {
      message.basePrice = String(object.basePrice);
    } else {
      message.basePrice = "";
    }
    if (object.baseLoad !== undefined && object.baseLoad !== null) {
      message.baseLoad = String(object.baseLoad);
    } else {
      message.baseLoad = "";
    }
    if (object.maxBlockBandwidth !== undefined && object.maxBlockBandwidth !== null) {
      message.maxBlockBandwidth = Long.fromString(object.maxBlockBandwidth);
    } else {
      message.maxBlockBandwidth = Long.UZERO;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.recoveryPeriod !== undefined &&
      (obj.recoveryPeriod = (message.recoveryPeriod || Long.UZERO).toString());
    message.adjustPricePeriod !== undefined &&
      (obj.adjustPricePeriod = (message.adjustPricePeriod || Long.UZERO).toString());
    message.basePrice !== undefined && (obj.basePrice = message.basePrice);
    message.baseLoad !== undefined && (obj.baseLoad = message.baseLoad);
    message.maxBlockBandwidth !== undefined &&
      (obj.maxBlockBandwidth = (message.maxBlockBandwidth || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.recoveryPeriod !== undefined && object.recoveryPeriod !== null) {
      message.recoveryPeriod = object.recoveryPeriod as Long;
    } else {
      message.recoveryPeriod = Long.UZERO;
    }
    if (object.adjustPricePeriod !== undefined && object.adjustPricePeriod !== null) {
      message.adjustPricePeriod = object.adjustPricePeriod as Long;
    } else {
      message.adjustPricePeriod = Long.UZERO;
    }
    if (object.basePrice !== undefined && object.basePrice !== null) {
      message.basePrice = object.basePrice;
    } else {
      message.basePrice = "";
    }
    if (object.baseLoad !== undefined && object.baseLoad !== null) {
      message.baseLoad = object.baseLoad;
    } else {
      message.baseLoad = "";
    }
    if (object.maxBlockBandwidth !== undefined && object.maxBlockBandwidth !== null) {
      message.maxBlockBandwidth = object.maxBlockBandwidth as Long;
    } else {
      message.maxBlockBandwidth = Long.UZERO;
    }
    return message;
  },
};

const baseNeuronBandwidth: object = {
  neuron: "",
  remainedValue: Long.UZERO,
  lastUpdatedBlock: Long.UZERO,
  maxValue: Long.UZERO,
};

export const NeuronBandwidth = {
  encode(message: NeuronBandwidth, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.neuron !== "") {
      writer.uint32(10).string(message.neuron);
    }
    if (!message.remainedValue.isZero()) {
      writer.uint32(16).uint64(message.remainedValue);
    }
    if (!message.lastUpdatedBlock.isZero()) {
      writer.uint32(24).uint64(message.lastUpdatedBlock);
    }
    if (!message.maxValue.isZero()) {
      writer.uint32(32).uint64(message.maxValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NeuronBandwidth {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNeuronBandwidth } as NeuronBandwidth;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.neuron = reader.string();
          break;
        case 2:
          message.remainedValue = reader.uint64() as Long;
          break;
        case 3:
          message.lastUpdatedBlock = reader.uint64() as Long;
          break;
        case 4:
          message.maxValue = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NeuronBandwidth {
    const message = { ...baseNeuronBandwidth } as NeuronBandwidth;
    if (object.neuron !== undefined && object.neuron !== null) {
      message.neuron = String(object.neuron);
    } else {
      message.neuron = "";
    }
    if (object.remainedValue !== undefined && object.remainedValue !== null) {
      message.remainedValue = Long.fromString(object.remainedValue);
    } else {
      message.remainedValue = Long.UZERO;
    }
    if (object.lastUpdatedBlock !== undefined && object.lastUpdatedBlock !== null) {
      message.lastUpdatedBlock = Long.fromString(object.lastUpdatedBlock);
    } else {
      message.lastUpdatedBlock = Long.UZERO;
    }
    if (object.maxValue !== undefined && object.maxValue !== null) {
      message.maxValue = Long.fromString(object.maxValue);
    } else {
      message.maxValue = Long.UZERO;
    }
    return message;
  },

  toJSON(message: NeuronBandwidth): unknown {
    const obj: any = {};
    message.neuron !== undefined && (obj.neuron = message.neuron);
    message.remainedValue !== undefined &&
      (obj.remainedValue = (message.remainedValue || Long.UZERO).toString());
    message.lastUpdatedBlock !== undefined &&
      (obj.lastUpdatedBlock = (message.lastUpdatedBlock || Long.UZERO).toString());
    message.maxValue !== undefined && (obj.maxValue = (message.maxValue || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<NeuronBandwidth>): NeuronBandwidth {
    const message = { ...baseNeuronBandwidth } as NeuronBandwidth;
    if (object.neuron !== undefined && object.neuron !== null) {
      message.neuron = object.neuron;
    } else {
      message.neuron = "";
    }
    if (object.remainedValue !== undefined && object.remainedValue !== null) {
      message.remainedValue = object.remainedValue as Long;
    } else {
      message.remainedValue = Long.UZERO;
    }
    if (object.lastUpdatedBlock !== undefined && object.lastUpdatedBlock !== null) {
      message.lastUpdatedBlock = object.lastUpdatedBlock as Long;
    } else {
      message.lastUpdatedBlock = Long.UZERO;
    }
    if (object.maxValue !== undefined && object.maxValue !== null) {
      message.maxValue = object.maxValue as Long;
    } else {
      message.maxValue = Long.UZERO;
    }
    return message;
  },
};

const basePrice: object = { price: "" };

export const Price = {
  encode(message: Price, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.price !== "") {
      writer.uint32(10).string(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Price {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePrice } as Price;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Price {
    const message = { ...basePrice } as Price;
    if (object.price !== undefined && object.price !== null) {
      message.price = String(object.price);
    } else {
      message.price = "";
    }
    return message;
  },

  toJSON(message: Price): unknown {
    const obj: any = {};
    message.price !== undefined && (obj.price = message.price);
    return obj;
  },

  fromPartial(object: DeepPartial<Price>): Price {
    const message = { ...basePrice } as Price;
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    } else {
      message.price = "";
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
