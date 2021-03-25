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

    // console.log(await queryClient.getAccount("cyber15vyqaz9fzqn0maywf20z5etw99k6xpp426mm2g"))
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);