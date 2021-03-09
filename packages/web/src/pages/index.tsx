// TODO figure out how referencing todosPage and not copying doesn't end up in full reload on dev server
import React from 'react'
import { Layout } from '../components/Page/Layout'
import { GoalList } from '../components/Todos/GoalList'
import { GitHubCalendar } from '../components/GithubCalendar'
import { calendarContributions } from '../mock/calendar'

const values = calendarContributions
const until = '2021-06-30'
var panelColors = ['#F5F3FF', '#C4B5FD', '#A78BFA', '#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95']
export function TodoPage() {
  return (
    <Layout>
      <div className="flex justify-center items-center pb-8">
        <GitHubCalendar values={values} until={until} panelColors={panelColors} />
      </div>
      <GoalList />
    </Layout>
  )
}

export default TodoPage
