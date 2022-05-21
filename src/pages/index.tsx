import React from 'react'
import type {NextPage} from 'next'

import Layout from '../components/Layout'
import NoteList from '../pageComponents/Dashboard/NoteList'
import RecentlyOpened from '../pageComponents/Dashboard/RecentlyOpened'

const Home: NextPage = () => {
  return (
    <Layout display="flex">
      <RecentlyOpened />
      <NoteList />
    </Layout>
  )
}

export default Home
