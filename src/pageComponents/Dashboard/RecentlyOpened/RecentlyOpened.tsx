import React from 'react'
import {Box, Text, VStack} from '@chakra-ui/react'
import {VerticalNoteCard} from '../../../components/NoteCard'
import useNote from '../../../hooks/useNote'

const RecentlyOpened = () => {
  const {recentlyOpenedNotes} = useNote()

  return (
    <Box w="300px">
      <Box w="300px" h="100%" p="4" bgColor="primary.50" rounded="3xl">
        <Text textAlign="center" color="primary.800">
          Recently Opened
        </Text>
        <VStack alignItems="stretch" h="100%" spacing="4" pb="6" pt="2">
          {recentlyOpenedNotes.map(note => (
            <VerticalNoteCard key={note.id} note={note} />
          ))}
        </VStack>
      </Box>
    </Box>
  )
}

export default RecentlyOpened
