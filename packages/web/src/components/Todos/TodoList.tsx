import React from 'react'
import { Checkbox } from '../common'
import { formatEther } from '@ethersproject/units'
import { TodoTask } from '../../models/Todo'

interface Props {
  tasks: TodoTask
}
export function TodoList({tasks}) {
  return (
    <div>
      <ul>
        {tasks.map((todo) => {
          const now = new Date().getMilliseconds()
          // 1. draft mode no startDate and endDate, so no deposit selected, can edit everything
          // 2. after deposit but endDate not reached can edit name, description, and enddate, and done
          // 2.a) before half an hour of schedule date or similar interval, editing endDate + done is not possible
          // 3, after deadline passed, only additionalNote can be edited (this is only editable after deposit passed)
          let disabled = false
          if (todo.startDate) {
            const depositMilisecond = new Date(todo.startDate).getMilliseconds()
            disabled = depositMilisecond > now
          }

          return (
            <li className="py-1" key={todo.id}>
              <Checkbox isChecked={todo.done} text={todo.name} disabled={disabled}></Checkbox>
              <div className="pl-8 flex">
                <label className="text-gray-500 w-32">Task: </label>
                <span> {todo.description} </span>
              </div>
              <div className="pl-8 flex">
                <label className="text-gray-500 w-32">Deadline: </label>
                <span> {new Date(todo.endDate).toDateString()} </span>
              </div>
              <div className="pl-8 flex">
                <label className="text-gray-500 w-32">Deposit date: </label>
                <span> {new Date(todo.startDate).toDateString()} </span>
              </div>
              <div className="pl-8 flex">
                <label className="text-gray-500 w-32">Deposit amount: </label>
                <span> Ξ{formatEther(todo.depositAmount ?? 0)}</span>
              </div>
              <div className="pl-8 flex">
                <label className="text-gray-500 w-32">Finishing Line: </label>
                <span> {todo.finishLine} </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
