import React, {useEffect} from 'react'
import {Box} from '@chakra-ui/react'
import useWindowSize from '../../../hooks/useWindowSize'
import {useGlobalState} from '../../../state'
import {notMobile} from '../../../helpers/sx'

const DragBarIcon = () => {
  const {isMobile} = useWindowSize()
  const [isNoteListExpanded, setIsNoteListExpanded] =
    useGlobalState('isNoteListExpanded')

  useEffect(() => {
    if (!isMobile) setIsNoteListExpanded(false)
  }, [isMobile])

  return (
    <Box
      w="100%"
      sx={notMobile({
        display: 'none'
      })}
      display="flex"
      pb="4"
      justifyContent="center"
      cursor="pointer"
      onClick={() => setIsNoteListExpanded(!isNoteListExpanded)}
    >
      <Box h="5px" w="100px" bgColor="primary.200" rounded="full" />
    </Box>
  )
}

export default DragBarIcon
