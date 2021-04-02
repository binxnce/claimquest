import { Contract } from '@ethersproject/contracts'
import { Provider, Web3Provider } from '@ethersproject/providers'
import React, { createContext, useMemo, useEffect, ReactNode, useState } from 'react'
import { Signer } from '@ethersproject/abstract-signer'
import { useWeb3React } from '@web3-react/core'
import { Greeter, ClaimQuest } from '../../../../hardhat/types'

interface ContractsObject {
  greeter?: Greeter
  claimQuest?: ClaimQuest
}
const stateInitialValue = {
  contracts: {}
}

export const ContractContext = createContext<{contracts: ContractsObject}>(stateInitialValue)

interface Props {
  children: ReactNode
}


const loadContract = (contractName: string, signer: Signer | Web3Provider) => {
  const newContract = new Contract(
    require(`../../contracts/${contractName}.address.js`),
    require(`../../contracts/${contractName}.abi.js`),
    // Note has to do with versions mismatch between different ethers libraries
    // @ts-ignore
    signer
  )
  try {
    // @ts-ignore
    newContract.bytecode = require(`../../contracts/${contractName}.bytecode.js`)
  } catch (e) {
    console.log(e)
  }
  switch (contractName) {
    case 'Greeter':
      return (newContract as unknown) as Greeter
    case 'ClaimQuest':
      return (newContract as unknown) as ClaimQuest
    default:
      return newContract
  }
}

async function loadContracts(providerOrSigner, setContracts) {
  if (typeof providerOrSigner !== 'undefined') {
    try {
      // we need to check to see if this providerOrSigner has a signer or not
      let signer
      let accounts
      if (providerOrSigner && typeof providerOrSigner.listAccounts === 'function') {
        accounts = await providerOrSigner.listAccounts()
      }

      if (accounts && accounts.length > 0) {
        signer = providerOrSigner.getSigner()
      } else {
        signer = providerOrSigner
      }

      const contractList = require('../../contracts/contracts.js')
      const newContracts = {}
      contractList.forEach(contractName => {
        newContracts[contractName[0].toLowerCase() + contractName.slice(1)] = loadContract(contractName, signer)
      })

      setContracts(newContracts)
    } catch (e) {
      console.log('ERROR LOADING CONTRACTS!!', e)
    }
  }
}

export const ContractsProvider = ({ children }: Props) => {
  const { library: providerOrSigner } = useWeb3React()

  const [contracts, setContracts] = useState<ContractsObject>({})
  useEffect(() => {
    loadContracts(providerOrSigner, setContracts)
  }, [providerOrSigner])

  return <ContractContext.Provider value={{ contracts }}>{children}</ContractContext.Provider>
}
