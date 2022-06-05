import React from 'react'
import {Modal, ModalOverlay, ModalContent, ModalBody} from '@chakra-ui/react'
import SearchBox from './SearchBox'
import useFullTextSearch from '../../hooks/useFullTextSearch'
import SimpleBar from 'simplebar-react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const SearchDialog = (props: Props) => {
  const {isOpen, onClose} = props

  const {searchResults} = useFullTextSearch()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay
        bg="none"
        backdropFilter="blur(3px) brightness(50%) sepia(20%)"
      />
      <ModalContent>
        <SearchBox />
        {searchResults.length ? (
          <SimpleBar style={{maxHeight: 'calc(100vh - 12rem)'}}>
            <ModalBody>
              {searchResults.map(note => (
                <>
                  <p>{note.id}</p>
                  <p>{note.text}</p>
                </>
              ))}
            </ModalBody>
          </SimpleBar>
        ) : null}
      </ModalContent>
    </Modal>
  )
}

export default SearchDialog
