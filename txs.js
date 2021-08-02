#!/usr/bin/env node
const { DirectSecp256k1HdWallet, Registry } = require("@cosmjs/proto-signing");
const {stringToPath} = require("@cosmjs/crypto");
const { SigningCyberClient } = require("./build/index");
const { GasPrice } = require("@cosmjs/stargate");

const mnemonic =
  "pudding actor cactus garden sadness cotton sign denial patch shell silly extend tube way unlock vocal famous actor danger mean acoustic garment medal fatigue";
const rpcUrl = "http://localhost:26657"
const prefix = "cyber"
const tokenDenom = "nick"
const hdPath = stringToPath("m/44'/118'/0'/0/0")


async function main() {

  const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { hdPath: hdPath, prefix: prefix} );
  const options = { prefix: prefix, gasPrice: GasPrice.fromString("0.02boot") };
  const client = await SigningCyberClient.connectWithSigner(rpcUrl, signer, options);

  const myAddress = "cyber1frk9k38pvp70vheezhdfd4nvqnlsm9dw425vga";

  // TODO add staking

  console.log("Investmint Resources - Volt\n")
  var response = await client.investmint(
    myAddress,
    {
      denom: "sboot",
      amount: "100000000",
    },
    "volt",
    100
  );
  console.log(JSON.stringify(response, null, 4));

  console.log("Investmint Resources - Amper\n")
  var response = await client.investmint(
    myAddress,
    {
      denom: "sboot",
      amount: "100000000"
    },
    "amper",
    100
  )
  console.log(JSON.stringify(response, null, 4));

  console.log("Cyberlink #1")
  try {
    var response = await client.cyberlink(
      myAddress,
      "QmRX8qYgeZoYM3M5zzQaWEpVFdpin6FvVXvp6RPQK3oufV",
      "QmUX9mt8ftaHcn9Nc6SR4j9MsKkYfkcZqkfPTmMmBgeTe4",
    )
    console.log(JSON.stringify(response, null, 4));
  } catch(error) {
    console.log(error)
  }

  console.log("Cyberlink #2")
  try {
    var response = await client.cyberlink(
      myAddress,
      "QmRX8qYgeZoYM3M5zzQaWEpVFdpin6FvVXvp6RPQK3oufV",
      "QmUX9mt8ftaHcn9Nc6SR4j9MsKkYfkcZqkfPTmMmBgeTe5",
    )
    console.log(JSON.stringify(response, null, 4));
  } catch(error) {
    console.log(error)
  }
  
  console.log("Create Route")
  try {
      var response = await client.createEnergyRoute(
    myAddress,
    "cyber1njj4p35u8pggm7nypg3y66rypgvk2atjcy7ngp",
    "synapse"
  )
  console.log(JSON.stringify(response, null, 4));
  } catch(error) {
    console.log(error)
  }

  console.log("Edit Route - Volt")
  try {
    var response = await client.editEnergyRoute(
      myAddress,
      "cyber1njj4p35u8pggm7nypg3y66rypgvk2atjcy7ngp",
      {
        denom: "volt",
        amount: "2"
      }
    )
    console.log(JSON.stringify(response, null, 4));
  } catch(error) {
    console.log(error)
  }
  

  console.log("Edit Route - Amper")
  try {
    var response = await client.editEnergyRoute(
      myAddress,
      "cyber1njj4p35u8pggm7nypg3y66rypgvk2atjcy7ngp",
      {
        denom: "amper",
        amount: "2"
      }
    )
    console.log(JSON.stringify(response, null, 4));
  } catch(error) {
    console.log(error)
  }

  console.log("Edit Route Alias")
  try {
    var response = await client.editEnergyRouteAlias(
      myAddress,
      "cyber1njj4p35u8pggm7nypg3y66rypgvk2atjcy7ngp",
      "synapse1"
    )
    console.log(JSON.stringify(response, null, 4));
  } catch(error) {
    console.log(error)
  }

  console.log("Send Tokens - Nick\n")
  try {
    var response = await client.sendTokens(
      myAddress,
      "cyber1njj4p35u8pggm7nypg3y66rypgvk2atjcy7ngp",
      [{
        denom: "nick",
        amount: "8"
      }]
    )
    console.log(JSON.stringify(response, null, 4));
  } catch(error) {
    console.log(error)
  }

  console.log("Send Tokens - Volt\n")
  try {
    var response = await client.sendTokens(
      myAddress,
      "cyber1njj4p35u8pggm7nypg3y66rypgvk2atjcy7ngp",
      [{
        denom: "volt",
        amount: "8"
      }]
    )
    console.log(JSON.stringify(response, null, 4));
  } catch(error) {
    console.log(error)
  }
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);