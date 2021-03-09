const until = '2021-06-30'
const from = '2020-05-22'

let currentDate = new Date(from)
const maxDate = new Date(until)

function toDateString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()<9? '0': ''}${date.getMonth() + 1}-${date.getDate()<10? '0': ''}${date.getDate()}`
}
export const calendarContributions: Record<string, number> = new Array(500).fill(0).reduce((acc, { date, color }) => {
  if (currentDate.getTime() <= maxDate.getTime()) {
    const dateString = toDateString(currentDate)
    currentDate.setDate(currentDate.getDate() + 1)
    acc[dateString] =  Math.floor((Math.random() * 10) + 1); 
  }
  return acc
}, {})
