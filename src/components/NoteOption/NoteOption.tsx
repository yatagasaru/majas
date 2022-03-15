import React from 'react'
import {
  Menu,
  IconButton,
  MenuList,
  MenuItem,
  MenuButton,
  IconButtonProps
} from '@chakra-ui/react'
import MoreHorizontal from '../../assets/svgs/MoreHorizontal'

type Props = Omit<
  IconButtonProps,
  'as' | 'variant' | 'colorScheme' | 'size' | 'aria-label' | 'icon'
>

const NoteOption = (props?: Props) => {
  return (
    <Menu autoSelect={false} colorScheme="primary">
      <MenuButton
        {...props}
        as={IconButton}
        variant="ghost"
        colorScheme="primary"
        size="sm"
        aria-label="more option"
        icon={<MoreHorizontal />}
      />
      <MenuList fontSize="sm">
        <MenuItem color="red.500" _hover={{backgroundColor: 'red.50'}}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default NoteOption
