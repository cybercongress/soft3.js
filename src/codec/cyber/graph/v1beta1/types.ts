/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.graph.v1beta1";

export interface Link {
  from: string;
  to: string;
}

export interface CompactLink {
  from: Long;
  to: Long;
  account: Long;
}

const baseLink: object = { from: "", to: "" };

export const Link = {
  encode(message: Link, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.to !== "") {
      writer.uint32(18).string(message.to);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Link {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLink } as Link;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.to = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Link {
    const message = { ...baseLink } as Link;
    if (object.from !== undefined && object.from !== null) {
      message.from = String(object.from);
    } else {
      message.from = "";
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = String(object.to);
    } else {
      message.to = "";
    }
    return message;
  },

  toJSON(message: Link): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.to !== undefined && (obj.to = message.to);
    return obj;
  },

  fromPartial(object: DeepPartial<Link>): Link {
    const message = { ...baseLink } as Link;
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    } else {
      message.from = "";
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = object.to;
    } else {
      message.to = "";
    }
    return message;
  },
};

const baseCompactLink: object = { from: Long.UZERO, to: Long.UZERO, account: Long.UZERO };

export const CompactLink = {
  encode(message: CompactLink, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.from.isZero()) {
      writer.uint32(8).uint64(message.from);
    }
    if (!message.to.isZero()) {
      writer.uint32(16).uint64(message.to);
    }
    if (!message.account.isZero()) {
      writer.uint32(24).uint64(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompactLink {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCompactLink } as CompactLink;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.uint64() as Long;
          break;
        case 2:
          message.to = reader.uint64() as Long;
          break;
        case 3:
          message.account = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CompactLink {
    const message = { ...baseCompactLink } as CompactLink;
    if (object.from !== undefined && object.from !== null) {
      message.from = Long.fromString(object.from);
    } else {
      message.from = Long.UZERO;
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = Long.fromString(object.to);
    } else {
      message.to = Long.UZERO;
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = Long.fromString(object.account);
    } else {
      message.account = Long.UZERO;
    }
    return message;
  },

  toJSON(message: CompactLink): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = (message.from || Long.UZERO).toString());
    message.to !== undefined && (obj.to = (message.to || Long.UZERO).toString());
    message.account !== undefined && (obj.account = (message.account || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<CompactLink>): CompactLink {
    const message = { ...baseCompactLink } as CompactLink;
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from as Long;
    } else {
      message.from = Long.UZERO;
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = object.to as Long;
    } else {
      message.to = Long.UZERO;
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account as Long;
    } else {
      message.account = Long.UZERO;
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
