#!/usr/bin/env node
const { DirectSecp256k1HdWallet, Registry } = require("@cosmjs/proto-signing");
const { defaultRegistryTypes, SigningStargateClient } = require("@cosmjs/stargate");
const {stringToPath} = require("@cosmjs/crypto");
const { SigningCyberClient } = require("./build/index");

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

  const client = await SigningCyberClient.connectWithSigner(rpcUrl, signer);
  const pk = Buffer.from(signer.pubkey).toString('hex');

  const myAddress = "cyber15vyqaz9fzqn0maywf20z5etw99k6xpp426mm2g";

  var response = await client.convertResources(
    myAddress,
    {
      denom: "nick",
      amount: "1000000"
    },
    "volt",
    10000
  )
  console.log(JSON.stringify(response, null, 4));

  var response = await client.convertResources(
    myAddress,
    {
      denom: "nick",
      amount: "1000000"
    },
    "amper",
    10000
  )
  console.log(JSON.stringify(response, null, 4));

  var response = await client.cyberlink(
    myAddress,
    "QmRX8qYgeZoYM3M5zzQaWEpVFdpin6FvVXvp6RPQK3oufV",
    "QmUX9mt8ftaHcn9Nc6SR4j9MsKkYfkcZqkfPTmMmBgeTe5",
  )
  console.log(JSON.stringify(response, null, 4));

}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);