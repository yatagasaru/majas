import React from 'react'
import type {NextPage} from 'next'
import dynamic from 'next/dynamic'

import Layout from '../components/Layout'
// import RecentlyOpened from '../pageComponents/Dashboard/RecentlyOpened'

const RecentlyOpened = dynamic(
  () => import('../pageComponents/Dashboard/RecentlyOpened'),
  {
    ssr: false
  }
)
const NoteList = dynamic(() => import('../pageComponents/Dashboard/NoteList'), {
  ssr: false
})

const Home: NextPage = () => {
  return (
    <Layout display="flex">
      <RecentlyOpened />
      <NoteList />
    </Layout>
  )
}

export default Home
