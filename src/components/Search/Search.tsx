import React from 'react'

import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  useDisclosure
} from '@chakra-ui/react'

import SearchDialog from './SearchDialog'
import SearchIcon from '../../assets/svgs/SearchIcon'

const Search = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <Box onMouseDown={e => e.preventDefault()} onClick={onOpen}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Box color="primary.600">
              <SearchIcon />
            </Box>
          </InputLeftElement>
          <Input
            _hover={{borderColor: 'primary.50'}}
            cursor="pointer"
            type="tel"
            placeholder="Search your notes..."
            readOnly
            _placeholder={{color: 'primary.200', opacity: 1}}
            borderColor="primary.50"
            bgColor="primary.50"
          />
        </InputGroup>
      </Box>
      <SearchDialog isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Search
