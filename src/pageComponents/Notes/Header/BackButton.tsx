import React from 'react'
import {Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'

import Chevronleft from '../../../assets/svgs/ChevronLeft'
import {useGlobalState} from '../../../state'

const BackButton = () => {
  const router = useRouter()
  const [isEditorProcessing] = useGlobalState('isEditorProcessing')

  const onBack = () => {
    if (isEditorProcessing) return
    router.replace('/note')
  }

  return (
    <Button
      isDisabled={isEditorProcessing}
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
