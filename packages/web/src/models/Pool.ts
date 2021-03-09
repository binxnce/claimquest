import { Colleteral } from './Colleteral'

export interface Pool {
  poolId: string;
  description: string; // must be onchain, it should describe what it does and the code would reflect that description
  amountInPool: number;
  colleteralList: Array<Colleteral>
  getColleteralForUser: (account: string) => Array<Colleteral>
  getActiveColleteral: (account: string) => Array<Colleteral>
  // only return active deposited amount per user
  getAmountDeposited: (account: string) => number;
  // Get all historic amount deposited per user
  getAllAmountDeposited: (account: string) => number;
  // All the earnings by user
  getAmountEarnt: (account: string) => number;
  // All the loses by user
  getAmountLost: (account: string) => number;
}
