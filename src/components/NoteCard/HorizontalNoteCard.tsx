import React from 'react'
import {Box, BoxProps, ChakraProps, Text, TextProps} from '@chakra-ui/react'
import NextLink from 'next/link'
import dayjs from 'dayjs'

import {Note} from '../../hooks/useStorage'
import NoteOption from '../NoteOption'

const HorizontalNoteCard = ({
  note,
  width,
  height,
  noOfLines,
  textHeight,
  sx
}: {
  note: Note
  height?: BoxProps['height']
  width?: BoxProps['width']
  noOfLines?: TextProps['noOfLines']
  textHeight?: TextProps['height']
  sx?: ChakraProps['sx']
}) => {
  console.log(sx, 'sx')
  return (
    <Box
      sx={sx}
      flexShrink={0}
      pos="relative"
      h={height || '250px'}
      w={width || '300px'}
      bgColor="whiteAlpha.600"
      p="4"
      rounded="3xl"
    >
      <NextLink href={`/note/${note.id}`} passHref>
        <Box as="a">
          <Box
            display="flex"
            justifyContent="space-between"
            fontSize="xs"
            color="primary.300"
            fontWeight="bold"
            letterSpacing="wider"
          >
            <Text>{dayjs(note.createdAt).format('DD MMM YYYY')}</Text>
            <Text>{dayjs(note.createdAt).format('HH:mm')}</Text>
          </Box>

          <Text
            noOfLines={noOfLines || 7}
            h={textHeight}
            mt="2"
            color="primary.600"
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
