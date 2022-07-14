import React from 'react'
import {SimpleGrid, Heading, Text, Flex} from '@chakra-ui/react'
import {GeneralLayout} from '../../../components/Layout'

const Fold2 = () => {
  return (
    <GeneralLayout centerContent>
      <SimpleGrid w="100%" columns={{base: 1, mds: 3}} textAlign="center">
        <Flex flexDir="column">
          <Heading as="h2">Full Text Search</Heading>{' '}
          <Text alignSelf="center" fontSize="18" maxW="30ch" textAlign="center">
            Majas will locally index your notes and you can search everything
            you have written
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Heading as="h2">Your Notes, Your Data</Heading>{' '}
          <Text alignSelf="center" fontSize="18" maxW="30ch">
            Everything is stored locally. Nothing will ever leave your device.
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Heading as="h2">Availability</Heading>{' '}
          <Text alignSelf="center" fontSize="18" maxW="30ch">
            Backup your notes into a single human readable file that you can
            restore back. Easily copy, send, read or anything you want with your
            backup file
          </Text>
        </Flex>
      </SimpleGrid>
    </GeneralLayout>
  )
}

export default Fold2
