import React from 'react'
import {Box, Text} from '@chakra-ui/react'
import {useGlobalState} from '../../../state'

const CharCount = () => {
  const [currentNoteCharCount] = useGlobalState('currentNoteCharCount')

  return (
    <Box
      display="flex"
      alignItems="center"
      // pos="fixed"
      // bottom="1"
      h="30px"
      bgColor="primary.50"
      px="4"
      rounded="md"
    >
      <Text>
        {currentNoteCharCount} character{currentNoteCharCount > 1 ? 's' : ''}
      </Text>
    </Box>
  )
}

export default CharCount
