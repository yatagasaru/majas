import React, {useEffect} from 'react'
import type {AppProps} from 'next/app'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'

import '@fontsource/urbanist/300.css'
import '@fontsource/urbanist/variable.css'

import {primary} from '../helpers/colors'
import '../styles/globals.css'
import Header from '../components/Header'
import useStorage from '../hooks/useStorage'

const theme = extendTheme({
  fonts: {
    heading: 'UrbanistVariable',
    body: 'UrbanistVariable'
  },
  colors: {
    primary: primary()
  }
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
