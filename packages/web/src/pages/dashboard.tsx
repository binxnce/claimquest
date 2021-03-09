import React from 'react'
import { Layout } from '../components/Page/Layout'
import { GoalList } from '../components/Todos/GoalList'

export function DashboardPage() {
  return (
    <Layout>
      <GoalList/>
    </Layout>
  )
}

export default DashboardPage;
