import {Box} from '@chakra-ui/react'
import BackButton from './BackButton'
import CharCount from './CharCount'

const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top={0}
      zIndex={1}
      backgroundColor="white"
      borderTopWidth="4px"
      borderBottomWidth="4px"
      borderColor="white"
    >
      <BackButton />
      <CharCount />
    </Box>
  )
}

export default Header
