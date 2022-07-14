import React, {ReactNode} from 'react'
import {Box, Container, ContainerProps} from '@chakra-ui/react'

type Props = {
  children: ReactNode
} & ContainerProps

const GeneralLayout = (props: Props) => {
  const {children, ...containerProps} = props

  return (
    <Box as="main">
      <Container maxW="container.xl" {...containerProps}>
        {children}
      </Container>
    </Box>
  )
}

export default GeneralLayout
