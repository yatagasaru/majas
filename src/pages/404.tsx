import React from 'react'
import {Box, Heading, Link} from '@chakra-ui/react'
import {NextPage} from 'next'
import NextLink from 'next/link'
import Footer from '../components/Footer'
import {HEADER_HEIGHT} from '../components/Header'
import {GeneralLayout} from '../components/Layout'

const NotFoundPage: NextPage = () => {
  return (
    <Box
      as="main"
      h={`calc(100vh - ${HEADER_HEIGHT}px)`}
      w="100%"
      display="flex"
      flexDir="column"
    >
      <GeneralLayout centerContent my="auto" color="primary.300">
        <Heading>404</Heading>
        <Heading>Page not found</Heading>
        <NextLink href="/" passHref>
          <Link>Take me home</Link>
        </NextLink>
      </GeneralLayout>
      <Footer />
    </Box>
  )
}

export default NotFoundPage
