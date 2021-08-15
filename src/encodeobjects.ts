import { EncodeObject } from "@cosmjs/proto-signing";
import { MsgBeginRedelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";

import {
  MsgCreateRoute,
  MsgDeleteRoute,
  MsgEditRoute,
  MsgEditRouteAlias,
} from "./codec/cyber/energy/v1beta1/tx";
import { MsgCyberlink } from "./codec/cyber/graph/v1beta1/tx";
import { MsgInvestmint } from "./codec/cyber/resources/v1beta1/tx";
import {
  MsgCreatePool,
  MsgDepositWithinBatch,
  MsgSwapWithinBatch,
  MsgWithdrawWithinBatch,
} from "./codec/tendermint/liquidity/v1beta1/tx";

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

export interface MsgSwapWithinBatchEncodeObject extends EncodeObject {
  readonly typeUrl: "/tendermint.liquidity.v1beta1.MsgSwapWithinBatch";
  readonly value: Partial<MsgSwapWithinBatch>;
}

export function isMsgSwapWithinBatchEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgSwapWithinBatchEncodeObject {
  return (
    (encodeObject as MsgSwapWithinBatchEncodeObject).typeUrl ===
    "/tendermint.liquidity.v1beta1.MsgSwapWithinBatch"
  );
}

export interface MsgDepositWithinBatchEncodeObject extends EncodeObject {
  readonly typeUrl: "/tendermint.liquidity.v1beta1.MsgDepositWithinBatch";
  readonly value: Partial<MsgDepositWithinBatch>;
}

export function isMsgDepositWithinBatchEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgDepositWithinBatchEncodeObject {
  return (
    (encodeObject as MsgDepositWithinBatchEncodeObject).typeUrl ===
    "/tendermint.liquidity.v1beta1.MsgDepositWithinBatch"
  );
}

export interface MsgWithdrawWithinBatchEncodeObject extends EncodeObject {
  readonly typeUrl: "/tendermint.liquidity.v1beta1.MsgWithdrawWithinBatch";
  readonly value: Partial<MsgWithdrawWithinBatch>;
}

export function isMsgWithdrawWithinBatchEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgWithdrawWithinBatchEncodeObject {
  return (
    (encodeObject as MsgWithdrawWithinBatchEncodeObject).typeUrl ===
    "/tendermint.liquidity.v1beta1.MsgWithdrawWithinBatch"
  );
}

export interface MsgCreatePoolEncodeObject extends EncodeObject {
  readonly typeUrl: "/tendermint.liquidity.v1beta1.MsgCreatePool";
  readonly value: Partial<MsgCreatePool>;
}

export function isMsgCreatePoolEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgCreatePoolEncodeObject {
  return (
    (encodeObject as MsgCreatePoolEncodeObject).typeUrl === "/tendermint.liquidity.v1beta1.MsgCreatePool"
  );
}
