# claimquest

## operations

```bash
    yarn chain # first terminal, starts local blockchain network
    yarn deploy # second terminal , deploys contract so the web can interact with it
    yarn dev # third terminal, starts development web server on localhost:3000
```
Connect your metamask to localhost, grab your account number
And send yourself some money
```bash
METAMASK_ACCOUNT_NUMBER=<your account number>
FROM_ACCOUNT=`yarn accounts | tail -n2 | head -1`
yarn send --from $FROM_ACCOUNT --to $METAMASK_ACCOUNT_NUMBER --amount 10
```

TODO
* Burner wallet from hardhat (able to switch between those accounts)
* Graph typings
* Provider for graph data
* GasGauge
* Ramp
* Pages are incomplete
* Other wallet providers (only injected are supported at the moment, which is enough for developing the app)
* Toaster messages upon transactions (block native)
* Another nice tools like (infura, etc for testnet phase)
* Error handling, logging, connecting wallet popup, change wallet popup, splash message when not connected to blockchain
* Low prio, last on the issues list: fix UI for responsiveness