import React from 'react'
import {Box, Wrap, WrapItem} from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import {HorizontalNoteCard} from '../../../components/NoteCard'
import useNote from '../../../hooks/useNote'

const RecentlyOpened = () => {
  const {getNotes} = useNote()

  return (
    <Box w="100%" ml="4">
      <Box w="100%" h="100%" p="4" bgColor="primary.50" rounded="3xl">
        <SimpleBar style={{height: '100%'}}>
          <Wrap overflow="hidden">
            {getNotes().map(note => (
              <WrapItem key={note.id}>
                <HorizontalNoteCard note={note} />
              </WrapItem>
            ))}
          </Wrap>
        </SimpleBar>
      </Box>
    </Box>
  )
}

export default RecentlyOpened
