#!/usr/bin/env node
const { DirectSecp256k1HdWallet, Registry } = require("@cosmjs/proto-signing");
const { defaultRegistryTypes, SigningStargateClient } = require("@cosmjs/stargate");
const {stringToPath} = require("@cosmjs/crypto");
const { MsgCyberlink } = require("./build/index");

const cyberRegistry = new Registry([
  ...defaultRegistryTypes,
  ["/cyber.graph.v1beta1.MsgCyberlink", MsgCyberlink],
]);
const mnemonic =
  "diet tragic tell acquire one wash fiber reopen surprise duty discover inner kind ketchup guilt exit three elegant sausage utility slab banner yellow asset";
const rpcUrl = "http://localhost:26657"
const prefix = "cyber"
const tokenDenom = "nick"
const hdPath = stringToPath("m/44'/118'/0'/0/0")


async function main() {

  const signer = await DirectSecp256k1HdWallet.fromMnemonic(
    mnemonic,
    hdPath,
    prefix,
  );

  const client = await SigningStargateClient.connectWithSigner(
    rpcUrl,
    signer,
    {
      registry: cyberRegistry,
    },
  );

  const myAddress = "cyber15vyqaz9fzqn0maywf20z5etw99k6xpp426mm2g";

  const message = {
    typeUrl: "/cyber.graph.v1beta1.MsgCyberlink",
    value: {
      address: myAddress,
      links: [
        {
          from: "QmUX9mt8ftaHcn9Nc6SR4j9MsKkYfkcZqkfPTmMmBgeTe3",
          to: "QmUX9mt8ftaHcn9Nc6SR4j9MsKkYfkcZqkfPTmMmBgeTe7"
        }
      ]
    },
  };

  const fee = {
    amount: [
      {
        denom: tokenDenom,
        amount: "100",
      },
    ],
    gas: "150000",
  };

  console.log("Message:\n", message)
  const response = await client.signAndBroadcast(myAddress, [message], fee);
  console.log("Response:\n", response)
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);