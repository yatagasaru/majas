import React from 'react'
import {Box, InputGroup, InputLeftElement, Input} from '@chakra-ui/react'

import SearchIcon from '../../assets/svgs/SearchIcon'
import useNote from '../../hooks/useNote'

const SearchBox = () => {
  const {search} = useNote()

  return (
    <Box>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Box color="gray.500">
            <SearchIcon />
          </Box>
        </InputLeftElement>
        <Input
          onChange={e => search(e.target.value)}
          _hover={{borderColor: 'transparent'}}
          _focus={{borderColor: 'transparent'}}
          cursor="pointer"
          type="tel"
          placeholder="Search your notes..."
          borderColor="transparent"
          bgColor="transparent"
        />
      </InputGroup>
    </Box>
  )
}

export default SearchBox
