import { AminoMsg, Coin } from "@cosmjs/amino";
import { AminoConverters } from "@cosmjs/stargate";
import { assertDefinedAndNotNull, isNonNullObject } from "@cosmjs/utils";
import Long from "long";

import { MsgCyberlink } from "./codec/cyber/graph/v1beta1/tx";
// import { Link } from "./codec/cyber/graph/v1beta1/types";
import {
  MsgCreateRoute,
  MsgDeleteRoute,
  MsgEditRoute,
  MsgEditRouteName,
} from "./codec/cyber/grid/v1beta1/tx";
import { MsgInvestmint } from "./codec/cyber/resources/v1beta1/tx";
import {
  MsgDepositWithinBatch,
  MsgSwapWithinBatch,
  MsgWithdrawWithinBatch,
} from "./codec/tendermint/liquidity/v1beta1/tx";
import { Link } from "./signingcyberclient";

// Graph module

export interface AminoMsgCyberlink extends AminoMsg {
  readonly type: "cyber/MsgCyberlink";
  readonly value: {
    readonly neuron: string;
    readonly links: readonly Link[];
  };
}

export function isAminoMsgCyberlink(msg: AminoMsg): msg is AminoMsgCyberlink {
  return msg.type === "cyber/MsgCyberlink";
}

// Resources module

export interface AminoMsgInvestmint extends AminoMsg {
  readonly type: "cyber/MsgInvestmint";
  readonly value: {
    readonly neuron: string;
    readonly amount: Coin;
    readonly resource: string;
    readonly length: string;
  };
}

export function isAminoMsgInvestmint(msg: AminoMsg): msg is AminoMsgInvestmint {
  return msg.type === "cyber/MsgInvestmint";
}

// Grid module

export interface AminoMsgCreateRoute extends AminoMsg {
  readonly type: "cyber/MsgCreateRoute";
  readonly value: {
    readonly source: string;
    readonly destination: string;
    readonly name: string;
  };
}

export function isAminoMsgCreateRoute(msg: AminoMsg): msg is AminoMsgCreateRoute {
  return msg.type === "cyber/MsgCreateRoute";
}

export interface AminoMsgEditRoute extends AminoMsg {
  readonly type: "cyber/MsgEditRoute";
  readonly value: {
    readonly source: string;
    readonly destination: string;
    readonly value: Coin;
  };
}

export function isAminoMsgEditRoute(msg: AminoMsg): msg is AminoMsgEditRoute {
  return msg.type === "cyber/MsgEditRoute";
}

export interface AminoMsgDeleteRoute extends AminoMsg {
  readonly type: "cyber/MsgDeleteRoute";
  readonly value: {
    readonly source: string;
    readonly destination: string;
  };
}

export function isAminoMsgDeleteRoute(msg: AminoMsg): msg is AminoMsgDeleteRoute {
  return msg.type === "cyber/MsgDeleteRoute";
}

export interface AminoMsgEditRouteName extends AminoMsg {
  readonly type: "cyber/MsgEditRouteName";
  readonly value: {
    readonly source: string;
    readonly destination: string;
    readonly name: string;
  };
}

export function isAminoMsgEditRouteName(msg: AminoMsg): msg is AminoMsgEditRouteName {
  return msg.type === "cyber/MsgEditRouteName";
}

// Liquidity module

export interface AminoMsgSwapWithinBatch extends AminoMsg {
  readonly type: "liquidity/MsgSwapWithinBatch";
  readonly value: {
    readonly swap_requester_address: string;
    readonly pool_id: string;
    readonly swap_type_id: number;
    readonly offer_coin: Coin;
    readonly demand_coin_denom: string;
    readonly offer_coin_fee: Coin;
    readonly order_price: string;
  };
}

export function isAminoMsgSwapWithinBatch(msg: AminoMsg): msg is AminoMsgSwapWithinBatch {
  return msg.type === "liquidity/MsgSwapWithinBatch";
}

export interface AminoMsgDepositWithinBatch extends AminoMsg {
  readonly type: "liquidity/MsgDepositWithinBatch";
  readonly value: {
    readonly depositor_address: string;
    readonly pool_id: string;
    readonly deposit_coins: Coin[];
  };
}

export function isAminoMsgDepositWithinBatch(msg: AminoMsg): msg is AminoMsgDepositWithinBatch {
  return msg.type === "liquidity/MsgDepositWithinBatch";
}

export interface AminoMsgWithdrawWithinBatch extends AminoMsg {
  readonly type: "liquidity/MsgWithdrawWithinBatch";
  readonly value: {
    readonly withdrawer_address: string;
    readonly pool_id: string;
    readonly pool_coin: Coin;
  };
}

export function isAminoMsgWithdrawWithinBatch(msg: AminoMsg): msg is AminoMsgWithdrawWithinBatch {
  return msg.type === "liquidity/MsgWithdrawWithinBatch";
}

export interface MsgSignData extends AminoMsg {
  readonly type: "sign/MsgSignData";
  readonly value: {
    /** Bech32 account address */
    signer: string;
    /** Base64 encoded data */
    data: string;
  };
}

export function isMsgSignData(msg: AminoMsg): msg is MsgSignData {
  const castedMsg = msg as MsgSignData;
  if (castedMsg.type !== "sign/MsgSignData") return false;
  if (!isNonNullObject(castedMsg.value)) return false;
  if (typeof castedMsg.value.signer !== "string") return false;
  if (typeof castedMsg.value.data !== "string") return false;
  return true;
}

export function createCyberAminoConverters(): AminoConverters {
  return {
    "/cyber.graph.v1beta1.MsgCyberlink": {
      aminoType: "cyber/MsgCyberlink",
      toAmino: ({ neuron, links }: MsgCyberlink): AminoMsgCyberlink["value"] => {
        return {
          neuron: neuron,
          links: [...links],
        };
      },
      fromAmino: ({ neuron, links }: AminoMsgCyberlink["value"]): MsgCyberlink => {
        return {
          neuron: neuron,
          links: [...links],
        };
      },
    },
    "/cyber.resources.v1beta1.MsgInvestmint": {
      aminoType: "cyber/MsgInvestmint",
      toAmino: ({ neuron, amount, resource, length }: MsgInvestmint): AminoMsgInvestmint["value"] => {
        assertDefinedAndNotNull(amount, "missing amount");
        return {
          neuron: neuron,
          amount: amount,
          resource: resource,
          length: length.toString(),
        };
      },
      fromAmino: ({ neuron, amount, resource, length }: AminoMsgInvestmint["value"]): MsgInvestmint => ({
        neuron: neuron,
        amount: amount,
        resource: resource,
        length: Long.fromString(length),
      }),
    },
    "/cyber.grid.v1beta1.MsgCreateRoute": {
      aminoType: "cyber/MsgCreateRoute",
      toAmino: ({ source, destination, name }: MsgCreateRoute): AminoMsgCreateRoute["value"] => ({
        source: source,
        destination: destination,
        name: name,
      }),
      fromAmino: ({ source, destination, name }: AminoMsgCreateRoute["value"]): MsgCreateRoute => ({
        source: source,
        destination: destination,
        name: name,
      }),
    },
    "/cyber.grid.v1beta1.MsgEditRoute": {
      aminoType: "cyber/MsgEditRoute",
      toAmino: ({ source, destination, value }: MsgEditRoute): AminoMsgEditRoute["value"] => {
        assertDefinedAndNotNull(value, "missing value");
        return {
          source: source,
          destination: destination,
          value: value,
        };
      },
      fromAmino: ({ source, destination, value }: AminoMsgEditRoute["value"]): MsgEditRoute => ({
        source: source,
        destination: destination,
        value: value,
      }),
    },
    "/cyber.grid.v1beta1.MsgDeleteRoute": {
      aminoType: "cyber/MsgDeleteRoute",
      toAmino: ({ source, destination }: MsgDeleteRoute): AminoMsgDeleteRoute["value"] => ({
        source: source,
        destination: destination,
      }),
      fromAmino: ({ source, destination }: AminoMsgDeleteRoute["value"]): MsgDeleteRoute => ({
        source: source,
        destination: destination,
      }),
    },
    "/cyber.grid.v1beta1.MsgEditRouteName": {
      aminoType: "cyber/MsgEditRouteName",
      toAmino: ({ source, destination, name }: MsgEditRouteName): AminoMsgEditRouteName["value"] => ({
        source: source,
        destination: destination,
        name: name,
      }),
      fromAmino: ({ source, destination, name }: AminoMsgEditRouteName["value"]): MsgEditRouteName => ({
        source: source,
        destination: destination,
        name: name,
      }),
    },
    // not working (signature verification failed; lease verify account number (#), sequence (#) and chain-id (#): unauthorized)
    "/tendermint.liquidity.v1beta1.MsgSwapWithinBatch": {
      aminoType: "liquidity/MsgSwapWithinBatch",
      toAmino: ({
        swapRequesterAddress,
        poolId,
        swapTypeId,
        offerCoin,
        demandCoinDenom,
        offerCoinFee,
        orderPrice,
      }: MsgSwapWithinBatch): AminoMsgSwapWithinBatch["value"] => {
        assertDefinedAndNotNull(offerCoin, "missing offer coin");
        assertDefinedAndNotNull(offerCoinFee, "missing offer coin fee");
        return {
          swap_requester_address: swapRequesterAddress,
          pool_id: poolId.toString(),
          swap_type_id: swapTypeId,
          offer_coin: offerCoin,
          demand_coin_denom: demandCoinDenom,
          offer_coin_fee: offerCoinFee,
          order_price: orderPrice,
        };
      },
      fromAmino: ({
        swap_requester_address,
        pool_id,
        swap_type_id,
        offer_coin,
        demand_coin_denom,
        offer_coin_fee,
        order_price,
      }: AminoMsgSwapWithinBatch["value"]): MsgSwapWithinBatch => {
        return {
          swapRequesterAddress: swap_requester_address,
          poolId: Long.fromString(pool_id),
          swapTypeId: swap_type_id,
          offerCoin: offer_coin,
          demandCoinDenom: demand_coin_denom,
          offerCoinFee: offer_coin_fee,
          orderPrice: order_price,
        };
      },
    },
    "/tendermint.liquidity.v1beta1.MsgDepositWithinBatch": {
      aminoType: "liquidity/MsgDepositWithinBatch",
      toAmino: ({
        depositorAddress,
        poolId,
        depositCoins,
      }: MsgDepositWithinBatch): AminoMsgDepositWithinBatch["value"] => {
        assertDefinedAndNotNull(depositCoins, "missing deposit coins");
        return {
          depositor_address: depositorAddress,
          pool_id: poolId.toString(),
          deposit_coins: depositCoins,
        };
      },
      fromAmino: ({
        depositor_address,
        pool_id,
        deposit_coins,
      }: AminoMsgDepositWithinBatch["value"]): MsgDepositWithinBatch => ({
        depositorAddress: depositor_address,
        poolId: Long.fromString(pool_id),
        depositCoins: deposit_coins,
      }),
    },
    "/tendermint.liquidity.v1beta1.MsgWithdrawWithinBatch": {
      aminoType: "liquidity/MsgWithdrawWithinBatch",
      toAmino: ({
        withdrawerAddress,
        poolId,
        poolCoin,
      }: MsgWithdrawWithinBatch): AminoMsgWithdrawWithinBatch["value"] => {
        assertDefinedAndNotNull(poolCoin, "missing deposit coins");
        return {
          withdrawer_address: withdrawerAddress,
          pool_id: poolId.toString(),
          pool_coin: poolCoin,
        };
      },
      fromAmino: ({
        withdrawer_address,
        pool_id,
        pool_coin,
      }: AminoMsgWithdrawWithinBatch["value"]): MsgWithdrawWithinBatch => ({
        withdrawerAddress: withdrawer_address,
        poolId: Long.fromString(pool_id),
        poolCoin: pool_coin,
      }),
    },
  };
}
