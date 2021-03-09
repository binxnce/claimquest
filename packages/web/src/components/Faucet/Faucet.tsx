import React from 'react'
import { useWeb3React } from '@web3-react/core'

import { GasGauge } from './GasGauge'
import { Ramp } from './Ramp'
import { TransferModal } from './TransferModal'
import { Web3WrapperProvider } from '../../models'

export function Faucet() {
  const { chainId, library, account } = useWeb3React<Web3WrapperProvider>()

  return (
    <div>
      <Ramp />
      <GasGauge />
      <input placeholder="local faucet" value={account || 'fallback'}></input>
      <button> Send funds to address</button>
      <TransferModal />
    </div>
  )
}
