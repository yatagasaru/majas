import React from 'react'
import {Box, Container, Heading, HStack} from '@chakra-ui/react'
import NextLink from 'next/link'

import NewButton from './NewButton'
import Search from '../Search'
import MoreButton from './MoreButton'

export const HEADER_HEIGHT = 72

const Header = () => {
  return (
    <Box
      as="header"
      h={HEADER_HEIGHT + 'px'}
      w="100%"
      display="flex"
      alignItems="center"
      pos="relative"
      zIndex={2}
    >
      <Container
        maxW="container.xl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading
          href="/"
          as={NextLink}
          size="md"
          color="primary.600"
          display={{base: 'none', mds: 'block'}}
        >
          M A J A S
        </Heading>
        <Search />
        <HStack display="flex">
          <NewButton />
          <MoreButton />
        </HStack>
      </Container>
    </Box>
  )
}

export default Header
