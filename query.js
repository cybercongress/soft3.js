#!/usr/bin/env node
const { QueryClient } = require("@cosmjs/stargate");
const { Tendermint34Client } = require("@cosmjs/tendermint-rpc");
const { CyberClient } = require("./build/index");


const rpcUrl = "http://localhost:26657"

async function main() {

    const tendermintClient = await Tendermint34Client.connect(rpcUrl);

    const queryClient = new CyberClient(tendermintClient)

      var queryResult = await queryClient.getAccount("cyber15vyqaz9fzqn0maywf20z5etw99k6xpp426mm2g");
      console.log(queryResult)

      var queryResult = await queryClient.graphStats({ });
      console.log(queryResult)

      var queryResult = await queryClient.getBalance("cyber15vyqaz9fzqn0maywf20z5etw99k6xpp426mm2g", "nick")
      console.log(queryResult)

      var queryResult = await queryClient.getBalance("cyber15vyqaz9fzqn0maywf20z5etw99k6xpp426mm2g", "amper")
      console.log(queryResult)

      var queryResult = await queryClient.getBalance("cyber15vyqaz9fzqn0maywf20z5etw99k6xpp426mm2g", "volt")
      console.log(queryResult)

    try {
      var queryResult = await queryClient.search("QmRX8qYgeZoYM3M5zzQaWEpVFdpin6FvVXvp6RPQK3oufV")
      console.log(queryResult)
    } catch(error) {
      console.log(error)
    }

    try {
      var queryResult = await queryClient.backlinks("QmUX9mt8ftaHcn9Nc6SR4j9MsKkYfkcZqkfPTmMmBgeTe1")
      console.log(queryResult)
    } catch(error) {
      console.log(error)
    }

    try {
      var queryResult = await queryClient.rank("QmUX9mt8ftaHcn9Nc6SR4j9MsKkYfkcZqkfPTmMmBgeTe1")
      console.log(queryResult)
    } catch(error) {
      console.log(error)
    }

    try {
      var queryResult = await queryClient.isLinkExist(
        "QmRX8qYgeZoYM3M5zzQaWEpVFdpin6FvVXvp6RPQK3oufV",
        "QmUX9mt8ftaHcn9Nc6SR4j9MsKkYfkcZqkfPTmMmBgeTe1",
        "cyber15vyqaz9fzqn0maywf20z5etw99k6xpp426mm2g"
      )
      console.log(queryResult)
    } catch(error) {
      console.log(error)
    }

    try {
      var queryResult = await queryClient.isAnyLinkExist(
        "QmRX8qYgeZoYM3M5zzQaWEpVFdpin6FvVXvp6RPQK3oufV",
        "QmUX9mt8ftaHcn9Nc6SR4j9MsKkYfkcZqkfPTmMmBgeTe1",
      )
      console.log(queryResult)
    } catch(error) {
      console.log(error)
    }

    try {
      var queryResult = await queryClient.isAnyLinkExist(
        "QmRX8qYgeZoYM3M5zzQaWEpVFdpin6FvVXvp6RPQK3oufV",
        "QmUX9mt8ftaHcn9Nc6SR4j9MsKkYfkcZqkfPTmMmBgeTe2",
      )
      console.log(queryResult)
    } catch(error) {
      console.log(error)
    }

    try {
      var queryResult = await queryClient.load()
      console.log(queryResult)
    } catch(error) {
      console.log(error)
    }

    try {
      var queryResult = await queryClient.price()
      console.log(queryResult)
    } catch(error) {
      console.log(error)
    }

    try {
      var queryResult = await queryClient.account("cyber15vyqaz9fzqn0maywf20z5etw99k6xpp426mm2g")
      console.log(queryResult)
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