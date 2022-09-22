import React, {useEffect, useLayoutEffect, useRef} from 'react'
import {Box, Wrap, WrapItem} from '@chakra-ui/react'

import SimpleBar from 'simplebar-react'

import {HorizontalNoteCard} from '../../../components/NoteCard'
import useWindowSize from '../../../hooks/useWindowSize'
import DragBarIcon from './DragBarIcon'
import {useGlobalState} from '../../../state'
import {notMobile} from '../../../helpers/sx'

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
      sx={notMobile({
        transition: undefined,
        h: '100%',
        mt: '0',
        ml: '4'
      })}
      transition="margin-top .5s ease"
      w="100%"
      h="calc(100% - 60px)"
      mt={isNoteListExpanded ? '-16.375rem' : '4'}
      ml="0"
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
                  sx={notMobile({
                    h: '250px',
                    w: '300px',
                    noOfLines: 7
                  })}
                  height="134px"
                  width="100%"
                  noOfLines={2}
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
