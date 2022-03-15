import React from 'react'
import {Container} from '@chakra-ui/react'
import TextBox from '../pageComponents/Notes/TextBox'
import Layout from '../components/Layout'
import BackButton from '../pageComponents/Notes/BackButton'
import Footer from '../pageComponents/Notes/Footer'

const New = () => {
  return (
    <Layout>
      <Container maxW="container.md" h="100%" overflow="hidden">
        <BackButton />
        <TextBox />
      </Container>
      <Footer />
    </Layout>
  )
}

export default New
