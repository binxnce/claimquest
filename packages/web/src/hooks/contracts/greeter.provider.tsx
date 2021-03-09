import React, { createContext, useMemo, useEffect, ReactNode, Dispatch, useContext, useReducer } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ContractContext } from './contracts.provider'
import { GreeterService } from '../../services'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { useInterval } from '../helpers'

interface Props {
  children: ReactNode
}
interface IGreeterState {
  greeting: string
  error: string
}
type IGreeterAction =
  | {
      type: 'SET_GREETING'
      payload: {
        greeting: string
      }
    }
  | {
      type: 'NETWORK_ERROR'
      payload: {
        error: string | Error
      }
    }
const stateInitialValue: IGreeterState = {
  greeting: '',
  error: ''
}
const actionsIntialValue = {
  setGreeting: (name: string) => {}
}

export const GreeterContractState = createContext(stateInitialValue)
export const GreeterContractActions = createContext(actionsIntialValue)

const loadGreeting = async (
  providerOrSigner: Web3Provider,
  contracts: Map<string, Contract>,
  dispatch: Dispatch<IGreeterAction>
) => {
  return await GreeterService.getGreeting(providerOrSigner, contracts)
    .then(result => {
      return dispatch({ type: 'SET_GREETING', payload: { greeting: result } })
    })
    .catch(error => {
      console.log(error)
    })
}

export const GreeterContractProvider = ({ children }: Props) => {
  const { library: providerOrSigner } = useWeb3React()
  const { contracts } = useContext(ContractContext)

  // Greeter state
  const [state, dispatch] = useReducer(
    (state: IGreeterState, action: IGreeterAction) => {
      switch (action.type) {
        default:
          return state
      }
    },
    {
      greeting: '',
      error: ''
    }
  )
  // Initial data loading
  useEffect(() => {
    loadGreeting(providerOrSigner, contracts, dispatch)
  }, [providerOrSigner, contracts])

  // Polled data based on delay
  useInterval(() => {
    if (providerOrSigner && contracts.size > 0) {
      loadGreeting(providerOrSigner, contracts, dispatch)
    }
  }, 1337)

  // Actions to components
  const actions = useMemo(() => {
    return {
      setGreeting: (greeting: string) => {
        GreeterService.setGreeting(providerOrSigner, contracts, greeting)
          .then(() => {
            if (state.greeting !== greeting) {
              dispatch({ type: 'SET_GREETING', payload: { greeting } })
            }
          })
          .catch(error => {
            dispatch({
              type: 'NETWORK_ERROR',
              payload: { error }
            })
          })
      }
    }
  }, [])

  return (
    <GreeterContractState.Provider value={state}>
      <GreeterContractActions.Provider value={actions}>{children}</GreeterContractActions.Provider>
    </GreeterContractState.Provider>
  )
}
