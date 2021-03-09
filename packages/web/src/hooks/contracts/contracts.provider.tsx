import { Contract} from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import React, { createContext, useMemo, useEffect, ReactNode, useReducer, useState } from 'react'
import { Signer } from "@ethersproject/abstract-signer";
import { useWeb3React } from '@web3-react/core';

const stateInitialValue = {
  contracts: new Map<string, Contract>()
}

export const ContractContext = createContext(stateInitialValue)

interface Props {
  children: ReactNode
}

const loadContract = (contractName: string, signer: Signer | Web3Provider) => {
  const newContract = new Contract(
    require(`../../contracts/${contractName}.address.js`),
    require(`../../contracts/${contractName}.abi.js`),
    signer
  )
  try {
    // @ts-ignore
    newContract.bytecode = require(`../../contracts/${contractName}.bytecode.js`)
  } catch (e) {
    console.log(e)
  }
  return newContract
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
      const newContracts = new Map<string, Contract>()
      contractList.forEach(contractName => {
        newContracts.set(contractName, loadContract(contractName, signer))
      }, {})
      setContracts(newContracts)
    } catch (e) {
      console.log('ERROR LOADING CONTRACTS!!', e)
    }
  }
}
export const ContractsProvider = ({ children }: Props) => {
  const { library: providerOrSigner } = useWeb3React()

  const [contracts, setContracts] = useState<Map<string, Contract>>(new Map())
  useEffect(() => {
    loadContracts(providerOrSigner, setContracts)
  }, [providerOrSigner])

  return <ContractContext.Provider value={{contracts}}>{children}</ContractContext.Provider>
}
