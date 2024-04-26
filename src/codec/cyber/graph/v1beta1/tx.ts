/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Link } from "./types";

export const protobufPackage = "cyber.graph.v1beta1";

export interface MsgCyberlink {
  neuron: string;
  links: Link[];
}

export interface MsgCyberlinkResponse {
}

function createBaseMsgCyberlink(): MsgCyberlink {
  return { neuron: "", links: [] };
}

export const MsgCyberlink = {
  encode(message: MsgCyberlink, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.neuron !== "") {
      writer.uint32(10).string(message.neuron);
    }
    for (const v of message.links) {
      Link.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCyberlink {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCyberlink();
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
          if (tag !== 18) {
            break;
          }

          message.links.push(Link.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCyberlink {
    return {
      neuron: isSet(object.neuron) ? globalThis.String(object.neuron) : "",
      links: globalThis.Array.isArray(object?.links) ? object.links.map((e: any) => Link.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgCyberlink): unknown {
    const obj: any = {};
    if (message.neuron !== "") {
      obj.neuron = message.neuron;
    }
    if (message.links?.length) {
      obj.links = message.links.map((e) => Link.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCyberlink>, I>>(base?: I): MsgCyberlink {
    return MsgCyberlink.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCyberlink>, I>>(object: I): MsgCyberlink {
    const message = createBaseMsgCyberlink();
    message.neuron = object.neuron ?? "";
    message.links = object.links?.map((e) => Link.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgCyberlinkResponse(): MsgCyberlinkResponse {
  return {};
}

export const MsgCyberlinkResponse = {
  encode(_: MsgCyberlinkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCyberlinkResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCyberlinkResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgCyberlinkResponse {
    return {};
  },

  toJSON(_: MsgCyberlinkResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCyberlinkResponse>, I>>(base?: I): MsgCyberlinkResponse {
    return MsgCyberlinkResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCyberlinkResponse>, I>>(_: I): MsgCyberlinkResponse {
    const message = createBaseMsgCyberlinkResponse();
    return message;
  },
};

export interface Msg {
  Cyberlink(request: MsgCyberlink): Promise<MsgCyberlinkResponse>;
}

export const MsgServiceName = "cyber.graph.v1beta1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.Cyberlink = this.Cyberlink.bind(this);
  }
  Cyberlink(request: MsgCyberlink): Promise<MsgCyberlinkResponse> {
    const data = MsgCyberlink.encode(request).finish();
    const promise = this.rpc.request(this.service, "Cyberlink", data);
    return promise.then((data) => MsgCyberlinkResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
