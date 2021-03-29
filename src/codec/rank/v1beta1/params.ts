/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.rank.v1beta1";

export interface Params {
  calculationPeriod: Long;
  dampingFactor: string;
  tolerance: string;
}

const baseParams: object = {
  calculationPeriod: Long.ZERO,
  dampingFactor: "",
  tolerance: "",
};

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.calculationPeriod.isZero()) {
      writer.uint32(8).int64(message.calculationPeriod);
    }
    if (message.dampingFactor !== "") {
      writer.uint32(18).string(message.dampingFactor);
    }
    if (message.tolerance !== "") {
      writer.uint32(26).string(message.tolerance);
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
          message.calculationPeriod = reader.int64() as Long;
          break;
        case 2:
          message.dampingFactor = reader.string();
          break;
        case 3:
          message.tolerance = reader.string();
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
    if (
      object.calculationPeriod !== undefined &&
      object.calculationPeriod !== null
    ) {
      message.calculationPeriod = Long.fromString(object.calculationPeriod);
    } else {
      message.calculationPeriod = Long.ZERO;
    }
    if (object.dampingFactor !== undefined && object.dampingFactor !== null) {
      message.dampingFactor = String(object.dampingFactor);
    } else {
      message.dampingFactor = "";
    }
    if (object.tolerance !== undefined && object.tolerance !== null) {
      message.tolerance = String(object.tolerance);
    } else {
      message.tolerance = "";
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.calculationPeriod !== undefined &&
      (obj.calculationPeriod = (
        message.calculationPeriod || Long.ZERO
      ).toString());
    message.dampingFactor !== undefined &&
      (obj.dampingFactor = message.dampingFactor);
    message.tolerance !== undefined && (obj.tolerance = message.tolerance);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (
      object.calculationPeriod !== undefined &&
      object.calculationPeriod !== null
    ) {
      message.calculationPeriod = object.calculationPeriod as Long;
    } else {
      message.calculationPeriod = Long.ZERO;
    }
    if (object.dampingFactor !== undefined && object.dampingFactor !== null) {
      message.dampingFactor = object.dampingFactor;
    } else {
      message.dampingFactor = "";
    }
    if (object.tolerance !== undefined && object.tolerance !== null) {
      message.tolerance = object.tolerance;
    } else {
      message.tolerance = "";
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
