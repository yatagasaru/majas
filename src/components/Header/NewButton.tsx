import React from 'react'
import {IconButton} from '@chakra-ui/react'
import NextLink from 'next/link'

import Plus from '../../assets/svgs/Plus'
import usePath from '../../hooks/usePath'
import useNote from '../../hooks/useNote'

const NewButton = () => {
  const {active} = usePath()
  const {setCurrentNoteId} = useNote()

  if (active === 'new') return null
  else {
    return (
      <NextLink href="/new" passHref>
        <IconButton
          onClick={() => setCurrentNoteId('')}
          as="a"
          variant="ghost"
          colorScheme="primary"
          aria-label="new note"
        >
          <Plus />
        </IconButton>
      </NextLink>
    )
  }
}

export default NewButton
