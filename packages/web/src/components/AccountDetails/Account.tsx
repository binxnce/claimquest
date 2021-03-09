
import { useWeb3React } from '@web3-react/core'

export function Account() {
    const { account, active, error } = useWeb3React()
    return (
      <>
        <span>
          {account === null
            ? '-'
            : account
            ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
            : ''}
        </span>
        <span>{active ? ' 🟢' : error ? ' 🔴' : ' 🟠'}</span>

      </>
    )
  }
  