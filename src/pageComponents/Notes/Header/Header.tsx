import {Box} from '@chakra-ui/react'
import BackButton from './BackButton'
import CharCount from './CharCount'

const Header = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <BackButton />
      <CharCount />
    </Box>
  )
}

export default Header
