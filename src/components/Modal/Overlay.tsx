import React from 'react'
import {ModalOverlay} from '@chakra-ui/react'

const Overlay = () => {
  return (
    <ModalOverlay
      bg="none"
      backdropFilter="blur(3px) brightness(50%) sepia(20%)"
      sx={{
        //firerfox < 102 doesn't support backdrop-filter
        //fallback to slightly transparent dark background
        '@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none))':
          {
            bg: 'blackAlpha.600'
          }
      }}
    />
  )
}

export default Overlay
