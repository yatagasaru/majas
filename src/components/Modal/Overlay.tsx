import React from 'react'
import {ModalOverlay} from '@chakra-ui/react'

const Overlay = () => {
  return (
    <ModalOverlay
      bg="none"
      backdropFilter="blur(3px) brightness(50%) sepia(20%)"
    />
  )
}

export default Overlay
