import { AminoMsg, Coin, coin } from "@cosmjs/amino";
import { AminoConverter } from "@cosmjs/stargate";
import { MsgCyberlink } from "./codec/cyber/graph/v1beta1/tx";
import { MsgCreateRoute, MsgEditRoute, MsgDeleteRoute, MsgEditRouteName } from "./codec/cyber/grid/v1beta1/tx";
import { MsgInvestmint } from "./codec/cyber/resources/v1beta1/tx";
import { assertDefinedAndNotNull } from "@cosmjs/utils";
import Long from "long";

export interface Link {
    readonly from: string;
    readonly to: string;
}

export function link(from: string, to: string): Link {
    return { from: from, to: to };
}

export function links(from: string, to: string): Link[] {
    return [link(from,to)];
}

export interface AminoMsgCyberlink extends AminoMsg {
    readonly type: "cyber/Link";
    readonly value: {
      readonly neuron: string;
      readonly links: Link[];
    };
  }
  
export function isAminoMsgCyberlink(msg: AminoMsg): msg is AminoMsgCyberlink {
    return msg.type === "cyber/Link";
}


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

export function createCyberTypes(): Record<string, AminoConverter> {
    return {
        // not working
        "/cyber.graph.v1beta1.MsgCyberlink": {
            aminoType: "cyber/Link",
            toAmino: ({ neuron, links }: MsgCyberlink): AminoMsgCyberlink["value"] => ({
                neuron: neuron,
                links: links
            }),
            fromAmino: ({ neuron, links }: AminoMsgCyberlink["value"]): MsgCyberlink => ({
                neuron: neuron,
                links: links
            }),
        },
        // not working
        "/cyber.resources.v1beta1.MsgInvestmint": {
            aminoType: "cyber/MsgInvestmint",
            toAmino: ({ neuron, amount, resource, length }: MsgInvestmint): AminoMsgInvestmint["value"] => {
                assertDefinedAndNotNull(amount, "missing amount");
                return {
                    neuron: neuron,
                    amount: amount,
                    resource: resource,
                    length: length.toString(),
                }
            },
            fromAmino: ({ neuron, amount, resource, length }: AminoMsgInvestmint["value"]): MsgInvestmint => ({
                neuron: neuron,
                amount: amount,
                resource: resource,
                length: Long.fromString(length)
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
    }
}