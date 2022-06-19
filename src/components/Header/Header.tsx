import React from 'react'
import {Box, Container, Heading, HStack} from '@chakra-ui/react'
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
      d="flex"
      alignItems="center"
    >
      <Container
        maxW="container.xl"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading as="h1" size="md" color="primary.600">
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
