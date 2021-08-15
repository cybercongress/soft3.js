/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos_proto/coin";
import {
  MsgDepositWithinBatch,
  MsgWithdrawWithinBatch,
  MsgSwapWithinBatch,
} from "../../../tendermint/liquidity/v1beta1/tx";

export const protobufPackage = "tendermint.liquidity.v1beta1";

/** Structure for the pool type to distinguish the characteristics of the reserve pools. */
export interface PoolType {
  /**
   * This is the id of the pool_type that is used as pool_type_id for pool creation.
   * In this version, only pool-type-id 1 is supported.
   * {"id":1,"name":"ConstantProductLiquidityPool","min_reserve_coin_num":2,"max_reserve_coin_num":2,"description":""}
   */
  id: number;
  /** name of the pool type. */
  name: string;
  /** minimum number of reserveCoins for LiquidityPoolType, only 2 reserve coins are supported. */
  minReserveCoinNum: number;
  /** maximum number of reserveCoins for LiquidityPoolType, only 2 reserve coins are supported. */
  maxReserveCoinNum: number;
  /** description of the pool type. */
  description: string;
}

/** Params defines the parameters for the liquidity module. */
export interface Params {
  /** list of available pool types */
  poolTypes: PoolType[];
  /** Minimum number of coins to be deposited to the liquidity pool on pool creation. */
  minInitDepositAmount: string;
  /** Initial mint amount of pool coins upon pool creation. */
  initPoolCoinMintAmount: string;
  /** Limit the size of each liquidity pool to minimize risk. In development, set to 0 for no limit. In production, set a limit. */
  maxReserveCoinAmount: string;
  /** Fee paid to create a Liquidity Pool. Set a fee to prevent spamming. */
  poolCreationFee: Coin[];
  /** Swap fee rate for every executed swap. */
  swapFeeRate: string;
  /** Reserve coin withdrawal with less proportion by withdrawFeeRate. */
  withdrawFeeRate: string;
  /** Maximum ratio of reserve coins that can be ordered at a swap order. */
  maxOrderAmountRatio: string;
  /** The smallest unit batch height for every liquidity pool. */
  unitBatchHeight: number;
  /** Circuit breaker enables or disables transaction messages in liquidity module. */
  circuitBreakerEnabled: boolean;
}

/** Pool defines the liquidity pool that contains pool information. */
export interface Pool {
  /** id of the pool */
  id: Long;
  /** id of the pool_type */
  typeId: number;
  /** denoms of reserve coin pair of the pool */
  reserveCoinDenoms: string[];
  /** reserve account address of the pool */
  reserveAccountAddress: string;
  /** denom of pool coin of the pool */
  poolCoinDenom: string;
}

/** Metadata for the state of each pool for invariant checking after genesis export or import. */
export interface PoolMetadata {
  /** id of the pool */
  poolId: Long;
  /** pool coin issued at the pool */
  poolCoinTotalSupply?: Coin;
  /** reserve coins deposited in the pool */
  reserveCoins: Coin[];
}

/**
 * PoolBatch defines the batch or batches of a given liquidity pool that contains indexes of deposit, withdraw, and swap messages.
 * Index param increments by 1 if the pool id is same.
 */
export interface PoolBatch {
  /** id of the pool */
  poolId: Long;
  /** index of this batch */
  index: Long;
  /** height where this batch is started */
  beginHeight: Long;
  /** last index of DepositMsgStates */
  depositMsgIndex: Long;
  /** last index of WithdrawMsgStates */
  withdrawMsgIndex: Long;
  /** last index of SwapMsgStates */
  swapMsgIndex: Long;
  /** true if executed, false if not executed */
  executed: boolean;
}

/** DepositMsgState defines the state of deposit message that contains state information as it is processed in the next batch or batches. */
export interface DepositMsgState {
  /** height where this message is appended to the batch */
  msgHeight: Long;
  /** index of this deposit message in this liquidity pool */
  msgIndex: Long;
  /** true if executed on this batch, false if not executed */
  executed: boolean;
  /** true if executed successfully on this batch, false if failed */
  succeeded: boolean;
  /** true if ready to be deleted on kvstore, false if not ready to be deleted */
  toBeDeleted: boolean;
  /** MsgDepositWithinBatch */
  msg?: MsgDepositWithinBatch;
}

/** WithdrawMsgState defines the state of the withdraw message that contains state information as the message is processed in the next batch or batches. */
export interface WithdrawMsgState {
  /** height where this message is appended to the batch */
  msgHeight: Long;
  /** index of this withdraw message in this liquidity pool */
  msgIndex: Long;
  /** true if executed on this batch, false if not executed */
  executed: boolean;
  /** true if executed successfully on this batch, false if failed */
  succeeded: boolean;
  /** true if ready to be deleted on kvstore, false if not ready to be deleted */
  toBeDeleted: boolean;
  /** MsgWithdrawWithinBatch */
  msg?: MsgWithdrawWithinBatch;
}

/** SwapMsgState defines the state of the swap message that contains state information as the message is processed in the next batch or batches. */
export interface SwapMsgState {
  /** height where this message is appended to the batch */
  msgHeight: Long;
  /** index of this swap message in this liquidity pool */
  msgIndex: Long;
  /** true if executed on this batch, false if not executed */
  executed: boolean;
  /** true if executed successfully on this batch, false if failed */
  succeeded: boolean;
  /** true if ready to be deleted on kvstore, false if not ready to be deleted */
  toBeDeleted: boolean;
  /** swap orders are cancelled when current height is equal to or higher than ExpiryHeight */
  orderExpiryHeight: Long;
  /** offer coin exchanged until now */
  exchangedOfferCoin?: Coin;
  /** offer coin currently remaining to be exchanged */
  remainingOfferCoin?: Coin;
  /** reserve fee for pays fee in half offer coin */
  reservedOfferCoinFee?: Coin;
  /** MsgSwapWithinBatch */
  msg?: MsgSwapWithinBatch;
}

const basePoolType: object = { id: 0, name: "", minReserveCoinNum: 0, maxReserveCoinNum: 0, description: "" };

export const PoolType = {
  encode(message: PoolType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.minReserveCoinNum !== 0) {
      writer.uint32(24).uint32(message.minReserveCoinNum);
    }
    if (message.maxReserveCoinNum !== 0) {
      writer.uint32(32).uint32(message.maxReserveCoinNum);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolType {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePoolType } as PoolType;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.minReserveCoinNum = reader.uint32();
          break;
        case 4:
          message.maxReserveCoinNum = reader.uint32();
          break;
        case 5:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolType {
    const message = { ...basePoolType } as PoolType;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.minReserveCoinNum !== undefined && object.minReserveCoinNum !== null) {
      message.minReserveCoinNum = Number(object.minReserveCoinNum);
    } else {
      message.minReserveCoinNum = 0;
    }
    if (object.maxReserveCoinNum !== undefined && object.maxReserveCoinNum !== null) {
      message.maxReserveCoinNum = Number(object.maxReserveCoinNum);
    } else {
      message.maxReserveCoinNum = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: PoolType): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.minReserveCoinNum !== undefined && (obj.minReserveCoinNum = message.minReserveCoinNum);
    message.maxReserveCoinNum !== undefined && (obj.maxReserveCoinNum = message.maxReserveCoinNum);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<PoolType>): PoolType {
    const message = { ...basePoolType } as PoolType;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.minReserveCoinNum !== undefined && object.minReserveCoinNum !== null) {
      message.minReserveCoinNum = object.minReserveCoinNum;
    } else {
      message.minReserveCoinNum = 0;
    }
    if (object.maxReserveCoinNum !== undefined && object.maxReserveCoinNum !== null) {
      message.maxReserveCoinNum = object.maxReserveCoinNum;
    } else {
      message.maxReserveCoinNum = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseParams: object = {
  minInitDepositAmount: "",
  initPoolCoinMintAmount: "",
  maxReserveCoinAmount: "",
  swapFeeRate: "",
  withdrawFeeRate: "",
  maxOrderAmountRatio: "",
  unitBatchHeight: 0,
  circuitBreakerEnabled: false,
};

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.poolTypes) {
      PoolType.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.minInitDepositAmount !== "") {
      writer.uint32(18).string(message.minInitDepositAmount);
    }
    if (message.initPoolCoinMintAmount !== "") {
      writer.uint32(26).string(message.initPoolCoinMintAmount);
    }
    if (message.maxReserveCoinAmount !== "") {
      writer.uint32(34).string(message.maxReserveCoinAmount);
    }
    for (const v of message.poolCreationFee) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.swapFeeRate !== "") {
      writer.uint32(50).string(message.swapFeeRate);
    }
    if (message.withdrawFeeRate !== "") {
      writer.uint32(58).string(message.withdrawFeeRate);
    }
    if (message.maxOrderAmountRatio !== "") {
      writer.uint32(66).string(message.maxOrderAmountRatio);
    }
    if (message.unitBatchHeight !== 0) {
      writer.uint32(72).uint32(message.unitBatchHeight);
    }
    if (message.circuitBreakerEnabled === true) {
      writer.uint32(80).bool(message.circuitBreakerEnabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    message.poolTypes = [];
    message.poolCreationFee = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolTypes.push(PoolType.decode(reader, reader.uint32()));
          break;
        case 2:
          message.minInitDepositAmount = reader.string();
          break;
        case 3:
          message.initPoolCoinMintAmount = reader.string();
          break;
        case 4:
          message.maxReserveCoinAmount = reader.string();
          break;
        case 5:
          message.poolCreationFee.push(Coin.decode(reader, reader.uint32()));
          break;
        case 6:
          message.swapFeeRate = reader.string();
          break;
        case 7:
          message.withdrawFeeRate = reader.string();
          break;
        case 8:
          message.maxOrderAmountRatio = reader.string();
          break;
        case 9:
          message.unitBatchHeight = reader.uint32();
          break;
        case 10:
          message.circuitBreakerEnabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    message.poolTypes = [];
    message.poolCreationFee = [];
    if (object.poolTypes !== undefined && object.poolTypes !== null) {
      for (const e of object.poolTypes) {
        message.poolTypes.push(PoolType.fromJSON(e));
      }
    }
    if (object.minInitDepositAmount !== undefined && object.minInitDepositAmount !== null) {
      message.minInitDepositAmount = String(object.minInitDepositAmount);
    } else {
      message.minInitDepositAmount = "";
    }
    if (object.initPoolCoinMintAmount !== undefined && object.initPoolCoinMintAmount !== null) {
      message.initPoolCoinMintAmount = String(object.initPoolCoinMintAmount);
    } else {
      message.initPoolCoinMintAmount = "";
    }
    if (object.maxReserveCoinAmount !== undefined && object.maxReserveCoinAmount !== null) {
      message.maxReserveCoinAmount = String(object.maxReserveCoinAmount);
    } else {
      message.maxReserveCoinAmount = "";
    }
    if (object.poolCreationFee !== undefined && object.poolCreationFee !== null) {
      for (const e of object.poolCreationFee) {
        message.poolCreationFee.push(Coin.fromJSON(e));
      }
    }
    if (object.swapFeeRate !== undefined && object.swapFeeRate !== null) {
      message.swapFeeRate = String(object.swapFeeRate);
    } else {
      message.swapFeeRate = "";
    }
    if (object.withdrawFeeRate !== undefined && object.withdrawFeeRate !== null) {
      message.withdrawFeeRate = String(object.withdrawFeeRate);
    } else {
      message.withdrawFeeRate = "";
    }
    if (object.maxOrderAmountRatio !== undefined && object.maxOrderAmountRatio !== null) {
      message.maxOrderAmountRatio = String(object.maxOrderAmountRatio);
    } else {
      message.maxOrderAmountRatio = "";
    }
    if (object.unitBatchHeight !== undefined && object.unitBatchHeight !== null) {
      message.unitBatchHeight = Number(object.unitBatchHeight);
    } else {
      message.unitBatchHeight = 0;
    }
    if (object.circuitBreakerEnabled !== undefined && object.circuitBreakerEnabled !== null) {
      message.circuitBreakerEnabled = Boolean(object.circuitBreakerEnabled);
    } else {
      message.circuitBreakerEnabled = false;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.poolTypes) {
      obj.poolTypes = message.poolTypes.map((e) => (e ? PoolType.toJSON(e) : undefined));
    } else {
      obj.poolTypes = [];
    }
    message.minInitDepositAmount !== undefined && (obj.minInitDepositAmount = message.minInitDepositAmount);
    message.initPoolCoinMintAmount !== undefined &&
      (obj.initPoolCoinMintAmount = message.initPoolCoinMintAmount);
    message.maxReserveCoinAmount !== undefined && (obj.maxReserveCoinAmount = message.maxReserveCoinAmount);
    if (message.poolCreationFee) {
      obj.poolCreationFee = message.poolCreationFee.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.poolCreationFee = [];
    }
    message.swapFeeRate !== undefined && (obj.swapFeeRate = message.swapFeeRate);
    message.withdrawFeeRate !== undefined && (obj.withdrawFeeRate = message.withdrawFeeRate);
    message.maxOrderAmountRatio !== undefined && (obj.maxOrderAmountRatio = message.maxOrderAmountRatio);
    message.unitBatchHeight !== undefined && (obj.unitBatchHeight = message.unitBatchHeight);
    message.circuitBreakerEnabled !== undefined &&
      (obj.circuitBreakerEnabled = message.circuitBreakerEnabled);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    message.poolTypes = [];
    message.poolCreationFee = [];
    if (object.poolTypes !== undefined && object.poolTypes !== null) {
      for (const e of object.poolTypes) {
        message.poolTypes.push(PoolType.fromPartial(e));
      }
    }
    if (object.minInitDepositAmount !== undefined && object.minInitDepositAmount !== null) {
      message.minInitDepositAmount = object.minInitDepositAmount;
    } else {
      message.minInitDepositAmount = "";
    }
    if (object.initPoolCoinMintAmount !== undefined && object.initPoolCoinMintAmount !== null) {
      message.initPoolCoinMintAmount = object.initPoolCoinMintAmount;
    } else {
      message.initPoolCoinMintAmount = "";
    }
    if (object.maxReserveCoinAmount !== undefined && object.maxReserveCoinAmount !== null) {
      message.maxReserveCoinAmount = object.maxReserveCoinAmount;
    } else {
      message.maxReserveCoinAmount = "";
    }
    if (object.poolCreationFee !== undefined && object.poolCreationFee !== null) {
      for (const e of object.poolCreationFee) {
        message.poolCreationFee.push(Coin.fromPartial(e));
      }
    }
    if (object.swapFeeRate !== undefined && object.swapFeeRate !== null) {
      message.swapFeeRate = object.swapFeeRate;
    } else {
      message.swapFeeRate = "";
    }
    if (object.withdrawFeeRate !== undefined && object.withdrawFeeRate !== null) {
      message.withdrawFeeRate = object.withdrawFeeRate;
    } else {
      message.withdrawFeeRate = "";
    }
    if (object.maxOrderAmountRatio !== undefined && object.maxOrderAmountRatio !== null) {
      message.maxOrderAmountRatio = object.maxOrderAmountRatio;
    } else {
      message.maxOrderAmountRatio = "";
    }
    if (object.unitBatchHeight !== undefined && object.unitBatchHeight !== null) {
      message.unitBatchHeight = object.unitBatchHeight;
    } else {
      message.unitBatchHeight = 0;
    }
    if (object.circuitBreakerEnabled !== undefined && object.circuitBreakerEnabled !== null) {
      message.circuitBreakerEnabled = object.circuitBreakerEnabled;
    } else {
      message.circuitBreakerEnabled = false;
    }
    return message;
  },
};

const basePool: object = {
  id: Long.UZERO,
  typeId: 0,
  reserveCoinDenoms: "",
  reserveAccountAddress: "",
  poolCoinDenom: "",
};

export const Pool = {
  encode(message: Pool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.typeId !== 0) {
      writer.uint32(16).uint32(message.typeId);
    }
    for (const v of message.reserveCoinDenoms) {
      writer.uint32(26).string(v!);
    }
    if (message.reserveAccountAddress !== "") {
      writer.uint32(34).string(message.reserveAccountAddress);
    }
    if (message.poolCoinDenom !== "") {
      writer.uint32(42).string(message.poolCoinDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePool } as Pool;
    message.reserveCoinDenoms = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.typeId = reader.uint32();
          break;
        case 3:
          message.reserveCoinDenoms.push(reader.string());
          break;
        case 4:
          message.reserveAccountAddress = reader.string();
          break;
        case 5:
          message.poolCoinDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Pool {
    const message = { ...basePool } as Pool;
    message.reserveCoinDenoms = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    } else {
      message.id = Long.UZERO;
    }
    if (object.typeId !== undefined && object.typeId !== null) {
      message.typeId = Number(object.typeId);
    } else {
      message.typeId = 0;
    }
    if (object.reserveCoinDenoms !== undefined && object.reserveCoinDenoms !== null) {
      for (const e of object.reserveCoinDenoms) {
        message.reserveCoinDenoms.push(String(e));
      }
    }
    if (object.reserveAccountAddress !== undefined && object.reserveAccountAddress !== null) {
      message.reserveAccountAddress = String(object.reserveAccountAddress);
    } else {
      message.reserveAccountAddress = "";
    }
    if (object.poolCoinDenom !== undefined && object.poolCoinDenom !== null) {
      message.poolCoinDenom = String(object.poolCoinDenom);
    } else {
      message.poolCoinDenom = "";
    }
    return message;
  },

  toJSON(message: Pool): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.typeId !== undefined && (obj.typeId = message.typeId);
    if (message.reserveCoinDenoms) {
      obj.reserveCoinDenoms = message.reserveCoinDenoms.map((e) => e);
    } else {
      obj.reserveCoinDenoms = [];
    }
    message.reserveAccountAddress !== undefined &&
      (obj.reserveAccountAddress = message.reserveAccountAddress);
    message.poolCoinDenom !== undefined && (obj.poolCoinDenom = message.poolCoinDenom);
    return obj;
  },

  fromPartial(object: DeepPartial<Pool>): Pool {
    const message = { ...basePool } as Pool;
    message.reserveCoinDenoms = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id as Long;
    } else {
      message.id = Long.UZERO;
    }
    if (object.typeId !== undefined && object.typeId !== null) {
      message.typeId = object.typeId;
    } else {
      message.typeId = 0;
    }
    if (object.reserveCoinDenoms !== undefined && object.reserveCoinDenoms !== null) {
      for (const e of object.reserveCoinDenoms) {
        message.reserveCoinDenoms.push(e);
      }
    }
    if (object.reserveAccountAddress !== undefined && object.reserveAccountAddress !== null) {
      message.reserveAccountAddress = object.reserveAccountAddress;
    } else {
      message.reserveAccountAddress = "";
    }
    if (object.poolCoinDenom !== undefined && object.poolCoinDenom !== null) {
      message.poolCoinDenom = object.poolCoinDenom;
    } else {
      message.poolCoinDenom = "";
    }
    return message;
  },
};

const basePoolMetadata: object = { poolId: Long.UZERO };

export const PoolMetadata = {
  encode(message: PoolMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.poolCoinTotalSupply !== undefined) {
      Coin.encode(message.poolCoinTotalSupply, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.reserveCoins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePoolMetadata } as PoolMetadata;
    message.reserveCoins = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64() as Long;
          break;
        case 2:
          message.poolCoinTotalSupply = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.reserveCoins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolMetadata {
    const message = { ...basePoolMetadata } as PoolMetadata;
    message.reserveCoins = [];
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Long.fromString(object.poolId);
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.poolCoinTotalSupply !== undefined && object.poolCoinTotalSupply !== null) {
      message.poolCoinTotalSupply = Coin.fromJSON(object.poolCoinTotalSupply);
    } else {
      message.poolCoinTotalSupply = undefined;
    }
    if (object.reserveCoins !== undefined && object.reserveCoins !== null) {
      for (const e of object.reserveCoins) {
        message.reserveCoins.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: PoolMetadata): unknown {
    const obj: any = {};
    message.poolId !== undefined && (obj.poolId = (message.poolId || Long.UZERO).toString());
    message.poolCoinTotalSupply !== undefined &&
      (obj.poolCoinTotalSupply = message.poolCoinTotalSupply
        ? Coin.toJSON(message.poolCoinTotalSupply)
        : undefined);
    if (message.reserveCoins) {
      obj.reserveCoins = message.reserveCoins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.reserveCoins = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<PoolMetadata>): PoolMetadata {
    const message = { ...basePoolMetadata } as PoolMetadata;
    message.reserveCoins = [];
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId as Long;
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.poolCoinTotalSupply !== undefined && object.poolCoinTotalSupply !== null) {
      message.poolCoinTotalSupply = Coin.fromPartial(object.poolCoinTotalSupply);
    } else {
      message.poolCoinTotalSupply = undefined;
    }
    if (object.reserveCoins !== undefined && object.reserveCoins !== null) {
      for (const e of object.reserveCoins) {
        message.reserveCoins.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const basePoolBatch: object = {
  poolId: Long.UZERO,
  index: Long.UZERO,
  beginHeight: Long.ZERO,
  depositMsgIndex: Long.UZERO,
  withdrawMsgIndex: Long.UZERO,
  swapMsgIndex: Long.UZERO,
  executed: false,
};

export const PoolBatch = {
  encode(message: PoolBatch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (!message.index.isZero()) {
      writer.uint32(16).uint64(message.index);
    }
    if (!message.beginHeight.isZero()) {
      writer.uint32(24).int64(message.beginHeight);
    }
    if (!message.depositMsgIndex.isZero()) {
      writer.uint32(32).uint64(message.depositMsgIndex);
    }
    if (!message.withdrawMsgIndex.isZero()) {
      writer.uint32(40).uint64(message.withdrawMsgIndex);
    }
    if (!message.swapMsgIndex.isZero()) {
      writer.uint32(48).uint64(message.swapMsgIndex);
    }
    if (message.executed === true) {
      writer.uint32(56).bool(message.executed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolBatch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePoolBatch } as PoolBatch;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64() as Long;
          break;
        case 2:
          message.index = reader.uint64() as Long;
          break;
        case 3:
          message.beginHeight = reader.int64() as Long;
          break;
        case 4:
          message.depositMsgIndex = reader.uint64() as Long;
          break;
        case 5:
          message.withdrawMsgIndex = reader.uint64() as Long;
          break;
        case 6:
          message.swapMsgIndex = reader.uint64() as Long;
          break;
        case 7:
          message.executed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolBatch {
    const message = { ...basePoolBatch } as PoolBatch;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Long.fromString(object.poolId);
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = Long.fromString(object.index);
    } else {
      message.index = Long.UZERO;
    }
    if (object.beginHeight !== undefined && object.beginHeight !== null) {
      message.beginHeight = Long.fromString(object.beginHeight);
    } else {
      message.beginHeight = Long.ZERO;
    }
    if (object.depositMsgIndex !== undefined && object.depositMsgIndex !== null) {
      message.depositMsgIndex = Long.fromString(object.depositMsgIndex);
    } else {
      message.depositMsgIndex = Long.UZERO;
    }
    if (object.withdrawMsgIndex !== undefined && object.withdrawMsgIndex !== null) {
      message.withdrawMsgIndex = Long.fromString(object.withdrawMsgIndex);
    } else {
      message.withdrawMsgIndex = Long.UZERO;
    }
    if (object.swapMsgIndex !== undefined && object.swapMsgIndex !== null) {
      message.swapMsgIndex = Long.fromString(object.swapMsgIndex);
    } else {
      message.swapMsgIndex = Long.UZERO;
    }
    if (object.executed !== undefined && object.executed !== null) {
      message.executed = Boolean(object.executed);
    } else {
      message.executed = false;
    }
    return message;
  },

  toJSON(message: PoolBatch): unknown {
    const obj: any = {};
    message.poolId !== undefined && (obj.poolId = (message.poolId || Long.UZERO).toString());
    message.index !== undefined && (obj.index = (message.index || Long.UZERO).toString());
    message.beginHeight !== undefined && (obj.beginHeight = (message.beginHeight || Long.ZERO).toString());
    message.depositMsgIndex !== undefined &&
      (obj.depositMsgIndex = (message.depositMsgIndex || Long.UZERO).toString());
    message.withdrawMsgIndex !== undefined &&
      (obj.withdrawMsgIndex = (message.withdrawMsgIndex || Long.UZERO).toString());
    message.swapMsgIndex !== undefined &&
      (obj.swapMsgIndex = (message.swapMsgIndex || Long.UZERO).toString());
    message.executed !== undefined && (obj.executed = message.executed);
    return obj;
  },

  fromPartial(object: DeepPartial<PoolBatch>): PoolBatch {
    const message = { ...basePoolBatch } as PoolBatch;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId as Long;
    } else {
      message.poolId = Long.UZERO;
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index as Long;
    } else {
      message.index = Long.UZERO;
    }
    if (object.beginHeight !== undefined && object.beginHeight !== null) {
      message.beginHeight = object.beginHeight as Long;
    } else {
      message.beginHeight = Long.ZERO;
    }
    if (object.depositMsgIndex !== undefined && object.depositMsgIndex !== null) {
      message.depositMsgIndex = object.depositMsgIndex as Long;
    } else {
      message.depositMsgIndex = Long.UZERO;
    }
    if (object.withdrawMsgIndex !== undefined && object.withdrawMsgIndex !== null) {
      message.withdrawMsgIndex = object.withdrawMsgIndex as Long;
    } else {
      message.withdrawMsgIndex = Long.UZERO;
    }
    if (object.swapMsgIndex !== undefined && object.swapMsgIndex !== null) {
      message.swapMsgIndex = object.swapMsgIndex as Long;
    } else {
      message.swapMsgIndex = Long.UZERO;
    }
    if (object.executed !== undefined && object.executed !== null) {
      message.executed = object.executed;
    } else {
      message.executed = false;
    }
    return message;
  },
};

const baseDepositMsgState: object = {
  msgHeight: Long.ZERO,
  msgIndex: Long.UZERO,
  executed: false,
  succeeded: false,
  toBeDeleted: false,
};

export const DepositMsgState = {
  encode(message: DepositMsgState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.msgHeight.isZero()) {
      writer.uint32(8).int64(message.msgHeight);
    }
    if (!message.msgIndex.isZero()) {
      writer.uint32(16).uint64(message.msgIndex);
    }
    if (message.executed === true) {
      writer.uint32(24).bool(message.executed);
    }
    if (message.succeeded === true) {
      writer.uint32(32).bool(message.succeeded);
    }
    if (message.toBeDeleted === true) {
      writer.uint32(40).bool(message.toBeDeleted);
    }
    if (message.msg !== undefined) {
      MsgDepositWithinBatch.encode(message.msg, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DepositMsgState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDepositMsgState } as DepositMsgState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msgHeight = reader.int64() as Long;
          break;
        case 2:
          message.msgIndex = reader.uint64() as Long;
          break;
        case 3:
          message.executed = reader.bool();
          break;
        case 4:
          message.succeeded = reader.bool();
          break;
        case 5:
          message.toBeDeleted = reader.bool();
          break;
        case 6:
          message.msg = MsgDepositWithinBatch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DepositMsgState {
    const message = { ...baseDepositMsgState } as DepositMsgState;
    if (object.msgHeight !== undefined && object.msgHeight !== null) {
      message.msgHeight = Long.fromString(object.msgHeight);
    } else {
      message.msgHeight = Long.ZERO;
    }
    if (object.msgIndex !== undefined && object.msgIndex !== null) {
      message.msgIndex = Long.fromString(object.msgIndex);
    } else {
      message.msgIndex = Long.UZERO;
    }
    if (object.executed !== undefined && object.executed !== null) {
      message.executed = Boolean(object.executed);
    } else {
      message.executed = false;
    }
    if (object.succeeded !== undefined && object.succeeded !== null) {
      message.succeeded = Boolean(object.succeeded);
    } else {
      message.succeeded = false;
    }
    if (object.toBeDeleted !== undefined && object.toBeDeleted !== null) {
      message.toBeDeleted = Boolean(object.toBeDeleted);
    } else {
      message.toBeDeleted = false;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgDepositWithinBatch.fromJSON(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },

  toJSON(message: DepositMsgState): unknown {
    const obj: any = {};
    message.msgHeight !== undefined && (obj.msgHeight = (message.msgHeight || Long.ZERO).toString());
    message.msgIndex !== undefined && (obj.msgIndex = (message.msgIndex || Long.UZERO).toString());
    message.executed !== undefined && (obj.executed = message.executed);
    message.succeeded !== undefined && (obj.succeeded = message.succeeded);
    message.toBeDeleted !== undefined && (obj.toBeDeleted = message.toBeDeleted);
    message.msg !== undefined &&
      (obj.msg = message.msg ? MsgDepositWithinBatch.toJSON(message.msg) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DepositMsgState>): DepositMsgState {
    const message = { ...baseDepositMsgState } as DepositMsgState;
    if (object.msgHeight !== undefined && object.msgHeight !== null) {
      message.msgHeight = object.msgHeight as Long;
    } else {
      message.msgHeight = Long.ZERO;
    }
    if (object.msgIndex !== undefined && object.msgIndex !== null) {
      message.msgIndex = object.msgIndex as Long;
    } else {
      message.msgIndex = Long.UZERO;
    }
    if (object.executed !== undefined && object.executed !== null) {
      message.executed = object.executed;
    } else {
      message.executed = false;
    }
    if (object.succeeded !== undefined && object.succeeded !== null) {
      message.succeeded = object.succeeded;
    } else {
      message.succeeded = false;
    }
    if (object.toBeDeleted !== undefined && object.toBeDeleted !== null) {
      message.toBeDeleted = object.toBeDeleted;
    } else {
      message.toBeDeleted = false;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgDepositWithinBatch.fromPartial(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },
};

const baseWithdrawMsgState: object = {
  msgHeight: Long.ZERO,
  msgIndex: Long.UZERO,
  executed: false,
  succeeded: false,
  toBeDeleted: false,
};

export const WithdrawMsgState = {
  encode(message: WithdrawMsgState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.msgHeight.isZero()) {
      writer.uint32(8).int64(message.msgHeight);
    }
    if (!message.msgIndex.isZero()) {
      writer.uint32(16).uint64(message.msgIndex);
    }
    if (message.executed === true) {
      writer.uint32(24).bool(message.executed);
    }
    if (message.succeeded === true) {
      writer.uint32(32).bool(message.succeeded);
    }
    if (message.toBeDeleted === true) {
      writer.uint32(40).bool(message.toBeDeleted);
    }
    if (message.msg !== undefined) {
      MsgWithdrawWithinBatch.encode(message.msg, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawMsgState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWithdrawMsgState } as WithdrawMsgState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msgHeight = reader.int64() as Long;
          break;
        case 2:
          message.msgIndex = reader.uint64() as Long;
          break;
        case 3:
          message.executed = reader.bool();
          break;
        case 4:
          message.succeeded = reader.bool();
          break;
        case 5:
          message.toBeDeleted = reader.bool();
          break;
        case 6:
          message.msg = MsgWithdrawWithinBatch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawMsgState {
    const message = { ...baseWithdrawMsgState } as WithdrawMsgState;
    if (object.msgHeight !== undefined && object.msgHeight !== null) {
      message.msgHeight = Long.fromString(object.msgHeight);
    } else {
      message.msgHeight = Long.ZERO;
    }
    if (object.msgIndex !== undefined && object.msgIndex !== null) {
      message.msgIndex = Long.fromString(object.msgIndex);
    } else {
      message.msgIndex = Long.UZERO;
    }
    if (object.executed !== undefined && object.executed !== null) {
      message.executed = Boolean(object.executed);
    } else {
      message.executed = false;
    }
    if (object.succeeded !== undefined && object.succeeded !== null) {
      message.succeeded = Boolean(object.succeeded);
    } else {
      message.succeeded = false;
    }
    if (object.toBeDeleted !== undefined && object.toBeDeleted !== null) {
      message.toBeDeleted = Boolean(object.toBeDeleted);
    } else {
      message.toBeDeleted = false;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgWithdrawWithinBatch.fromJSON(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },

  toJSON(message: WithdrawMsgState): unknown {
    const obj: any = {};
    message.msgHeight !== undefined && (obj.msgHeight = (message.msgHeight || Long.ZERO).toString());
    message.msgIndex !== undefined && (obj.msgIndex = (message.msgIndex || Long.UZERO).toString());
    message.executed !== undefined && (obj.executed = message.executed);
    message.succeeded !== undefined && (obj.succeeded = message.succeeded);
    message.toBeDeleted !== undefined && (obj.toBeDeleted = message.toBeDeleted);
    message.msg !== undefined &&
      (obj.msg = message.msg ? MsgWithdrawWithinBatch.toJSON(message.msg) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<WithdrawMsgState>): WithdrawMsgState {
    const message = { ...baseWithdrawMsgState } as WithdrawMsgState;
    if (object.msgHeight !== undefined && object.msgHeight !== null) {
      message.msgHeight = object.msgHeight as Long;
    } else {
      message.msgHeight = Long.ZERO;
    }
    if (object.msgIndex !== undefined && object.msgIndex !== null) {
      message.msgIndex = object.msgIndex as Long;
    } else {
      message.msgIndex = Long.UZERO;
    }
    if (object.executed !== undefined && object.executed !== null) {
      message.executed = object.executed;
    } else {
      message.executed = false;
    }
    if (object.succeeded !== undefined && object.succeeded !== null) {
      message.succeeded = object.succeeded;
    } else {
      message.succeeded = false;
    }
    if (object.toBeDeleted !== undefined && object.toBeDeleted !== null) {
      message.toBeDeleted = object.toBeDeleted;
    } else {
      message.toBeDeleted = false;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgWithdrawWithinBatch.fromPartial(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },
};

const baseSwapMsgState: object = {
  msgHeight: Long.ZERO,
  msgIndex: Long.UZERO,
  executed: false,
  succeeded: false,
  toBeDeleted: false,
  orderExpiryHeight: Long.ZERO,
};

export const SwapMsgState = {
  encode(message: SwapMsgState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.msgHeight.isZero()) {
      writer.uint32(8).int64(message.msgHeight);
    }
    if (!message.msgIndex.isZero()) {
      writer.uint32(16).uint64(message.msgIndex);
    }
    if (message.executed === true) {
      writer.uint32(24).bool(message.executed);
    }
    if (message.succeeded === true) {
      writer.uint32(32).bool(message.succeeded);
    }
    if (message.toBeDeleted === true) {
      writer.uint32(40).bool(message.toBeDeleted);
    }
    if (!message.orderExpiryHeight.isZero()) {
      writer.uint32(48).int64(message.orderExpiryHeight);
    }
    if (message.exchangedOfferCoin !== undefined) {
      Coin.encode(message.exchangedOfferCoin, writer.uint32(58).fork()).ldelim();
    }
    if (message.remainingOfferCoin !== undefined) {
      Coin.encode(message.remainingOfferCoin, writer.uint32(66).fork()).ldelim();
    }
    if (message.reservedOfferCoinFee !== undefined) {
      Coin.encode(message.reservedOfferCoinFee, writer.uint32(74).fork()).ldelim();
    }
    if (message.msg !== undefined) {
      MsgSwapWithinBatch.encode(message.msg, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwapMsgState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSwapMsgState } as SwapMsgState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msgHeight = reader.int64() as Long;
          break;
        case 2:
          message.msgIndex = reader.uint64() as Long;
          break;
        case 3:
          message.executed = reader.bool();
          break;
        case 4:
          message.succeeded = reader.bool();
          break;
        case 5:
          message.toBeDeleted = reader.bool();
          break;
        case 6:
          message.orderExpiryHeight = reader.int64() as Long;
          break;
        case 7:
          message.exchangedOfferCoin = Coin.decode(reader, reader.uint32());
          break;
        case 8:
          message.remainingOfferCoin = Coin.decode(reader, reader.uint32());
          break;
        case 9:
          message.reservedOfferCoinFee = Coin.decode(reader, reader.uint32());
          break;
        case 10:
          message.msg = MsgSwapWithinBatch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SwapMsgState {
    const message = { ...baseSwapMsgState } as SwapMsgState;
    if (object.msgHeight !== undefined && object.msgHeight !== null) {
      message.msgHeight = Long.fromString(object.msgHeight);
    } else {
      message.msgHeight = Long.ZERO;
    }
    if (object.msgIndex !== undefined && object.msgIndex !== null) {
      message.msgIndex = Long.fromString(object.msgIndex);
    } else {
      message.msgIndex = Long.UZERO;
    }
    if (object.executed !== undefined && object.executed !== null) {
      message.executed = Boolean(object.executed);
    } else {
      message.executed = false;
    }
    if (object.succeeded !== undefined && object.succeeded !== null) {
      message.succeeded = Boolean(object.succeeded);
    } else {
      message.succeeded = false;
    }
    if (object.toBeDeleted !== undefined && object.toBeDeleted !== null) {
      message.toBeDeleted = Boolean(object.toBeDeleted);
    } else {
      message.toBeDeleted = false;
    }
    if (object.orderExpiryHeight !== undefined && object.orderExpiryHeight !== null) {
      message.orderExpiryHeight = Long.fromString(object.orderExpiryHeight);
    } else {
      message.orderExpiryHeight = Long.ZERO;
    }
    if (object.exchangedOfferCoin !== undefined && object.exchangedOfferCoin !== null) {
      message.exchangedOfferCoin = Coin.fromJSON(object.exchangedOfferCoin);
    } else {
      message.exchangedOfferCoin = undefined;
    }
    if (object.remainingOfferCoin !== undefined && object.remainingOfferCoin !== null) {
      message.remainingOfferCoin = Coin.fromJSON(object.remainingOfferCoin);
    } else {
      message.remainingOfferCoin = undefined;
    }
    if (object.reservedOfferCoinFee !== undefined && object.reservedOfferCoinFee !== null) {
      message.reservedOfferCoinFee = Coin.fromJSON(object.reservedOfferCoinFee);
    } else {
      message.reservedOfferCoinFee = undefined;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgSwapWithinBatch.fromJSON(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },

  toJSON(message: SwapMsgState): unknown {
    const obj: any = {};
    message.msgHeight !== undefined && (obj.msgHeight = (message.msgHeight || Long.ZERO).toString());
    message.msgIndex !== undefined && (obj.msgIndex = (message.msgIndex || Long.UZERO).toString());
    message.executed !== undefined && (obj.executed = message.executed);
    message.succeeded !== undefined && (obj.succeeded = message.succeeded);
    message.toBeDeleted !== undefined && (obj.toBeDeleted = message.toBeDeleted);
    message.orderExpiryHeight !== undefined &&
      (obj.orderExpiryHeight = (message.orderExpiryHeight || Long.ZERO).toString());
    message.exchangedOfferCoin !== undefined &&
      (obj.exchangedOfferCoin = message.exchangedOfferCoin
        ? Coin.toJSON(message.exchangedOfferCoin)
        : undefined);
    message.remainingOfferCoin !== undefined &&
      (obj.remainingOfferCoin = message.remainingOfferCoin
        ? Coin.toJSON(message.remainingOfferCoin)
        : undefined);
    message.reservedOfferCoinFee !== undefined &&
      (obj.reservedOfferCoinFee = message.reservedOfferCoinFee
        ? Coin.toJSON(message.reservedOfferCoinFee)
        : undefined);
    message.msg !== undefined && (obj.msg = message.msg ? MsgSwapWithinBatch.toJSON(message.msg) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<SwapMsgState>): SwapMsgState {
    const message = { ...baseSwapMsgState } as SwapMsgState;
    if (object.msgHeight !== undefined && object.msgHeight !== null) {
      message.msgHeight = object.msgHeight as Long;
    } else {
      message.msgHeight = Long.ZERO;
    }
    if (object.msgIndex !== undefined && object.msgIndex !== null) {
      message.msgIndex = object.msgIndex as Long;
    } else {
      message.msgIndex = Long.UZERO;
    }
    if (object.executed !== undefined && object.executed !== null) {
      message.executed = object.executed;
    } else {
      message.executed = false;
    }
    if (object.succeeded !== undefined && object.succeeded !== null) {
      message.succeeded = object.succeeded;
    } else {
      message.succeeded = false;
    }
    if (object.toBeDeleted !== undefined && object.toBeDeleted !== null) {
      message.toBeDeleted = object.toBeDeleted;
    } else {
      message.toBeDeleted = false;
    }
    if (object.orderExpiryHeight !== undefined && object.orderExpiryHeight !== null) {
      message.orderExpiryHeight = object.orderExpiryHeight as Long;
    } else {
      message.orderExpiryHeight = Long.ZERO;
    }
    if (object.exchangedOfferCoin !== undefined && object.exchangedOfferCoin !== null) {
      message.exchangedOfferCoin = Coin.fromPartial(object.exchangedOfferCoin);
    } else {
      message.exchangedOfferCoin = undefined;
    }
    if (object.remainingOfferCoin !== undefined && object.remainingOfferCoin !== null) {
      message.remainingOfferCoin = Coin.fromPartial(object.remainingOfferCoin);
    } else {
      message.remainingOfferCoin = undefined;
    }
    if (object.reservedOfferCoinFee !== undefined && object.reservedOfferCoinFee !== null) {
      message.reservedOfferCoinFee = Coin.fromPartial(object.reservedOfferCoinFee);
    } else {
      message.reservedOfferCoinFee = undefined;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgSwapWithinBatch.fromPartial(object.msg);
    } else {
      message.msg = undefined;
    }
    return message;
  },
};

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
