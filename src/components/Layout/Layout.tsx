import React, {ReactNode} from 'react'
import {Box, Container, ContainerProps} from '@chakra-ui/react'
import {HEADER_HEIGHT} from '../Header'

type Props = {
  children: ReactNode
  centerContent?: ContainerProps['centerContent']
  display?: ContainerProps['display']
  maxW?: ContainerProps['maxW']
}

const Layout = (props: Props) => {
  const {children, centerContent, display, maxW} = props

  return (
    <Box as="main" h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <Container
        h="100%"
        display={display || 'block'}
        maxW={maxW || 'container.xl'}
        p="2"
        pb="4"
        centerContent={centerContent}
      >
        {children}
      </Container>
    </Box>
  )
}

export default Layout
