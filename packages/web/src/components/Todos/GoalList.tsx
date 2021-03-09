import React, { useState } from 'react'
import { TodoList } from './TodoList'
import { goals } from '../../mock/goals';

export function GoalList() {
  return (
    <div>
      <h2 className="text-6xl text-white text-center"> GOAL TRACKER</h2>
      <ul className="pt-8">
        {goals.map((goal) => {
          return (
            <li className="pb-12 grid grid-cols-1 divide-y-2 divide-pink-300" key={goal.id}>
              <div className="">
                <span className="text-xl text-gray-500 uppercase">GOAL: </span>
                <span className=" text-2xl">{goal.name}</span>
              </div>
              <div className="text-xl">{'\u00a0'}</div>
              <div>
                <div className="text-xl py-4 text-gray-500 uppercase">Steps to take</div>
                <div className="pl-24">
                  <TodoList tasks={goal.tasks}/>
                </div>
                <div className="py-4 flex justify-around">
                  <div>
                    <span className="text-xl text-gray-500 uppercase"> Deadline </span>
                    <span className="text-xl"> {new Date(goal.deadline).toDateString()} </span>
                  </div>
                  <div>
                    <span className="text-xl text-gray-500 upppercase"> Achieved </span>
                    <span className="text-xl"> {goal.achieved ? "yes": 'no'} </span>

                  </div>
                </div>
              </div>
              <div className="text-xl">{'\u00a0'}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
