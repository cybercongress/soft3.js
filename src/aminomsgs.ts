import { AminoMsg, Coin } from "@cosmjs/amino";
import { AminoConverter } from "@cosmjs/stargate";
import { assertDefinedAndNotNull } from "@cosmjs/utils";
import Long from "long";

import { MsgCyberlink } from "./codec/cyber/graph/v1beta1/tx";
import { Link } from "./codec/cyber/graph/v1beta1/types";
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

// Graph module

export interface AminoMsgCyberlink extends AminoMsg {
  readonly type: "cyber/MsgCyberlink";
  readonly value: {
    readonly neuron: string;
    readonly links: Link[];
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
    readonly swapRequesterAddress: string;
    readonly poolId: string;
    readonly swapTypeId: number;
    readonly offerCoin: Coin;
    readonly demandCoinDenom: string;
    readonly offerCoinFee: Coin;
    readonly orderPrice: string;
  };
}

export function isAminoMsgSwapWithinBatch(msg: AminoMsg): msg is AminoMsgSwapWithinBatch {
  return msg.type === "liquidity/MsgSwapWithinBatch";
}

export interface AminoMsgDepositWithinBatch extends AminoMsg {
  readonly type: "liquidity/MsgDepositWithinBatch";
  readonly value: {
    readonly depositorAddress: string;
    readonly poolId: string;
    readonly depositCoins: Coin[];
  };
}

export function isAminoMsgDepositWithinBatch(msg: AminoMsg): msg is AminoMsgDepositWithinBatch {
  return msg.type === "liquidity/MsgDepositWithinBatch";
}

export interface AminoMsgWithdrawWithinBatch extends AminoMsg {
  readonly type: "liquidity/MsgWithdrawWithinBatch";
  readonly value: {
    readonly withdrawerAddress: string;
    readonly poolId: string;
    readonly poolCoin: Coin;
  };
}

export function isAminoMsgWithdrawWithinBatch(msg: AminoMsg): msg is AminoMsgWithdrawWithinBatch {
  return msg.type === "liquidity/MsgWithdrawWithinBatch";
}

export function createCyberTypes(): Record<string, AminoConverter> {
  return {
    // not working (signature verification failed; lease verify account number (#), sequence (#) and chain-id (#): unauthorized)
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
    // not working (signature verification failed; lease verify account number (#), sequence (#) and chain-id (#): unauthorized)
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
          swapRequesterAddress: swapRequesterAddress,
          poolId: poolId.toString(),
          swapTypeId: swapTypeId,
          offerCoin: offerCoin,
          demandCoinDenom: demandCoinDenom,
          offerCoinFee: offerCoinFee,
          orderPrice: orderPrice,
        };
      },
      fromAmino: ({
        swapRequesterAddress,
        poolId,
        swapTypeId,
        offerCoin,
        demandCoinDenom,
        offerCoinFee,
        orderPrice,
      }: AminoMsgSwapWithinBatch["value"]): MsgSwapWithinBatch => ({
        swapRequesterAddress: swapRequesterAddress,
        poolId: Long.fromString(poolId),
        swapTypeId: swapTypeId,
        offerCoin: offerCoin,
        demandCoinDenom: demandCoinDenom,
        offerCoinFee: offerCoinFee,
        orderPrice: orderPrice,
      }),
    },
    // not working (signature verification failed; lease verify account number (#), sequence (#) and chain-id (#): unauthorized)
    "/tendermint.liquidity.v1beta1.MsgDepositWithinBatch": {
      aminoType: "liquidity/MsgDepositWithinBatch",
      toAmino: ({
        depositorAddress,
        poolId,
        depositCoins,
      }: MsgDepositWithinBatch): AminoMsgDepositWithinBatch["value"] => {
        assertDefinedAndNotNull(depositCoins, "missing deposit coins");
        return {
          depositorAddress: depositorAddress,
          poolId: poolId.toString(),
          depositCoins: depositCoins,
        };
      },
      fromAmino: ({
        depositorAddress,
        poolId,
        depositCoins,
      }: AminoMsgDepositWithinBatch["value"]): MsgDepositWithinBatch => ({
        depositorAddress: depositorAddress,
        poolId: Long.fromString(poolId),
        depositCoins: depositCoins,
      }),
    },
    // not working (signature verification failed; lease verify account number (#), sequence (#) and chain-id (#): unauthorized)
    "/tendermint.liquidity.v1beta1.MsgWithdrawWithinBatch": {
      aminoType: "liquidity/MsgWithdrawWithinBatch",
      toAmino: ({
        withdrawerAddress,
        poolId,
        poolCoin,
      }: MsgWithdrawWithinBatch): AminoMsgWithdrawWithinBatch["value"] => {
        assertDefinedAndNotNull(poolCoin, "missing deposit coins");
        return {
          withdrawerAddress: withdrawerAddress,
          poolId: poolId.toString(),
          poolCoin: poolCoin,
        };
      },
      fromAmino: ({
        withdrawerAddress,
        poolId,
        poolCoin,
      }: AminoMsgWithdrawWithinBatch["value"]): MsgWithdrawWithinBatch => ({
        withdrawerAddress: withdrawerAddress,
        poolId: Long.fromString(poolId),
        poolCoin: poolCoin,
      }),
    },
  };
}
