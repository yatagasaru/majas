import React from 'react'
import {Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'

import Chevronleft from '../../../assets/svgs/ChevronLeft'
import useNote from '../../../hooks/useNote'

const BackButton = () => {
  const router = useRouter()
  const {clearCurrent} = useNote()

  const onBack = () => {
    clearCurrent()
    router.replace('/note')
  }

  return (
    <Button
      onClick={onBack}
      pl="0"
      letterSpacing="wide"
      leftIcon={<Chevronleft />}
      variant="ghost"
      colorScheme="primary"
    >
      Dashboard
    </Button>
  )
}

export default BackButton
