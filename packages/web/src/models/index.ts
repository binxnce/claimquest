import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { Web3Provider } from '@ethersproject/providers'

// Change WEB3Provider to ethers if needed
export type Web3WrapperProvider = Web3ReactContextInterface<Web3Provider>;