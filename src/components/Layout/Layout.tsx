import React, {ReactNode} from 'react'
import {Box, BoxProps, Container, ContainerProps} from '@chakra-ui/react'
import {HEADER_HEIGHT} from '../Header'
import {notMobile} from '../../helpers/sx'

type Props = {
  children: ReactNode
  centerContent?: ContainerProps['centerContent']
  display?: ContainerProps['display']
  flexDir?: ContainerProps['flexDir']
  sx?: ContainerProps['sx']
  maxW?: ContainerProps['maxW']
  h?: BoxProps['height']
}

const Layout = (props: Props) => {
  const {children, centerContent, display, maxW, flexDir, h, sx} = props

  return (
    <Box
      as="main"
      sx={notMobile({
        h: `calc(100vh - ${HEADER_HEIGHT}px)`,
        minH: undefined
      })}
      h={h}
      minH={`calc(100vh - ${HEADER_HEIGHT}px)`}
    >
      <Container
        sx={sx}
        h="100%"
        display={display || 'block'}
        flexDir={flexDir}
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
