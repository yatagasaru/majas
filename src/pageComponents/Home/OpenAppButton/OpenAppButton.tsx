import React from 'react'
import {Button, ButtonProps} from '@chakra-ui/react'
import NextLink from 'next/link'

type Props = Omit<ButtonProps, 'as' | 'size' | '_hover' | 'bgColor' | 'color'>

const OpenAppButton = (props: Props) => {
  return (
    <Button
      href="/note"
      as={NextLink}
      size="lg"
      _hover={{bgColor: 'primary.100'}}
      bgColor="primary.50"
      color="primary.600"
      {...props}
    >
      Open App
    </Button>
  )
}

export default OpenAppButton
