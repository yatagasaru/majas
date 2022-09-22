import {ChakraProps} from '@chakra-ui/react'

const notMobile = (sxProps: ChakraProps['sx']) => {
  return {
    '@media only screen and (min-width: 600px) and (min-height: 600px)': {
      ...sxProps
    }
  }
}

export {notMobile}
