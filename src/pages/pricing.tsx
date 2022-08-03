import React from 'react'
import {NextPage} from 'next/types'
import {
  SimpleGrid,
  Heading,
  Box,
  UnorderedList,
  ListItem,
  Text
} from '@chakra-ui/react'

import {GeneralLayout} from '../components/Layout'
import Footer from '../components/Footer'
import {HEADER_HEIGHT} from '../components/Header'
import MetaTags from '../components/MetaTags'

const PricingCard = ({planTitle}: {planTitle: string}) => {
  return (
    <Box bgColor="primary.50" rounded="xl" w="300px" p="4">
      <Heading as="h2" size="md">
        {planTitle}
      </Heading>
      <Heading textAlign="center" as="h3" mt="4" fontWeight="black">
        Free
      </Heading>
      <UnorderedList mt="4">
        <ListItem>Full text search</ListItem>
        <ListItem>Backup and restore</ListItem>
        <ListItem>Fast and simple</ListItem>
        <ListItem>No sign in required</ListItem>
        <ListItem>No credit card required</ListItem>
      </UnorderedList>
    </Box>
  )
}

const Pricing: NextPage = () => {
  return (
    <Box
      as="main"
      minH={`calc(100vh - ${HEADER_HEIGHT}px)`}
      display="flex"
      flexDir="column"
    >
      <MetaTags page="pricing" />
      <GeneralLayout as="section" centerContent mb="auto">
        <SimpleGrid columns={{base: 1, lg: 3}} spacing="40px" mt="12">
          <PricingCard planTitle="Personal" />
          <PricingCard planTitle="Household" />
          <PricingCard planTitle="Planet Scale" />
        </SimpleGrid>

        <Text textAlign="center" fontSize="18px" fontWeight="bold" mt="24">
          Absolutely.
        </Text>
        <Heading
          p="0"
          m="0"
          textAlign="center"
          lineHeight="1"
          as="h1"
          fontSize={{base: '7xl', mds: '8xl'}}
          fontWeight="black"
        >
          Majas is completely free
        </Heading>
        <Text
          textAlign="center"
          fontSize="18px"
          fontWeight="bold"
          mt={{base: 2, md: 8}}
        >
          Forever
        </Text>
        <Text mt="12">
          Instead, you can buy me a cup of coffee or boba if you like
        </Text>
      </GeneralLayout>
      <Footer />
    </Box>
  )
}

export default Pricing
