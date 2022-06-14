import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Box,
  Text
} from '@chakra-ui/react'
import NextLink from 'next/link'

import SearchBox from './SearchBox'
import useNote from '../../hooks/useNote'
import SimpleBar from 'simplebar-react'
import dayjs from '../../helpers/dayjs'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const SearchDialog = (props: Props) => {
  const {isOpen, onClose} = props

  const {searchResults, setSearchResults} = useNote()

  const onModalClose = () => {
    setSearchResults([])
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay
        bg="none"
        backdropFilter="blur(3px) brightness(50%) sepia(20%)"
      />
      <ModalContent>
        <SearchBox />
        {searchResults.length ? (
          <SimpleBar style={{maxHeight: 'calc(100vh - 12rem)'}}>
            <ModalBody py="4">
              <VStack spacing="4" align="stretch">
                {searchResults.map(note => (
                  <NextLink key={note.id} href={`/note/${note.id}`} passHref>
                    <Box
                      onClick={onClose}
                      as="a"
                      cursor="pointer"
                      p="3"
                      rounded="lg"
                      _hover={{bgColor: 'primary.50'}}
                      transition=".2s ease"
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        mb="2"
                        color="primary.300"
                      >
                        <Text fontSize="sm" fontWeight="bold">
                          {dayjs(note.createdAt).format('DD MMM YYYY')}
                        </Text>
                        <Text fontSize="sm" fontWeight="bold">
                          <Box as="span">Modified:</Box>{' '}
                          {dayjs(note.updatedAt).format('DD MMM YYYY')}
                        </Text>
                      </Box>
                      <Text noOfLines={3}>{note.text}</Text>
                    </Box>
                  </NextLink>
                ))}
              </VStack>
            </ModalBody>
          </SimpleBar>
        ) : null}
      </ModalContent>
    </Modal>
  )
}

export default SearchDialog
