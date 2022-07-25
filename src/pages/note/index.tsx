import React from 'react'
import type {NextPage} from 'next'

import Layout from '../../components/Layout'
import NoteList from '../../pageComponents/Dashboard/NoteList'
import RecentlyOpened from '../../pageComponents/Dashboard/RecentlyOpened'
import useWindowSize from '../../hooks/useWindowSize'

const NoteDashboard: NextPage = () => {
  const {isMobile, windowSize} = useWindowSize()

  console.log(windowSize)

  return (
    <Layout display={isMobile ? 'block' : 'flex'}>
      <RecentlyOpened />
      <NoteList />
    </Layout>
  )
}

export default NoteDashboard
