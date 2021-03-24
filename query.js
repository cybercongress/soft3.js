#!/usr/bin/env node
const { createRpc, QueryClient } = require("@cosmjs/stargate");
const { Tendermint34Client } = require("@cosmjs/tendermint-rpc");
const { QueryClientImpl, QueryGraphStatsResponse } = require("./build/index");


const rpcUrl = "http://localhost:26657"

async function main() {

    const tendermintClient = await Tendermint34Client.connect(rpcUrl);

    const queryClient = new QueryClient(tendermintClient);
    
    const rpcClient = createRpc(queryClient);
    
    const queryService = new QueryClientImpl(rpcClient);
    
    const queryResult = await queryService.GraphStats({ });
    console.log(QueryGraphStatsResponse.toJSON(queryResult))
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);