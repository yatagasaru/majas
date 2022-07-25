import React from 'react'
import {Box, Text, Stack} from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'

import {HorizontalNoteCard} from '../../../components/NoteCard'
import useNote from '../../../hooks/useNote'
import useWindowSize from '../../../hooks/useWindowSize'

const RecentlyOpened = () => {
  const {isMobile} = useWindowSize()
  const {recentlyOpenedNotes} = useNote()

  return (
    <Box w={isMobile ? '100%' : '300px'} flexShrink={0}>
      <Box
        w="100%"
        h="100%"
        p="4"
        pb={isMobile ? '1' : '4'}
        bgColor="primary.50"
        rounded="3xl"
        overflow="hidden"
      >
        <Text textAlign="center" color="primary.800">
          Recently Opened
        </Text>
        <SimpleBar style={{height: '100%'}}>
          <Stack
            direction={isMobile ? 'row' : 'column'}
            overflow="scroll"
            alignItems="stretch"
            h="100%"
            spacing="4"
            pb="6"
            pt="2"
          >
            {recentlyOpenedNotes.map(note => (
              <HorizontalNoteCard
                width={isMobile ? '85%' : '100%'}
                key={note.id}
                note={note}
              />
            ))}
          </Stack>
        </SimpleBar>
      </Box>
    </Box>
  )
}

export default RecentlyOpened
