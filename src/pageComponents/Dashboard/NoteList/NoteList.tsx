import React, {useEffect, useLayoutEffect, useRef} from 'react'
import {Box, Wrap, WrapItem} from '@chakra-ui/react'
import {createGlobalState} from 'react-hooks-global-state'

import SimpleBar from 'simplebar-react'

import {HorizontalNoteCard} from '../../../components/NoteCard'
import useNote from '../../../hooks/useNote'

const {useGlobalState} = createGlobalState({lastScrollY: 0})

const RecentlyOpened = () => {
  const {notes} = useNote()

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
    <Box w="100%" ml="4">
      <Box w="100%" h="100%" p="4" bgColor="primary.50" rounded="3xl">
        <SimpleBar
          style={{height: '100%'}}
          onScroll={e => e}
          scrollableNodeProps={{ref: scrollableNodeProps}}
        >
          <Wrap overflow="hidden">
            {notes.map(note => (
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
