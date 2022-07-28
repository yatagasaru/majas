import React, {useEffect, useLayoutEffect, useRef} from 'react'
import {Box, Wrap, WrapItem} from '@chakra-ui/react'
import {createGlobalState} from 'react-hooks-global-state'

import SimpleBar from 'simplebar-react'

import {HorizontalNoteCard} from '../../../components/NoteCard'
import useNote from '../../../hooks/useNote'
import useWindowSize from '../../../hooks/useWindowSize'
import DragBarIcon from './DragBarIcon'
import useExpandingNoteList from '../../../hooks/useExpandingNoteList'

const {useGlobalState} = createGlobalState({lastScrollY: 0})

const RecentlyOpened = () => {
  const {isMobile} = useWindowSize()
  const {notes} = useNote()
  const {isNoteListExpanded} = useExpandingNoteList()

  const scrollableNodeProps = useRef<any>()

  const [lastScrollY, setLastScrollY] = useGlobalState('lastScrollY')

  useEffect(() => {
    const simpleBarRef = scrollableNodeProps.current

    if (lastScrollY) {
      window.requestAnimationFrame(() => {
        simpleBarRef.scrollTop = lastScrollY
      })
    }
  }, [])

  useLayoutEffect(() => {
    return () => {
      setLastScrollY(scrollableNodeProps.current.scrollTop)
    }
  }, [])

  return (
    <Box
      transition={isMobile ? 'margin-top .5s ease' : undefined}
      w="100%"
      h={isMobile ? 'calc(100% - 60px)' : '100%'}
      mt={isMobile ? (isNoteListExpanded ? '-16.375rem' : '4') : '0'}
      ml={isMobile ? '0' : '4'}
    >
      <Box w="100%" h="100%" p="4" pb="5" bgColor="primary.50" rounded="3xl">
        <DragBarIcon />
        <SimpleBar
          style={{height: '100%'}}
          scrollableNodeProps={{ref: scrollableNodeProps}}
        >
          <Wrap
            overflow="hidden"
            justify="center"
            sx={isMobile ? {'& > *:last-child': {mb: '4'}} : undefined} //quickfix. The parent container padding bottom not respected in mobile screen
          >
            {notes.map(note => (
              <WrapItem key={note.id} flexGrow={isMobile ? 1 : 0}>
                <HorizontalNoteCard
                  height={isMobile ? '134px' : '250px'}
                  width={isMobile ? '100%' : '300px'}
                  noOfLines={isMobile ? 2 : 7}
                  textHeight={isMobile ? '50px' : '170px'}
                  note={note}
                />
              </WrapItem>
            ))}
          </Wrap>
        </SimpleBar>
      </Box>
    </Box>
  )
}

export default RecentlyOpened
