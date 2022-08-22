import React from 'react'
import {Flex, Link, Text} from '@chakra-ui/react'
import NextLink from 'next/link'

import {GeneralLayout} from '../Layout'

const Footer = () => {
  return (
    <GeneralLayout pt="24" as="footer">
      <Flex pb="4" fontSize="sm" color="primary.600">
        <Text mr={{base: 'auto', mds: '24'}}>© Majas App</Text>
        <NextLink href="/pricing" passHref>
          <Link>Pricing</Link>
        </NextLink>
        <Link
          ml="6"
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/yatagasaru/majas"
        >
          Github
        </Link>
      </Flex>
    </GeneralLayout>
  )
}

export default Footer
