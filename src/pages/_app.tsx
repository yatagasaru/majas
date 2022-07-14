import React, {useEffect} from 'react'
import type {AppProps} from 'next/app'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {createBreakpoints} from '@chakra-ui/theme-tools'

import '@fontsource/urbanist/300.css'
import '@fontsource/urbanist/variable.css'
import 'simplebar/dist/simplebar.min.css'

import {primary} from '../helpers/colors'
import '../styles/globals.css'
import Header from '../components/Header'
import useStorage from '../hooks/useStorage'

const breakpoints = createBreakpoints({
  xxs: '20em', //320px
  xs: '22.5em', //360px
  sm: '25em', //400px
  mds: '30em', //480px
  md: '48em', //768px
  lg: '62em', //920px
  xl: '80em', //1280px
  xxl: '120em' // 1920px
})

const theme = extendTheme({
  fonts: {
    heading: 'UrbanistVariable',
    body: 'UrbanistVariable'
  },
  colors: {
    primary: primary()
  },
  breakpoints
})

function MyApp({Component, pageProps}: AppProps) {
  const {initStorage} = useStorage()

  useEffect(() => {
    initStorage()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
