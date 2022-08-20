import React from 'react'
import {Container} from '@chakra-ui/react'
import Layout from '../../components/Layout'
import BackButton from '../../pageComponents/Notes/BackButton'
import Footer from '../../pageComponents/Notes/Footer'
// import Editor from '../../pageComponents/Notes/Editor'
import Editor from '../../components/Editor'
import useWindowSize from '../../hooks/useWindowSize'
import MetaTags from '../../components/MetaTags'

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
        <BackButton />
        <Editor />
      </Container>
      <Footer />
    </Layout>
  )
}

export default New
