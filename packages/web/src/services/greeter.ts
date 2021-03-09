import { Web3Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'

async function assertArgs(provider: Web3Provider, contracts: Map<string, Contract>, contractName: 'Greeter') {
  if (!provider) return Promise.reject('No provider provided!')
  if (contracts.size < 1) return Promise.reject('You have no contract')
  const contract = contracts.get(contractName)
  if (!contract) return Promise.reject('No contract named greeter')
  return Promise.resolve(contract)
}

export async function setGreeting(provider: Web3Provider, contracts: Map<string, Contract>, greeting: string) {
  return assertArgs(provider, contracts, 'Greeter').then(contract => {
    return contract['setGreeting']('greeting')
      .then(result => {
        console.log('result', result)
      })
      .catch(e => {
        console.log(e)
      })
  })
}

export async function getGreeting(provider: Web3Provider, contracts: Map<string, Contract>) {
  return assertArgs(provider, contracts, 'Greeter').then(contract => {
    return contract['setGreeting']('greeting')
      .then(result => {
        console.log('result', result)
      })
      .catch(e => {
        console.log(e)
      })
  })
}
