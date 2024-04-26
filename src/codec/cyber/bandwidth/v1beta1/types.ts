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

function createBaseParams(): Params {
  return {
    recoveryPeriod: Long.UZERO,
    adjustPricePeriod: Long.UZERO,
    basePrice: "",
    baseLoad: "",
    maxBlockBandwidth: Long.UZERO,
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.recoveryPeriod.equals(Long.UZERO)) {
      writer.uint32(8).uint64(message.recoveryPeriod);
    }
    if (!message.adjustPricePeriod.equals(Long.UZERO)) {
      writer.uint32(16).uint64(message.adjustPricePeriod);
    }
    if (message.basePrice !== "") {
      writer.uint32(26).string(message.basePrice);
    }
    if (message.baseLoad !== "") {
      writer.uint32(34).string(message.baseLoad);
    }
    if (!message.maxBlockBandwidth.equals(Long.UZERO)) {
      writer.uint32(40).uint64(message.maxBlockBandwidth);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.recoveryPeriod = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.adjustPricePeriod = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.basePrice = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.baseLoad = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.maxBlockBandwidth = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      recoveryPeriod: isSet(object.recoveryPeriod) ? Long.fromValue(object.recoveryPeriod) : Long.UZERO,
      adjustPricePeriod: isSet(object.adjustPricePeriod) ? Long.fromValue(object.adjustPricePeriod) : Long.UZERO,
      basePrice: isSet(object.basePrice) ? globalThis.String(object.basePrice) : "",
      baseLoad: isSet(object.baseLoad) ? globalThis.String(object.baseLoad) : "",
      maxBlockBandwidth: isSet(object.maxBlockBandwidth) ? Long.fromValue(object.maxBlockBandwidth) : Long.UZERO,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (!message.recoveryPeriod.equals(Long.UZERO)) {
      obj.recoveryPeriod = (message.recoveryPeriod || Long.UZERO).toString();
    }
    if (!message.adjustPricePeriod.equals(Long.UZERO)) {
      obj.adjustPricePeriod = (message.adjustPricePeriod || Long.UZERO).toString();
    }
    if (message.basePrice !== "") {
      obj.basePrice = message.basePrice;
    }
    if (message.baseLoad !== "") {
      obj.baseLoad = message.baseLoad;
    }
    if (!message.maxBlockBandwidth.equals(Long.UZERO)) {
      obj.maxBlockBandwidth = (message.maxBlockBandwidth || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.recoveryPeriod = (object.recoveryPeriod !== undefined && object.recoveryPeriod !== null)
      ? Long.fromValue(object.recoveryPeriod)
      : Long.UZERO;
    message.adjustPricePeriod = (object.adjustPricePeriod !== undefined && object.adjustPricePeriod !== null)
      ? Long.fromValue(object.adjustPricePeriod)
      : Long.UZERO;
    message.basePrice = object.basePrice ?? "";
    message.baseLoad = object.baseLoad ?? "";
    message.maxBlockBandwidth = (object.maxBlockBandwidth !== undefined && object.maxBlockBandwidth !== null)
      ? Long.fromValue(object.maxBlockBandwidth)
      : Long.UZERO;
    return message;
  },
};

function createBaseNeuronBandwidth(): NeuronBandwidth {
  return { neuron: "", remainedValue: Long.UZERO, lastUpdatedBlock: Long.UZERO, maxValue: Long.UZERO };
}

export const NeuronBandwidth = {
  encode(message: NeuronBandwidth, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.neuron !== "") {
      writer.uint32(10).string(message.neuron);
    }
    if (!message.remainedValue.equals(Long.UZERO)) {
      writer.uint32(16).uint64(message.remainedValue);
    }
    if (!message.lastUpdatedBlock.equals(Long.UZERO)) {
      writer.uint32(24).uint64(message.lastUpdatedBlock);
    }
    if (!message.maxValue.equals(Long.UZERO)) {
      writer.uint32(32).uint64(message.maxValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NeuronBandwidth {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNeuronBandwidth();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.neuron = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.remainedValue = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lastUpdatedBlock = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.maxValue = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NeuronBandwidth {
    return {
      neuron: isSet(object.neuron) ? globalThis.String(object.neuron) : "",
      remainedValue: isSet(object.remainedValue) ? Long.fromValue(object.remainedValue) : Long.UZERO,
      lastUpdatedBlock: isSet(object.lastUpdatedBlock) ? Long.fromValue(object.lastUpdatedBlock) : Long.UZERO,
      maxValue: isSet(object.maxValue) ? Long.fromValue(object.maxValue) : Long.UZERO,
    };
  },

  toJSON(message: NeuronBandwidth): unknown {
    const obj: any = {};
    if (message.neuron !== "") {
      obj.neuron = message.neuron;
    }
    if (!message.remainedValue.equals(Long.UZERO)) {
      obj.remainedValue = (message.remainedValue || Long.UZERO).toString();
    }
    if (!message.lastUpdatedBlock.equals(Long.UZERO)) {
      obj.lastUpdatedBlock = (message.lastUpdatedBlock || Long.UZERO).toString();
    }
    if (!message.maxValue.equals(Long.UZERO)) {
      obj.maxValue = (message.maxValue || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NeuronBandwidth>, I>>(base?: I): NeuronBandwidth {
    return NeuronBandwidth.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NeuronBandwidth>, I>>(object: I): NeuronBandwidth {
    const message = createBaseNeuronBandwidth();
    message.neuron = object.neuron ?? "";
    message.remainedValue = (object.remainedValue !== undefined && object.remainedValue !== null)
      ? Long.fromValue(object.remainedValue)
      : Long.UZERO;
    message.lastUpdatedBlock = (object.lastUpdatedBlock !== undefined && object.lastUpdatedBlock !== null)
      ? Long.fromValue(object.lastUpdatedBlock)
      : Long.UZERO;
    message.maxValue = (object.maxValue !== undefined && object.maxValue !== null)
      ? Long.fromValue(object.maxValue)
      : Long.UZERO;
    return message;
  },
};

function createBasePrice(): Price {
  return { price: "" };
}

export const Price = {
  encode(message: Price, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.price !== "") {
      writer.uint32(10).string(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Price {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.price = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Price {
    return { price: isSet(object.price) ? globalThis.String(object.price) : "" };
  },

  toJSON(message: Price): unknown {
    const obj: any = {};
    if (message.price !== "") {
      obj.price = message.price;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Price>, I>>(base?: I): Price {
    return Price.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Price>, I>>(object: I): Price {
    const message = createBasePrice();
    message.price = object.price ?? "";
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
