import { Greeter } from '../../../hardhat/types'


export async function setGreeting(contract: Greeter, greeting: string) {
  return contract.setGreeting(greeting)
}

export async function getGreeting(contract: Greeter) {
  return contract.greet()
}
