# LayerZero OFT

Repo that deploys a LayerZero OFT and send it across different networks. Not tested in production.

To get started, copy the `.env-template` file into `.env` and add your own keys.

## Deploying

```shell
npx hardhat --network bsc-testnet deploy --tags OFTToken
npx hardhat --network bsc-testnet deploy --tags ProxyOFT
npx hardhat --network bsc-testnet deploy --tags Token
```
Verifying

```
npx hardhat verify <contract_address> --contract contracts/ProxyOFT.sol:ProxyOFT --network polygon [ARGS]
```



## Running the tasks

Setting remote
```npx hardhat --network mumbai setTrustedRemote --target-network bsc-testnet --local ProxyOFT --remote OFT ```

Sending OFT token from proxy
```npx hardhat --network mumbai proxySend --target-network bsc-testnet --qty 1```

The qty is parsed with the decimals. If you want to send 1 XDOLLAR, input 1 even though the ERC20 decimal is 6.