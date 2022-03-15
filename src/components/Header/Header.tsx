import React from 'react'
import {Box, Container, Heading} from '@chakra-ui/react'
import NewButton from './NewButton'

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
        <NewButton />
      </Container>
    </Box>
  )
}

export default Header
