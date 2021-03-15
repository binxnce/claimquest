import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Content } from './Content'
import { useEagerConnect, useInactiveListener } from '../../hooks/wallet-hooks'

export function Layout({ children }) {
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager)
  return (
    <div className="flex items-center justify-center bg-white-200">
      <div className="font-sans bg-grey-lighter flex flex-col min-h-screen w-full">
        <Header></Header>
        <Content>{children}</Content>
        <Footer />
      </div>
    </div>
  )
}
