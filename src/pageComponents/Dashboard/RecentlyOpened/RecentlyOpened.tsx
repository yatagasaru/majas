import React from 'react'
import {Box, Text, Stack} from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'

import {HorizontalNoteCard} from '../../../components/NoteCard'
import useNote from '../../../hooks/useNote'
import useWindowSize from '../../../hooks/useWindowSize'
import useExpandingNoteList from '../../../hooks/useExpandingNoteList'

const RecentlyOpened = () => {
  const {isMobile} = useWindowSize()
  const {recentlyOpenedNotes} = useNote()
  const {isNoteListExpanded} = useExpandingNoteList()

  return (
    <Box
      h={isMobile ? '326px' : '100%'}
      w={isMobile ? '100%' : '300px'}
      flexShrink={0}
    >
      <Box
        transition=".5s ease"
        w="100%"
        h={isNoteListExpanded ? '60px' : '100%'}
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
                textHeight="170px"
              />
            ))}
          </Stack>
        </SimpleBar>
      </Box>
    </Box>
  )
}

export default RecentlyOpened
