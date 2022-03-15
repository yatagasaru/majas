import React from 'react'
import {Box, Text} from '@chakra-ui/react'
import useNote from '../../../hooks/useNote'

const Footer = () => {
  const {charCount} = useNote()

  return (
    <Box
      d="flex"
      alignItems="center"
      pos="fixed"
      bottom="1"
      h="30px"
      bgColor="primary.50"
      px="4"
      rounded="md"
    >
      <Text>
        {charCount} character{charCount > 1 ? 's' : ''}
      </Text>
    </Box>
  )
}

export default Footer
