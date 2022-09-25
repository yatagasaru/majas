import React from 'react'
import type {NextPage} from 'next'

import Layout from '../../components/Layout'
import NoteList from '../../pageComponents/Dashboard/NoteList'
import RecentlyOpened from '../../pageComponents/Dashboard/RecentlyOpened'
import {HEADER_HEIGHT} from '../../components/Header'
import MetaTags from '../../components/MetaTags'
import {notMobile} from '../../helpers/sx'

const NoteDashboard: NextPage = () => {
  return (
    <Layout
      h={`calc(100vh - ${HEADER_HEIGHT}px)`}
      display="flex"
      sx={notMobile({flexDir: 'row'})}
      flexDir="column"
    >
      <MetaTags page="app-dashboard" />
      <RecentlyOpened />
      <NoteList />
    </Layout>
  )
}

export default NoteDashboard
