import Head from 'next/head'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../services/wallet-config'
import { ContractsProvider } from '../hooks/contracts/contracts.provider'
import '../styles/globals.css'

export default function Root({ Component }) {
  return (
    <>
      <Head>
        <title>{process.env.APP_NAME}</title>
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ContractsProvider>
          <Component />
        </ContractsProvider>
      </Web3ReactProvider>
    </>
  )
}
