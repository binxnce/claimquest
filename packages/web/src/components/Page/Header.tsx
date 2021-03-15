import React, { useState } from 'react'
import { Account, AccountAvatar, DepositBalance, WalletBalance } from '../AccountDetails'
import Link from 'next/link'
import { NotificationDropdown } from './NotificationDropdown'

export function Header() {
  const [hamburgerOpen, sethamburgerOpen] = useState(false)
  return (
    <div className="flex-none">
      <div className="bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center md:justify-between py-4">
            <div
              className="w-1/4 md:hidden"
              onClick={() => {
                sethamburgerOpen(!hamburgerOpen)
              }}
            >
              <svg className="fill-current text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z" />
              </svg>
            </div>
            <div className="w-1/2 md:w-auto text-center text-white text-2xl font-medium">{process.env.APP_NAME}</div>
            <div className="w-1/4 w-auto flex text-right justify-end">
              <div className="flex justify-center pr-6 hidden md:block" style={{ height: '36px' }}>
                <NotificationDropdown />
              </div>
              <div className="flex justify-center">
                <AccountAvatar />
              </div>
              <div className="flex items-center ml-2 ">
                <span className="text-white text-sm mr-1 hidden md:block">
                  <Account />
                </span>
                <div>
                  <svg
                    className="fill-current text-white h-4 w-4 block opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${!hamburgerOpen ? "hidden": ""} bg-black md:block md:bg-purple-300 md:border-b"`}>
        <div className="container mx-auto px-4">
          <div className="md:flex">
            <div className="flex -mb-px mr-8">
              <Link href="/todos">
                <a className="no-underline text-white opacity-50 md:text-black md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark">
                  <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8 7h10V5l4 3.5-4 3.5v-2H8V7zm-6 8.5L6 12v2h10v3H6v2l-4-3.5z" fillRule="nonzero" />
                  </svg>
                  Todos and Goals
                </a>
              </Link>
            </div>
            <div className="flex -mb-px mr-8">
              <Link href="/dashboard">
                <a
                  href="#"
                  className="no-underline text-white md:text-black flex items-center py-4 border-b border-blue-dark"
                >
                  <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M3.889 3h6.222a.9.9 0 0 1 .889.91v8.18a.9.9 0 0 1-.889.91H3.89A.9.9 0 0 1 3 12.09V3.91A.9.9 0 0 1 3.889 3zM3.889 15h6.222c.491 0 .889.384.889.857v4.286c0 .473-.398.857-.889.857H3.89C3.398 21 3 20.616 3 20.143v-4.286c0-.473.398-.857.889-.857zM13.889 11h6.222a.9.9 0 0 1 .889.91v8.18a.9.9 0 0 1-.889.91H13.89a.9.9 0 0 1-.889-.91v-8.18a.9.9 0 0 1 .889-.91zM13.889 3h6.222c.491 0 .889.384.889.857v4.286c0 .473-.398.857-.889.857H13.89C13.398 9 13 8.616 13 8.143V3.857c0-.473.398-.857.889-.857z"
                    />
                  </svg>
                  Dashboard
                </a>
              </Link>
            </div>

            <div className="flex -mb-px mr-8">
              <Link href="/pools">
                <a className="no-underline text-white opacity-50 md:text-black md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark">
                  <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M18 8H5.5v-.5l11-.88v.88H18V6c0-1.1-.891-1.872-1.979-1.717L5.98 5.717C4.891 5.873 4 6.9 4 8v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm-1.5 7.006a1.5 1.5 0 1 1 .001-3.001 1.5 1.5 0 0 1-.001 3.001z"
                      fillRule="nonzero"
                    />
                  </svg>
                  Pools
                </a>
              </Link>
            </div>
            <div className="flex -mb-px">
              <Link href="/settings">
                <a className="no-underline text-white opacity-50 md:text-black md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark">
                  <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M18.783 12c0-1.049.646-1.875 1.617-2.443a8.932 8.932 0 0 0-.692-1.672c-1.089.285-1.97-.141-2.711-.883-.741-.74-.968-1.621-.683-2.711a8.732 8.732 0 0 0-1.672-.691c-.568.97-1.595 1.615-2.642 1.615-1.048 0-2.074-.645-2.643-1.615-.58.172-1.14.403-1.671.691.285 1.09.059 1.971-.684 2.711-.74.742-1.621 1.168-2.711.883A8.797 8.797 0 0 0 3.6 9.557c.97.568 1.615 1.394 1.615 2.443 0 1.047-.645 2.074-1.615 2.643.173.58.404 1.14.691 1.672 1.09-.285 1.971-.059 2.711.682.741.742.969 1.623.684 2.711.532.288 1.092.52 1.672.693.568-.973 1.595-1.617 2.643-1.617 1.047 0 2.074.645 2.643 1.617a8.963 8.963 0 0 0 1.672-.693c-.285-1.088-.059-1.969.683-2.711.741-.74 1.622-1.166 2.711-.883.287-.532.52-1.092.692-1.672-.973-.569-1.619-1.395-1.619-2.442zM12 15.652a3.653 3.653 0 1 1 0-7.306 3.653 3.653 0 0 1 0 7.306z"
                      fillRule="nonzero"
                    />
                  </svg>
                  Settings
                </a>
              </Link>
            </div>
            <div className="hidden md:flex -mb-px justify-end flex-auto">
              <div className="flex items-center py-4 -mb-px mr-8">
                <WalletBalance />
              </div>
              <div className="flex items-center py-4 -mb-px mr-8">
                <DepositBalance />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
