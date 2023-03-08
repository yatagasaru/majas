import React, {useEffect} from 'react'
import type {AppProps} from 'next/app'
import {Urbanist} from 'next/font/google'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'

import '../styles/globals.css'
import 'simplebar/dist/simplebar.min.css'

import {primary} from '../helpers/colors'
import Header from '../components/Header'
import useStorage from '../hooks/useStorage'

const urbanist = Urbanist({subsets: ['latin']})

const breakpoints = {
  xxs: '20em', //320px
  xs: '22.5em', //360px
  sm: '25em', //400px
  mds: '30em', //480px
  md: '48em', //768px
  lg: '62em', //920px
  xl: '80em', //1280px
  xxl: '120em' // 1920px
}

const theme = extendTheme({
  fonts: {
    heading: urbanist.style.fontFamily,
    body: urbanist.style.fontFamily
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
