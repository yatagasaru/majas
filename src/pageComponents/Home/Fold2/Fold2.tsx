import React from 'react'
import {Box, Heading, Text, Flex} from '@chakra-ui/react'
import {GeneralLayout} from '../../../components/Layout'

const Fold2 = () => {
  return (
    <GeneralLayout maxW="container.md">
      <Box
        pos="absolute"
        mt="-80px"
        zIndex={1}
        left={0}
        w="100%"
        h="50px"
        background="linear-gradient(0deg, rgba(255,255,255,1) 34%, rgba(255,255,255,0.6) 77%, rgba(255,255,255,0.3533788515406162) 100%)"
      />
      <Flex flexDir="column" mt="30px" py="24">
        <Flex flexDir="column">
          <Heading as="h2">Full Text Search</Heading>
          <Text fontSize="18" maxW="30ch">
            Majas will locally index your notes and you can search everything
            you have written
          </Text>
        </Flex>
        <Flex flexDir="column" alignSelf="end" mt="12">
          <Heading as="h2">Your Notes, Your Data</Heading>
          <Text fontSize="18" maxW="30ch">
            Everything is stored locally. Nothing will ever leave your device.
          </Text>
        </Flex>
        <Flex flexDir="column" mt="12">
          <Heading as="h2">Availability</Heading>
          <Text fontSize="18" maxW="30ch">
            Backup your notes into a single human readable file that you can
            restore back. Easily copy, send, read or anything you want with your
            backup file
          </Text>
        </Flex>
      </Flex>
    </GeneralLayout>
  )
}

export default Fold2
