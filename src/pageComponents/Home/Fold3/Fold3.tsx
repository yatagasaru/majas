import React from 'react'
import {Flex, Heading, Link, Text} from '@chakra-ui/react'

import {GeneralLayout} from '../../../components/Layout'
import OpenAppButton from '../OpenAppButton'

const Fold3 = () => {
  return (
    <GeneralLayout as="section" pt="24" pb="12">
      <Heading as="h2" fontWeight="black">
        What's Next ?
      </Heading>
      <Text fontSize="18px" maxW="80ch">
        Majas is aimed to be fast and simple, but complete enough for everyday
        usage. There are many more features to come. Be sure to check back here
        often!
      </Text>
      <Flex mt="4" align="center">
        <OpenAppButton mr="4" />
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/yatagasaru/majas/releases"
          color="primary.600"
        >
          Changelog
        </Link>
      </Flex>
    </GeneralLayout>
  )
}

export default Fold3
