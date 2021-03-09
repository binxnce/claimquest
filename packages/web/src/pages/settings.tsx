import React from 'react'
import { Layout } from '../components/Page/Layout'
import { GoalList } from '../components/Todos/GoalList'

export function SettingsPage() {
  return (
    <Layout>
      <GoalList/>
    </Layout>
  )
}

export default SettingsPage;
