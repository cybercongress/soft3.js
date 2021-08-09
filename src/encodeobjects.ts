import { EncodeObject } from "@cosmjs/proto-signing";

import { MsgBeginRedelegate } from "@cosmjs/stargate/build/codec/cosmos/staking/v1beta1/tx";
import {
  MsgCreateRoute,
  MsgDeleteRoute,
  MsgEditRoute,
  MsgEditRouteAlias,
} from "./codec/cyber/energy/v1beta1/tx";
import { MsgCyberlink } from "./codec/cyber/graph/v1beta1/tx";
import { MsgInvestmint } from "./codec/cyber/resources/v1beta1/tx";

export interface MsgBeginRedelegateEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate";
  readonly value: Partial<MsgBeginRedelegate>;
}

export function isMsgBeginRedelegateEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgBeginRedelegateEncodeObject {
  return (
    (encodeObject as MsgBeginRedelegateEncodeObject).typeUrl === "/cosmos.staking.v1beta1.MsgBeginRedelegate"
  );
}

export interface MsgCreateRouteEncodeObject extends EncodeObject {
  readonly typeUrl: "/cyber.energy.v1beta1.MsgCreateRoute";
  readonly value: Partial<MsgCreateRoute>;
}

export function isMsgCreateRouteEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgCreateRouteEncodeObject {
  return (encodeObject as MsgCreateRouteEncodeObject).typeUrl === "/cyber.energy.v1beta1.MsgCreateRoute";
}

export interface MsgDeleteRouteEncodeObject extends EncodeObject {
  readonly typeUrl: "/cyber.energy.v1beta1.MsgDeleteRoute";
  readonly value: Partial<MsgDeleteRoute>;
}

export function isMsgDeleteRouteEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgDeleteRouteEncodeObject {
  return (encodeObject as MsgDeleteRouteEncodeObject).typeUrl === "/cyber.energy.v1beta1.MsgDeleteRoute";
}

export interface MsgEditRouteEncodeObject extends EncodeObject {
  readonly typeUrl: "/cyber.energy.v1beta1.MsgEditRoute";
  readonly value: Partial<MsgEditRoute>;
}

export function isMsgEditRouteEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgEditRouteEncodeObject {
  return (encodeObject as MsgEditRouteEncodeObject).typeUrl === "/cyber.energy.v1beta1.MsgEditRoute";
}

export interface MsgEditRouteAliasEncodeObject extends EncodeObject {
  readonly typeUrl: "/cyber.energy.v1beta1.MsgEditRouteAlias";
  readonly value: Partial<MsgEditRouteAlias>;
}

export function isMsgEditRouteAliasEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgEditRouteAliasEncodeObject {
  return (
    (encodeObject as MsgEditRouteAliasEncodeObject).typeUrl === "/cyber.energy.v1beta1.MsgEditRouteAlias"
  );
}

export interface MsgCyberlinkEncodeObject extends EncodeObject {
  readonly typeUrl: "/cyber.graph.v1beta1.MsgCyberlink";
  readonly value: Partial<MsgCyberlink>;
}

export function isMsgCyberlinkEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgCyberlinkEncodeObject {
  return (encodeObject as MsgCyberlinkEncodeObject).typeUrl === "/cyber.graph.v1beta1.MsgCyberlink";
}

export interface MsgInvestmintEncodeObject extends EncodeObject {
  readonly typeUrl: "/cyber.resources.v1beta1.MsgInvestmint";
  readonly value: Partial<MsgInvestmint>;
}

export function isMsgInvestmintEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgInvestmintEncodeObject {
  return (encodeObject as MsgInvestmintEncodeObject).typeUrl === "/cyber.resources.v1beta1.MsgInvestmint";
}
