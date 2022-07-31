import React from 'react'
import type {NextPage} from 'next'

import Layout from '../../components/Layout'
import NoteList from '../../pageComponents/Dashboard/NoteList'
import RecentlyOpened from '../../pageComponents/Dashboard/RecentlyOpened'
import useWindowSize from '../../hooks/useWindowSize'
import {HEADER_HEIGHT} from '../../components/Header'

const NoteDashboard: NextPage = () => {
  const {isMobile} = useWindowSize()

  return (
    <Layout
      h={`calc(100vh - ${HEADER_HEIGHT}px)`}
      display="flex"
      flexDir={isMobile ? 'column' : 'row'}
    >
      <RecentlyOpened />
      <NoteList />
    </Layout>
  )
}

export default NoteDashboard
