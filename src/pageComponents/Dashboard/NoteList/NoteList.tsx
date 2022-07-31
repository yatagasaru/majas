import React, {useEffect, useLayoutEffect, useRef} from 'react'
import {Box, Wrap, WrapItem} from '@chakra-ui/react'

import SimpleBar from 'simplebar-react'

import {HorizontalNoteCard} from '../../../components/NoteCard'
import useWindowSize from '../../../hooks/useWindowSize'
import DragBarIcon from './DragBarIcon'
import {useGlobalState} from '../../../state'

const RecentlyOpened = () => {
  const {isMobile, windowSize} = useWindowSize()

  const [notes] = useGlobalState('notes')
  const [isNoteListExpanded] = useGlobalState('isNoteListExpanded')
  const [lastScrollY, setLastScrollY] = useGlobalState('lastScrollY')

  const scrollableNodeProps = useRef<any>()

  let lastChildMarginLeft = 'var(--wrap-spacing)'
  let lastChildMarginRight = 'var(--wrap-spacing)'

  if (windowSize.width && windowSize.width < 971) {
    lastChildMarginLeft = 'var(--wrap-spacing)'
    lastChildMarginRight = 'var(--wrap-spacing)'
  } else if (
    windowSize.width &&
    windowSize.width > 971 &&
    windowSize.width < 1280 &&
    notes.length % 2 > 0
  ) {
    lastChildMarginLeft = 'auto'
    lastChildMarginRight = 'calc(100% / 2)'
  } else if (windowSize.width && windowSize.width > 1279) {
    lastChildMarginLeft = 'var(--wrap-spacing)'
    lastChildMarginRight = 'auto'
  }

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
            mb={isMobile ? '4' : '0'} //quickfix. The parent container padding bottom not respected in mobile screen
            sx={{
              //to make the <Wrap> child centered but retain left axis alignment
              '& > ul > *:last-child': {
                ml: lastChildMarginLeft,
                mr: lastChildMarginRight
              }
            }}
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
