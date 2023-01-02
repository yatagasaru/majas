import React from 'react'
import {Container} from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Editor from '../../components/Editor'
import useWindowSize from '../../hooks/useWindowSize'
import MetaTags from '../../components/MetaTags'
import Header from '../../pageComponents/Notes/Header'

const New = () => {
  const {isMobile} = useWindowSize()

  return (
    <Layout>
      <MetaTags page="app-new" />
      <Container
        maxW="container.md"
        h="100%"
        overflow="hidden"
        pb={isMobile ? '7' : '0'}
      >
        <Header />
        <Editor />
      </Container>
    </Layout>
  )
}

export default New
