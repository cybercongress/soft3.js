/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cyber.graph.v1beta1";

export interface MsgCyberlink {
  address: string;
  links: Link[];
}

export interface MsgCyberlinkResponse {}

export interface Link {
  from: string;
  to: string;
}

export interface CompactLink {
  from: Long;
  to: Long;
  account: Long;
}

const baseMsgCyberlink: object = { address: "" };

export const MsgCyberlink = {
  encode(
    message: MsgCyberlink,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.links) {
      Link.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCyberlink {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCyberlink } as MsgCyberlink;
    message.links = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.links.push(Link.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCyberlink {
    const message = { ...baseMsgCyberlink } as MsgCyberlink;
    message.links = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.links !== undefined && object.links !== null) {
      for (const e of object.links) {
        message.links.push(Link.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgCyberlink): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.links) {
      obj.links = message.links.map((e) => (e ? Link.toJSON(e) : undefined));
    } else {
      obj.links = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCyberlink>): MsgCyberlink {
    const message = { ...baseMsgCyberlink } as MsgCyberlink;
    message.links = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.links !== undefined && object.links !== null) {
      for (const e of object.links) {
        message.links.push(Link.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgCyberlinkResponse: object = {};

export const MsgCyberlinkResponse = {
  encode(
    _: MsgCyberlinkResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCyberlinkResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCyberlinkResponse } as MsgCyberlinkResponse;
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

  fromJSON(_: any): MsgCyberlinkResponse {
    const message = { ...baseMsgCyberlinkResponse } as MsgCyberlinkResponse;
    return message;
  },

  toJSON(_: MsgCyberlinkResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgCyberlinkResponse>): MsgCyberlinkResponse {
    const message = { ...baseMsgCyberlinkResponse } as MsgCyberlinkResponse;
    return message;
  },
};

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
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
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

const baseCompactLink: object = {
  from: Long.UZERO,
  to: Long.UZERO,
  account: Long.UZERO,
};

export const CompactLink = {
  encode(
    message: CompactLink,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
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
    message.from !== undefined &&
      (obj.from = (message.from || Long.UZERO).toString());
    message.to !== undefined &&
      (obj.to = (message.to || Long.UZERO).toString());
    message.account !== undefined &&
      (obj.account = (message.account || Long.UZERO).toString());
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

export interface Msg {
  Cyberlink(request: MsgCyberlink): Promise<MsgCyberlinkResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Cyberlink(request: MsgCyberlink): Promise<MsgCyberlinkResponse> {
    const data = MsgCyberlink.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.graph.v1beta1.Msg",
      "Cyberlink",
      data
    );
    return promise.then((data) =>
      MsgCyberlinkResponse.decode(new _m0.Reader(data))
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
