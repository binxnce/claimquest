import React, { useState } from 'react'
import Link from 'next/link'
import { TransactionIcon } from '../common/TransactionIcon'

function TransactionNotif({ href }) {
  return (
    <Link href={href}>
      <a className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
        <img
          className="h-8 w-8 rounded-full object-cover mx-1"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />
        <p className="text-gray-600 text-sm mx-2">
          <span className="font-bold">Sara Salah</span> replied on the{' '}
          <span className="font-bold text-blue-500">Upload Image</span> artical . 2m
        </p>
      </a>
    </Link>
  )
}

export function NotificationDropdown() {
  const [open, toggleDropdown] = useState(false)
  const transactions = []
  return (
    <div className="flex justify-center">
      <div className="relative">
        <button
          onClick={() => {
            toggleDropdown(!open)
          }}
          className="relative z-10 block rounded-md bg-white p-2 focus:outline-none"
        >
         <TransactionIcon></TransactionIcon>
        </button>
        {open && (
          <>
            <div
              onClick={() => {
                toggleDropdown(!open)
              }}
              className="fixed inset-0 h-full w-full z-10"
            ></div>
            <div
              className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
              style={{ width: '20rem' }}
            >
              {transactions && transactions.length > 0 ? (
                <>
                  <div className="py-2">
                    {transactions.map(({ href }) => {
                      return <TransactionNotif href={href} />
                    })}
                  </div>
                  <a href="#" className="block bg-indigo-800 text-white text-center font-bold py-2">
                    See all notifications
                  </a>
                </>
              ) : (
                <div className="block text-yellow-500 text-white text-center font-bold my-4">
                  {' '}
                  You have no transactions as so far{' '}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
