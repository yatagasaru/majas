import React from 'react'
import {Container} from '@chakra-ui/react'
import Layout from '../../components/Layout'
import BackButton from '../../pageComponents/Notes/BackButton'
import Footer from '../../pageComponents/Notes/Footer'
import Editor from '../../pageComponents/Notes/Editor'

const New = () => {
  return (
    <Layout>
      <Container maxW="container.md" h="100%" overflow="hidden">
        <BackButton />
        <Editor />
      </Container>
      <Footer />
    </Layout>
  )
}

export default New
