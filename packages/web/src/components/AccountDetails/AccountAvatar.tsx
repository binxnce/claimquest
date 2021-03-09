import React from 'react'
import { useWeb3React } from '@web3-react/core'
import Jdenticon from 'react-jdenticon';

export function AccountAvatar() {
  const { account } = useWeb3React()

  return <Jdenticon value={account || 'fallback'} size="36"/>
}
