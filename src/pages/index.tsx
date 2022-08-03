import React from 'react'
import {Box} from '@chakra-ui/react'
import type {NextPage} from 'next'

import Fold1 from '../pageComponents/Home/Fold1'
import Fold2 from '../pageComponents/Home/Fold2'
import Fold3 from '../pageComponents/Home/Fold3'
import Footer from '../components/Footer'
import MetaTags from '../components/MetaTags'

const Home: NextPage = () => {
  return (
    <Box as="main">
      <MetaTags page="home" />
      <Fold1 />
      <Fold2 />
      <Fold3 />
      <Footer />
    </Box>
  )
}

export default Home
