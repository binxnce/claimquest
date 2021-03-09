import React, { useState, ReactNode } from 'react'

interface Props {
  text: string
  isChecked: boolean
  disabled: boolean
}

export function Checkbox({ text, isChecked, disabled }: Props) {
  const [checked, setChecked] = useState(isChecked)
  return (
    <label className="flex justify-start items-start">
      <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
        <input
          type="checkbox"
          className="opacity-0 absolute"
          value={checked}
          onChange={() => {
            setChecked(!checked)
          }}
          disabled={disabled}
        />
        <svg
          className={`fill-current ${checked ? 'block' : 'hidden'} w-4 h-4 text-green-500 pointer-events-none`}
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
      <div className="select-none">{text}</div>
    </label>
  )
}
