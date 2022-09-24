import React from 'react'
import {Box, Text, Stack} from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'

import {HorizontalNoteCard} from '../../../components/NoteCard'
import useWindowSize from '../../../hooks/useWindowSize'
import {useGlobalState} from '../../../state'
import {notMobile} from '../../../helpers/sx'

const RecentlyOpened = () => {
  const {isMobile} = useWindowSize()

  const [recentlyOpenedNotes] = useGlobalState('recentlyOpenedNotes')
  const [isNoteListExpanded, setIsNoteListExpanded] =
    useGlobalState('isNoteListExpanded')

  return (
    <Box
      sx={notMobile({
        h: '100%',
        w: '300px'
      })}
      h="326px"
      w="100%"
      flexShrink={0}
      onClick={() => {
        isMobile && setIsNoteListExpanded(false)
      }}
    >
      <Box
        sx={notMobile({
          pb: '4'
        })}
        transition=".5s ease"
        w="100%"
        h={isNoteListExpanded ? '60px' : '100%'}
        p="4"
        pb="1"
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
                sx={notMobile({
                  width: '100%'
                })}
                width="85%"
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
