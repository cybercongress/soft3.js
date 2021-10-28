# cyber-js

### Modules support:

Query client extensions:
- Auth
- Bank
- Distribution
- Staking
- Graph
- Rank
- Bandwidth
- Energy
- Wasm
- Liquidity
- Gov

Signing client transaction:
- Graph
    - MsgCyberlink
- Resources
    - MsgInvestmint
- Energy
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
```