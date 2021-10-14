import { AminoMsg, Coin } from "@cosmjs/amino";
import { AminoConverter } from "@cosmjs/stargate";
import { MsgCyberlink } from "./codec/cyber/graph/v1beta1/tx";
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
      readonly links: readonly Link[];
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

export function createCyberTypes(): Record<string, AminoConverter> {
    return {
        "/cyber.graph.v1beta1.MsgCyberlink": {
            aminoType: "cyber/Link",
            toAmino: ({ neuron, links }: MsgCyberlink): AminoMsgCyberlink["value"] => ({
                neuron: neuron,
                links: links,
            }),
            fromAmino: ({ neuron, links }: AminoMsgCyberlink["value"]): MsgCyberlink => ({
                neuron: neuron,
                links: [...links],
            }),
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
                }
            },
            fromAmino: ({ neuron, amount, resource, length }: AminoMsgInvestmint["value"]): MsgInvestmint => ({
                neuron: neuron,
                amount: amount,
                resource: resource,
                length: Long.fromString(length),
            }),
        }
    }
}