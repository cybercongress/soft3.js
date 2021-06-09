/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Link } from "../../../cyber/graph/v1beta1/types";

export const protobufPackage = "cyber.graph.v1beta1";

export interface MsgCyberlink {
  address: string;
  links: Link[];
}

export interface MsgCyberlinkResponse {}

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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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

export interface Msg {
  Cyberlink(request: MsgCyberlink): Promise<MsgCyberlinkResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Cyberlink = this.Cyberlink.bind(this);
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
