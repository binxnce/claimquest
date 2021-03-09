
export interface Colleteral {
   id: string;
   poolId: string;
   depositor: string; // store the depositer address
   deposited: number;
   lost: boolean; // will be set by todo scheduler daily, if the deadline is passed the amount is lost
   earned: number; // the amount plus the fees earned
   paidOut: boolean; // if the pool sent back the amount or not, when the schedule is running
   depositTime: number;
   paidOutTime: number;
}