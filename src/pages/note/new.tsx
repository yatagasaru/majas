import React from 'react'
import {Container} from '@chakra-ui/react'
import Layout from '../../components/Layout'
import BackButton from '../../pageComponents/Notes/BackButton'
import Footer from '../../pageComponents/Notes/Footer'
import Editor from '../../pageComponents/Notes/Editor'
import useWindowSize from '../../hooks/useWindowSize'

const New = () => {
  const {isMobile} = useWindowSize()

  return (
    <Layout>
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
