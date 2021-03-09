import React from 'react'

export function Content({ children }) {
  return <div className="flex-auto overflow-x-auto container mx-auto sm:px-4 pt-6 pb-8">{children}</div>
}
