import React from 'react'
import {Box, Text} from '@chakra-ui/react'
import NextLink from 'next/link'

import {Note} from '../../hooks/useStorage'
import dayjs from '../../helpers/dayjs'

const VerticalNoteCard = ({note}: {note: Note}) => {
  return (
    <NextLink href={`/note/${note.id}`} passHref>
      <Box
        as="a"
        p="4"
        rounded="3xl"
        bgColor="whiteAlpha.600"
        flexBasis="33.3333333333%"
      >
        <Box
          d="flex"
          justifyContent="space-between"
          fontSize="xs"
          color="primary.300"
          fontWeight="bold"
          letterSpacing="wider"
        >
          <Text>{dayjs(note.createdAt).format('DD MMM YYYY')}</Text>
          <Text>{dayjs(note.createdAt).format('HH:mm')}</Text>
        </Box>
        <Text mt="2" color="primary.600" noOfLines={7}>
          {note.text}
        </Text>
      </Box>
    </NextLink>
  )
}

export default VerticalNoteCard
