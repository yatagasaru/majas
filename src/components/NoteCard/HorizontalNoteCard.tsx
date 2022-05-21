import React from 'react'
import {Box, Text} from '@chakra-ui/react'
import NextLink from 'next/link'

import {Note} from '../../hooks/useStorage'
import dayjs from '../../helpers/dayjs'
// import MoreHorizontal from '../../assets/svgs/MoreHorizontal'
import NoteOption from '../NoteOption'

const HorizontalNoteCard = ({note}: {note: Note}) => {
  return (
    <Box
      pos="relative"
      h="250px"
      w="300px"
      bgColor="whiteAlpha.600"
      p="4"
      rounded="3xl"
    >
      <NextLink href={`/note/${note.id}`} passHref>
        <Box as="a" h="250px" w="300px">
          <Box
            d="flex"
            justifyContent="space-between"
            fontSize="xs"
            color="primary.300"
            fontWeight="bold"
            letterSpacing="wider"
            border="1px solid red"
          >
            <Text>{dayjs(note.createdAt).format('DD MMM YYYY')}</Text>
            <Text>{dayjs(note.createdAt).format('HH:mm')}</Text>
          </Box>

          <Text
            noOfLines={7}
            mt="2"
            color="primary.600"
            border="1px solid blue"
          >
            {note.text}
          </Text>
        </Box>
      </NextLink>
      <NoteOption noteId={note.id} pos="absolute" bottom="1" right="3" />
    </Box>
  )
}

export default HorizontalNoteCard
