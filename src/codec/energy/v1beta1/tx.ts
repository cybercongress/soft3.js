/* eslint-disable */
import { Coin } from "../../cosmos_proto/coin";
import _m0 from "protobufjs/minimal";
import Long from "long";

export const protobufPackage = "cyber.energy.v1beta1";

export interface MsgCreateEnergyRoute {
  source: string;
  destination: string;
  alias: string;
}

export interface MsgEditEnergyRoute {
  source: string;
  destination: string;
  value?: Coin;
}

export interface MsgDeleteEnergyRoute {
  source: string;
  destination: string;
}

export interface MsgEditEnergyRouteAlias {
  source: string;
  destination: string;
  alias: string;
}

export interface MsgCreateEnergyRouteResponse {}

export interface MsgEditEnergyRouteResponse {}

export interface MsgDeleteEnergyRouteResponse {}

export interface MsgEditEnergyRouteAliasResponse {}

const baseMsgCreateEnergyRoute: object = {
  source: "",
  destination: "",
  alias: "",
};

export const MsgCreateEnergyRoute = {
  encode(
    message: MsgCreateEnergyRoute,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateEnergyRoute {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateEnergyRoute } as MsgCreateEnergyRoute;
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

  fromJSON(object: any): MsgCreateEnergyRoute {
    const message = { ...baseMsgCreateEnergyRoute } as MsgCreateEnergyRoute;
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

  toJSON(message: MsgCreateEnergyRoute): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined &&
      (obj.destination = message.destination);
    message.alias !== undefined && (obj.alias = message.alias);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateEnergyRoute>): MsgCreateEnergyRoute {
    const message = { ...baseMsgCreateEnergyRoute } as MsgCreateEnergyRoute;
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

const baseMsgEditEnergyRoute: object = { source: "", destination: "" };

export const MsgEditEnergyRoute = {
  encode(
    message: MsgEditEnergyRoute,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditEnergyRoute {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEditEnergyRoute } as MsgEditEnergyRoute;
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

  fromJSON(object: any): MsgEditEnergyRoute {
    const message = { ...baseMsgEditEnergyRoute } as MsgEditEnergyRoute;
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

  toJSON(message: MsgEditEnergyRoute): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined &&
      (obj.destination = message.destination);
    message.value !== undefined &&
      (obj.value = message.value ? Coin.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgEditEnergyRoute>): MsgEditEnergyRoute {
    const message = { ...baseMsgEditEnergyRoute } as MsgEditEnergyRoute;
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

const baseMsgDeleteEnergyRoute: object = { source: "", destination: "" };

export const MsgDeleteEnergyRoute = {
  encode(
    message: MsgDeleteEnergyRoute,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.destination !== "") {
      writer.uint32(18).string(message.destination);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeleteEnergyRoute {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteEnergyRoute } as MsgDeleteEnergyRoute;
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

  fromJSON(object: any): MsgDeleteEnergyRoute {
    const message = { ...baseMsgDeleteEnergyRoute } as MsgDeleteEnergyRoute;
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

  toJSON(message: MsgDeleteEnergyRoute): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined &&
      (obj.destination = message.destination);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteEnergyRoute>): MsgDeleteEnergyRoute {
    const message = { ...baseMsgDeleteEnergyRoute } as MsgDeleteEnergyRoute;
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

const baseMsgEditEnergyRouteAlias: object = {
  source: "",
  destination: "",
  alias: "",
};

export const MsgEditEnergyRouteAlias = {
  encode(
    message: MsgEditEnergyRouteAlias,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgEditEnergyRouteAlias {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgEditEnergyRouteAlias,
    } as MsgEditEnergyRouteAlias;
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

  fromJSON(object: any): MsgEditEnergyRouteAlias {
    const message = {
      ...baseMsgEditEnergyRouteAlias,
    } as MsgEditEnergyRouteAlias;
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

  toJSON(message: MsgEditEnergyRouteAlias): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.destination !== undefined &&
      (obj.destination = message.destination);
    message.alias !== undefined && (obj.alias = message.alias);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgEditEnergyRouteAlias>
  ): MsgEditEnergyRouteAlias {
    const message = {
      ...baseMsgEditEnergyRouteAlias,
    } as MsgEditEnergyRouteAlias;
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

const baseMsgCreateEnergyRouteResponse: object = {};

export const MsgCreateEnergyRouteResponse = {
  encode(
    _: MsgCreateEnergyRouteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateEnergyRouteResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateEnergyRouteResponse,
    } as MsgCreateEnergyRouteResponse;
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

  fromJSON(_: any): MsgCreateEnergyRouteResponse {
    const message = {
      ...baseMsgCreateEnergyRouteResponse,
    } as MsgCreateEnergyRouteResponse;
    return message;
  },

  toJSON(_: MsgCreateEnergyRouteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCreateEnergyRouteResponse>
  ): MsgCreateEnergyRouteResponse {
    const message = {
      ...baseMsgCreateEnergyRouteResponse,
    } as MsgCreateEnergyRouteResponse;
    return message;
  },
};

const baseMsgEditEnergyRouteResponse: object = {};

export const MsgEditEnergyRouteResponse = {
  encode(
    _: MsgEditEnergyRouteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgEditEnergyRouteResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgEditEnergyRouteResponse,
    } as MsgEditEnergyRouteResponse;
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

  fromJSON(_: any): MsgEditEnergyRouteResponse {
    const message = {
      ...baseMsgEditEnergyRouteResponse,
    } as MsgEditEnergyRouteResponse;
    return message;
  },

  toJSON(_: MsgEditEnergyRouteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgEditEnergyRouteResponse>
  ): MsgEditEnergyRouteResponse {
    const message = {
      ...baseMsgEditEnergyRouteResponse,
    } as MsgEditEnergyRouteResponse;
    return message;
  },
};

const baseMsgDeleteEnergyRouteResponse: object = {};

export const MsgDeleteEnergyRouteResponse = {
  encode(
    _: MsgDeleteEnergyRouteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeleteEnergyRouteResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteEnergyRouteResponse,
    } as MsgDeleteEnergyRouteResponse;
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

  fromJSON(_: any): MsgDeleteEnergyRouteResponse {
    const message = {
      ...baseMsgDeleteEnergyRouteResponse,
    } as MsgDeleteEnergyRouteResponse;
    return message;
  },

  toJSON(_: MsgDeleteEnergyRouteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteEnergyRouteResponse>
  ): MsgDeleteEnergyRouteResponse {
    const message = {
      ...baseMsgDeleteEnergyRouteResponse,
    } as MsgDeleteEnergyRouteResponse;
    return message;
  },
};

const baseMsgEditEnergyRouteAliasResponse: object = {};

export const MsgEditEnergyRouteAliasResponse = {
  encode(
    _: MsgEditEnergyRouteAliasResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgEditEnergyRouteAliasResponse {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgEditEnergyRouteAliasResponse,
    } as MsgEditEnergyRouteAliasResponse;
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

  fromJSON(_: any): MsgEditEnergyRouteAliasResponse {
    const message = {
      ...baseMsgEditEnergyRouteAliasResponse,
    } as MsgEditEnergyRouteAliasResponse;
    return message;
  },

  toJSON(_: MsgEditEnergyRouteAliasResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgEditEnergyRouteAliasResponse>
  ): MsgEditEnergyRouteAliasResponse {
    const message = {
      ...baseMsgEditEnergyRouteAliasResponse,
    } as MsgEditEnergyRouteAliasResponse;
    return message;
  },
};

export interface Msg {
  CreateEnergyRoute(
    request: MsgCreateEnergyRoute
  ): Promise<MsgCreateEnergyRouteResponse>;
  EditEnergyRoute(
    request: MsgEditEnergyRoute
  ): Promise<MsgEditEnergyRouteResponse>;
  DeleteEnergyRoute(
    request: MsgDeleteEnergyRoute
  ): Promise<MsgDeleteEnergyRouteResponse>;
  EditEnergyRouteAlias(
    request: MsgEditEnergyRouteAlias
  ): Promise<MsgEditEnergyRouteAliasResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreateEnergyRoute(
    request: MsgCreateEnergyRoute
  ): Promise<MsgCreateEnergyRouteResponse> {
    const data = MsgCreateEnergyRoute.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.energy.v1beta1.Msg",
      "CreateEnergyRoute",
      data
    );
    return promise.then((data) =>
      MsgCreateEnergyRouteResponse.decode(new _m0.Reader(data))
    );
  }

  EditEnergyRoute(
    request: MsgEditEnergyRoute
  ): Promise<MsgEditEnergyRouteResponse> {
    const data = MsgEditEnergyRoute.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.energy.v1beta1.Msg",
      "EditEnergyRoute",
      data
    );
    return promise.then((data) =>
      MsgEditEnergyRouteResponse.decode(new _m0.Reader(data))
    );
  }

  DeleteEnergyRoute(
    request: MsgDeleteEnergyRoute
  ): Promise<MsgDeleteEnergyRouteResponse> {
    const data = MsgDeleteEnergyRoute.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.energy.v1beta1.Msg",
      "DeleteEnergyRoute",
      data
    );
    return promise.then((data) =>
      MsgDeleteEnergyRouteResponse.decode(new _m0.Reader(data))
    );
  }

  EditEnergyRouteAlias(
    request: MsgEditEnergyRouteAlias
  ): Promise<MsgEditEnergyRouteAliasResponse> {
    const data = MsgEditEnergyRouteAlias.encode(request).finish();
    const promise = this.rpc.request(
      "cyber.energy.v1beta1.Msg",
      "EditEnergyRouteAlias",
      data
    );
    return promise.then((data) =>
      MsgEditEnergyRouteAliasResponse.decode(new _m0.Reader(data))
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
