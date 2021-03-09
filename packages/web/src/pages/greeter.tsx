import React, { useContext } from 'react'
import { Layout } from '../components/Page/Layout'
import { GreeterContractProvider, GreeterContract } from '../hooks/contracts/greeter.provider'

export function GreeterPage() {
  const greeter = useContext(GreeterContract)

  const sendGreeting = () => {}

  return (
    <GreeterContractProvider>
      <Layout>
        <button
          className="relative bg-blue-500 text-white p-6 rounded text-2xl font-bold overflow-visible"
          onClick={sendGreeting}
        >
          send greeting
        </button>
      </Layout>
    </GreeterContractProvider>
  )
}

export default GreeterPage
