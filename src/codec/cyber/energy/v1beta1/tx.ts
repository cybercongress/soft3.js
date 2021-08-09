/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos_proto/coin";

export const protobufPackage = "cyber.energy.v1beta1";

export interface MsgCreateRoute {
  source: string;
  destination: string;
  alias: string;
}

export interface MsgEditRoute {
  source: string;
  destination: string;
  value?: Coin;
}

export interface MsgDeleteRoute {
  source: string;
  destination: string;
}

export interface MsgEditRouteAlias {
  source: string;
  destination: string;
  alias: string;
}

export interface MsgCreateRouteResponse {}

export interface MsgEditRouteResponse {}

export interface MsgDeleteRouteResponse {}

export interface MsgEditRouteAliasResponse {}

const baseMsgCreateRoute: object = { source: "", destination: "", alias: "" };

export const MsgCreateRoute = {
  encode(message: MsgCreateRoute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.destination !== "") {
      writer.uint32(18).string(message.destination);
    }
    if (message.alias !== "") {
      writer.uint32(26).string(message.alias);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRoute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateRoute } as MsgCreateRoute;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.source = reader.string();
          break;
        case 2:
          message.destination = reader.string();
          break;
        case 3:
          message.alias = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRoute {
    const message = { ...baseMsgCreateRoute } as MsgCreateRoute;
    if (object.source !== undefined && object.source !== null) {
      message.source = String(object.source);
    } else {
      message.source = "";
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = String(object.destination);
    } else {
      message.destination = "";
    }
    if (object.alias !== undefined && object.alias !== null) {
      message.alias = String(object.alias);
    } else {
      message.alias = "";
    }
    return message;
  },

  toJSON(message: MsgCreateRoute): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined && (obj.destination = message.destination);
    message.alias !== undefined && (obj.alias = message.alias);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateRoute>): MsgCreateRoute {
    const message = { ...baseMsgCreateRoute } as MsgCreateRoute;
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    } else {
      message.source = "";
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = object.destination;
    } else {
      message.destination = "";
    }
    if (object.alias !== undefined && object.alias !== null) {
      message.alias = object.alias;
    } else {
      message.alias = "";
    }
    return message;
  },
};

const baseMsgEditRoute: object = { source: "", destination: "" };

export const MsgEditRoute = {
  encode(message: MsgEditRoute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.destination !== "") {
      writer.uint32(18).string(message.destination);
    }
    if (message.value !== undefined) {
      Coin.encode(message.value, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditRoute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEditRoute } as MsgEditRoute;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.source = reader.string();
          break;
        case 2:
          message.destination = reader.string();
          break;
        case 3:
          message.value = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEditRoute {
    const message = { ...baseMsgEditRoute } as MsgEditRoute;
    if (object.source !== undefined && object.source !== null) {
      message.source = String(object.source);
    } else {
      message.source = "";
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = String(object.destination);
    } else {
      message.destination = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Coin.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: MsgEditRoute): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined && (obj.destination = message.destination);
    message.value !== undefined && (obj.value = message.value ? Coin.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgEditRoute>): MsgEditRoute {
    const message = { ...baseMsgEditRoute } as MsgEditRoute;
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    } else {
      message.source = "";
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = object.destination;
    } else {
      message.destination = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Coin.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseMsgDeleteRoute: object = { source: "", destination: "" };

export const MsgDeleteRoute = {
  encode(message: MsgDeleteRoute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.destination !== "") {
      writer.uint32(18).string(message.destination);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteRoute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteRoute } as MsgDeleteRoute;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.source = reader.string();
          break;
        case 2:
          message.destination = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteRoute {
    const message = { ...baseMsgDeleteRoute } as MsgDeleteRoute;
    if (object.source !== undefined && object.source !== null) {
      message.source = String(object.source);
    } else {
      message.source = "";
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = String(object.destination);
    } else {
      message.destination = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteRoute): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined && (obj.destination = message.destination);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteRoute>): MsgDeleteRoute {
    const message = { ...baseMsgDeleteRoute } as MsgDeleteRoute;
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    } else {
      message.source = "";
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = object.destination;
    } else {
      message.destination = "";
    }
    return message;
  },
};

const baseMsgEditRouteAlias: object = {
  source: "",
  destination: "",
  alias: "",
};

export const MsgEditRouteAlias = {
  encode(message: MsgEditRouteAlias, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.destination !== "") {
      writer.uint32(18).string(message.destination);
    }
    if (message.alias !== "") {
      writer.uint32(26).string(message.alias);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditRouteAlias {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEditRouteAlias } as MsgEditRouteAlias;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.source = reader.string();
          break;
        case 2:
          message.destination = reader.string();
          break;
        case 3:
          message.alias = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEditRouteAlias {
    const message = { ...baseMsgEditRouteAlias } as MsgEditRouteAlias;
    if (object.source !== undefined && object.source !== null) {
      message.source = String(object.source);
    } else {
      message.source = "";
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = String(object.destination);
    } else {
      message.destination = "";
    }
    if (object.alias !== undefined && object.alias !== null) {
      message.alias = String(object.alias);
    } else {
      message.alias = "";
    }
    return message;
  },

  toJSON(message: MsgEditRouteAlias): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined && (obj.destination = message.destination);
    message.alias !== undefined && (obj.alias = message.alias);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgEditRouteAlias>): MsgEditRouteAlias {
    const message = { ...baseMsgEditRouteAlias } as MsgEditRouteAlias;
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    } else {
      message.source = "";
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = object.destination;
    } else {
      message.destination = "";
    }
    if (object.alias !== undefined && object.alias !== null) {
      message.alias = object.alias;
    } else {
      message.alias = "";
    }
    return message;
  },
};

const baseMsgCreateRouteResponse: object = {};

export const MsgCreateRouteResponse = {
  encode(_: MsgCreateRouteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRouteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateRouteResponse } as MsgCreateRouteResponse;
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

  fromJSON(_: any): MsgCreateRouteResponse {
    const message = { ...baseMsgCreateRouteResponse } as MsgCreateRouteResponse;
    return message;
  },

  toJSON(_: MsgCreateRouteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgCreateRouteResponse>): MsgCreateRouteResponse {
    const message = { ...baseMsgCreateRouteResponse } as MsgCreateRouteResponse;
    return message;
  },
};

const baseMsgEditRouteResponse: object = {};

export const MsgEditRouteResponse = {
  encode(_: MsgEditRouteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditRouteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEditRouteResponse } as MsgEditRouteResponse;
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

  fromJSON(_: any): MsgEditRouteResponse {
    const message = { ...baseMsgEditRouteResponse } as MsgEditRouteResponse;
    return message;
  },

  toJSON(_: MsgEditRouteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgEditRouteResponse>): MsgEditRouteResponse {
    const message = { ...baseMsgEditRouteResponse } as MsgEditRouteResponse;
    return message;
  },
};

const baseMsgDeleteRouteResponse: object = {};

export const MsgDeleteRouteResponse = {
  encode(_: MsgDeleteRouteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteRouteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteRouteResponse } as MsgDeleteRouteResponse;
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

  fromJSON(_: any): MsgDeleteRouteResponse {
    const message = { ...baseMsgDeleteRouteResponse } as MsgDeleteRouteResponse;
    return message;
  },

  toJSON(_: MsgDeleteRouteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteRouteResponse>): MsgDeleteRouteResponse {
    const message = { ...baseMsgDeleteRouteResponse } as MsgDeleteRouteResponse;
    return message;
  },
};

const baseMsgEditRouteAliasResponse: object = {};

export const MsgEditRouteAliasResponse = {
  encode(_: MsgEditRouteAliasResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditRouteAliasResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgEditRouteAliasResponse,
    } as MsgEditRouteAliasResponse;
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

  fromJSON(_: any): MsgEditRouteAliasResponse {
    const message = {
      ...baseMsgEditRouteAliasResponse,
    } as MsgEditRouteAliasResponse;
    return message;
  },

  toJSON(_: MsgEditRouteAliasResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgEditRouteAliasResponse>): MsgEditRouteAliasResponse {
    const message = {
      ...baseMsgEditRouteAliasResponse,
    } as MsgEditRouteAliasResponse;
    return message;
  },
};

export interface Msg {
  CreateRoute(request: MsgCreateRoute): Promise<MsgCreateRouteResponse>;
  EditRoute(request: MsgEditRoute): Promise<MsgEditRouteResponse>;
  DeleteRoute(request: MsgDeleteRoute): Promise<MsgDeleteRouteResponse>;
  EditRouteAlias(request: MsgEditRouteAlias): Promise<MsgEditRouteAliasResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateRoute = this.CreateRoute.bind(this);
    this.EditRoute = this.EditRoute.bind(this);
    this.DeleteRoute = this.DeleteRoute.bind(this);
    this.EditRouteAlias = this.EditRouteAlias.bind(this);
  }
  CreateRoute(request: MsgCreateRoute): Promise<MsgCreateRouteResponse> {
    const data = MsgCreateRoute.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Msg", "CreateRoute", data);
    return promise.then((data) => MsgCreateRouteResponse.decode(new _m0.Reader(data)));
  }

  EditRoute(request: MsgEditRoute): Promise<MsgEditRouteResponse> {
    const data = MsgEditRoute.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Msg", "EditRoute", data);
    return promise.then((data) => MsgEditRouteResponse.decode(new _m0.Reader(data)));
  }

  DeleteRoute(request: MsgDeleteRoute): Promise<MsgDeleteRouteResponse> {
    const data = MsgDeleteRoute.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Msg", "DeleteRoute", data);
    return promise.then((data) => MsgDeleteRouteResponse.decode(new _m0.Reader(data)));
  }

  EditRouteAlias(request: MsgEditRouteAlias): Promise<MsgEditRouteAliasResponse> {
    const data = MsgEditRouteAlias.encode(request).finish();
    const promise = this.rpc.request("cyber.energy.v1beta1.Msg", "EditRouteAlias", data);
    return promise.then((data) => MsgEditRouteAliasResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
