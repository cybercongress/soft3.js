/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "cyber.grid.v1beta1";

export interface MsgCreateRoute {
  source: string;
  destination: string;
  name: string;
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

export interface MsgEditRouteName {
  source: string;
  destination: string;
  name: string;
}

export interface MsgCreateRouteResponse {}

export interface MsgEditRouteResponse {}

export interface MsgDeleteRouteResponse {}

export interface MsgEditRouteNameResponse {}

const baseMsgCreateRoute: object = { source: "", destination: "", name: "" };

export const MsgCreateRoute = {
  encode(message: MsgCreateRoute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.destination !== "") {
      writer.uint32(18).string(message.destination);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
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
          message.name = reader.string();
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
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgCreateRoute): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined && (obj.destination = message.destination);
    message.name !== undefined && (obj.name = message.name);
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
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
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

const baseMsgEditRouteName: object = { source: "", destination: "", name: "" };

export const MsgEditRouteName = {
  encode(message: MsgEditRouteName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.destination !== "") {
      writer.uint32(18).string(message.destination);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditRouteName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEditRouteName } as MsgEditRouteName;
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
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEditRouteName {
    const message = { ...baseMsgEditRouteName } as MsgEditRouteName;
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
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgEditRouteName): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined && (obj.destination = message.destination);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgEditRouteName>): MsgEditRouteName {
    const message = { ...baseMsgEditRouteName } as MsgEditRouteName;
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
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
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

const baseMsgEditRouteNameResponse: object = {};

export const MsgEditRouteNameResponse = {
  encode(_: MsgEditRouteNameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditRouteNameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEditRouteNameResponse } as MsgEditRouteNameResponse;
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

  fromJSON(_: any): MsgEditRouteNameResponse {
    const message = { ...baseMsgEditRouteNameResponse } as MsgEditRouteNameResponse;
    return message;
  },

  toJSON(_: MsgEditRouteNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgEditRouteNameResponse>): MsgEditRouteNameResponse {
    const message = { ...baseMsgEditRouteNameResponse } as MsgEditRouteNameResponse;
    return message;
  },
};

export interface Msg {
  CreateRoute(request: MsgCreateRoute): Promise<MsgCreateRouteResponse>;
  EditRoute(request: MsgEditRoute): Promise<MsgEditRouteResponse>;
  DeleteRoute(request: MsgDeleteRoute): Promise<MsgDeleteRouteResponse>;
  EditRouteName(request: MsgEditRouteName): Promise<MsgEditRouteNameResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateRoute = this.CreateRoute.bind(this);
    this.EditRoute = this.EditRoute.bind(this);
    this.DeleteRoute = this.DeleteRoute.bind(this);
    this.EditRouteName = this.EditRouteName.bind(this);
  }
  CreateRoute(request: MsgCreateRoute): Promise<MsgCreateRouteResponse> {
    const data = MsgCreateRoute.encode(request).finish();
    const promise = this.rpc.request("cyber.grid.v1beta1.Msg", "CreateRoute", data);
    return promise.then((data) => MsgCreateRouteResponse.decode(new _m0.Reader(data)));
  }

  EditRoute(request: MsgEditRoute): Promise<MsgEditRouteResponse> {
    const data = MsgEditRoute.encode(request).finish();
    const promise = this.rpc.request("cyber.grid.v1beta1.Msg", "EditRoute", data);
    return promise.then((data) => MsgEditRouteResponse.decode(new _m0.Reader(data)));
  }

  DeleteRoute(request: MsgDeleteRoute): Promise<MsgDeleteRouteResponse> {
    const data = MsgDeleteRoute.encode(request).finish();
    const promise = this.rpc.request("cyber.grid.v1beta1.Msg", "DeleteRoute", data);
    return promise.then((data) => MsgDeleteRouteResponse.decode(new _m0.Reader(data)));
  }

  EditRouteName(request: MsgEditRouteName): Promise<MsgEditRouteNameResponse> {
    const data = MsgEditRouteName.encode(request).finish();
    const promise = this.rpc.request("cyber.grid.v1beta1.Msg", "EditRouteName", data);
    return promise.then((data) => MsgEditRouteNameResponse.decode(new _m0.Reader(data)));
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
