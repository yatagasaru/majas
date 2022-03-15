import React from 'react'
import {Box, Spinner, Text} from '@chakra-ui/react'

const AuthLoading = () => {
  return (
    <Box
      w="100%"
      h="100vh"
      d="flex"
      bgColor="primary.50"
      pos="absolute"
      top="0"
    >
      <Box m="auto" d="flex" flexDir="column" alignItems="center">
        <Spinner size="xl" colorScheme="primary" />
        <Text color="primary.800">M A J A S</Text>
      </Box>
    </Box>
  )
}

export default AuthLoading
