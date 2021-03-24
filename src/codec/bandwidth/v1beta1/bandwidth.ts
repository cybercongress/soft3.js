/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.bandwidth.v1beta1";

export interface AccountBandwidth {
  address: string;
  remainedValue: Long;
  lastUpdatedBlock: Long;
  maxValue: Long;
}

export interface Price {
  price: string;
}

const baseAccountBandwidth: object = {
  address: "",
  remainedValue: Long.UZERO,
  lastUpdatedBlock: Long.UZERO,
  maxValue: Long.UZERO,
};

export const AccountBandwidth = {
  encode(
    message: AccountBandwidth,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
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

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountBandwidth {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountBandwidth } as AccountBandwidth;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
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

  fromJSON(object: any): AccountBandwidth {
    const message = { ...baseAccountBandwidth } as AccountBandwidth;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.remainedValue !== undefined && object.remainedValue !== null) {
      message.remainedValue = Long.fromString(object.remainedValue);
    } else {
      message.remainedValue = Long.UZERO;
    }
    if (
      object.lastUpdatedBlock !== undefined &&
      object.lastUpdatedBlock !== null
    ) {
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

  toJSON(message: AccountBandwidth): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.remainedValue !== undefined &&
      (obj.remainedValue = (message.remainedValue || Long.UZERO).toString());
    message.lastUpdatedBlock !== undefined &&
      (obj.lastUpdatedBlock = (
        message.lastUpdatedBlock || Long.UZERO
      ).toString());
    message.maxValue !== undefined &&
      (obj.maxValue = (message.maxValue || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<AccountBandwidth>): AccountBandwidth {
    const message = { ...baseAccountBandwidth } as AccountBandwidth;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.remainedValue !== undefined && object.remainedValue !== null) {
      message.remainedValue = object.remainedValue as Long;
    } else {
      message.remainedValue = Long.UZERO;
    }
    if (
      object.lastUpdatedBlock !== undefined &&
      object.lastUpdatedBlock !== null
    ) {
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
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
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
