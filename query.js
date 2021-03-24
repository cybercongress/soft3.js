#!/usr/bin/env node
const { QueryClient } = require("@cosmjs/stargate");
const { Tendermint34Client } = require("@cosmjs/tendermint-rpc");
const { CyberClient } = require("./build/index");


const rpcUrl = "http://localhost:26657"

async function main() {

    const tendermintClient = await Tendermint34Client.connect(rpcUrl);

    const queryClient = new CyberClient(tendermintClient)
    
    const queryResult = await queryClient.graphStats({ });
    console.log(queryResult)
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);