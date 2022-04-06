# cyber-js

[![version](https://img.shields.io/npm/v/@cybercongress/cyber-js)](https://www.npmjs.com/package/@cybercongress/cyber-js)

### Modules support:

Query client extensions support for modules:
- Auth
- Bank
- Distribution
- Staking
- Graph
- Rank
- Bandwidth
- Grid
- Wasm
- Liquidity
- Gov

Signing client messages support for modules:
- Graph
    - MsgCyberlink
- Resources
    - MsgInvestmint
- Grid
    - MsgCreateRoute
    - MsgEditRoute
    - MsgEditRouteName
    - MsgDeleteRoute
- Wasm
    - MsgClearAdmin
    - MsgExecuteContract
    - MsgMigrateContract
    - MsgStoreCode
    - MsgInstantiateContract
    - MsgUpdateAdmin
- Liquidity
    - MsgSwapWithinBatch
    - MsgDepositWithinBatch
    - MsgWithdrawWithinBatch
    - MsgCreatePool
- Gov
    - MsgDeposit
    - MsgVote
    - MsgSubmitProposal
- Distribution
    - MsgWithdrawDelegatorReward
- Staking
    - MsgDelegate
    - MsgBeginRedelegate
    - MsgUndelegate
- IBC
    - MsgTransfer


### Usage:
```
yarn

yarn get-proto

yarn define-proto

yarn postdefine-proto

yarn build

yarn lint-fix
```