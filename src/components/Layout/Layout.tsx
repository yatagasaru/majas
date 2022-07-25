import React, {ReactNode} from 'react'
import {Box, BoxProps, Container, ContainerProps} from '@chakra-ui/react'
import {HEADER_HEIGHT} from '../Header'
import useWindowSize from '../../hooks/useWindowSize'

type Props = {
  children: ReactNode
  centerContent?: ContainerProps['centerContent']
  display?: ContainerProps['display']
  maxW?: ContainerProps['maxW']
  h?: BoxProps['height']
}

const Layout = (props: Props) => {
  const {isMobile} = useWindowSize()
  const {children, centerContent, display, maxW, h} = props

  return (
    <Box
      as="main"
      h={h || isMobile ? undefined : `calc(100vh - ${HEADER_HEIGHT}px)`}
      minH={isMobile ? `calc(100vh - ${HEADER_HEIGHT}px)` : undefined}
    >
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
