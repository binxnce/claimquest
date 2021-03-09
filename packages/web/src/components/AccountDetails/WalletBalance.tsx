import React, { useEffect, useState } from 'react'
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'

export function WalletBalance() {
  const { account, library, chainId } = useWeb3React()

  const [balance, setBalance] = useState()
  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
  const formattedBalance = balance ? `Ξ${formatEther(balance)}` : '-'
  return (
    <>
      <span className='text-gray-500 mr-1'> {`Wallet balance: `}</span>
      <span>{formattedBalance}</span>
    </>
  )
}
