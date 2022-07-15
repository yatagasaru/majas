import React, {ReactNode} from 'react'
import {Container, ContainerProps} from '@chakra-ui/react'

type Props = {
  children: ReactNode
} & ContainerProps

const GeneralLayout = (props: Props) => {
  const {children, ...containerProps} = props

  return (
    <Container maxW="container.xl" {...containerProps}>
      {children}
    </Container>
  )
}

export default GeneralLayout
