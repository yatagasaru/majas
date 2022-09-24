import React from 'react'
import {Box, Text, Heading, Flex} from '@chakra-ui/react'

import {HEADER_HEIGHT} from '../../../components/Header'
import {GeneralLayout} from '../../../components/Layout'
import OpenAppButton from '../OpenAppButton'
import {notMobile} from '../../../helpers/sx'

const Fold1 = () => {
  return (
    <GeneralLayout as="section">
      <Box
        w="100%"
        pos="absolute"
        top={0}
        left={0}
        zIndex={1}
        minH="100vh"
        opacity={0.4}
        bgColor="#FFF"
        bgImage="repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff 40px ), repeating-linear-gradient( #fcf2e455, #fcf2e4 )"
      />
      <Box
        minH={`calc(100vh - ${HEADER_HEIGHT}px)`}
        pos="relative"
        zIndex={1}
        display="flex"
        flexDir="column"
        justifyContent={{base: 'start', mds: 'center'}}
        sx={notMobile({
          pb: '0'
        })}
        pb="12"
      >
        <Heading
          lineHeight="normal"
          as="h1"
          fontSize={{base: '6xl', mds: '8xl'}}
          fontWeight="black"
          sx={notMobile({
            mt: '0'
          })}
          mt="12"
        >
          Your Day-to-Day
        </Heading>
        <Heading
          as="h1"
          mt="2"
          lineHeight="normal"
          fontSize={{base: '6xl', mds: '8xl'}}
          fontWeight="black"
        >
          Note Taking App
        </Heading>
        <Text mt="12" fontSize="24px">
          Simple and straightforward, with unique approach for you to enjoy
        </Text>
        <Flex justify="start" mt="4">
          <OpenAppButton />
        </Flex>
      </Box>
    </GeneralLayout>
  )
}

export default Fold1
