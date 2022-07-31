import React from 'react'
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Spinner
} from '@chakra-ui/react'

import SearchIcon from '../../assets/svgs/SearchIcon'
import useSearch from '../../hooks/useSearch'
import {setGlobalState, useGlobalState} from '../../state'

const SearchBox = () => {
  const [isIndexSearching] = useGlobalState('isIndexSearching')

  const {search} = useSearch()

  const handleSearch = (searchVal: string) => {
    if (!searchVal || !searchVal.length) {
      setGlobalState('searchResults', [])
    } else {
      search(searchVal)
    }
  }

  return (
    <Box>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Box color="gray.500">
            <SearchIcon />
          </Box>
        </InputLeftElement>
        <Input
          onChange={e => handleSearch(e.target.value)}
          _hover={{borderColor: 'transparent'}}
          _focus={{borderColor: 'transparent'}}
          cursor="pointer"
          placeholder="Search your notes..."
          borderColor="transparent"
          bgColor="transparent"
        />
        <InputRightElement pointerEvents="none">
          {isIndexSearching && <Spinner color="gray.500" />}
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

export default SearchBox
