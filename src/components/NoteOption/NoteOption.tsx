import React from 'react'
import {
  Menu,
  IconButton,
  MenuList,
  MenuItem,
  MenuButton,
  IconButtonProps,
  useDisclosure
} from '@chakra-ui/react'
import MoreHorizontal from '../../assets/svgs/MoreHorizontal'
import useNote from '../../hooks/useNote'
import ConfirmationModal from '../ConfirmationModal'

type Props = {noteId: string} & Omit<
  IconButtonProps,
  'as' | 'variant' | 'colorScheme' | 'size' | 'aria-label' | 'icon'
>

const NoteOption = (props: Props) => {
  const {noteId, ...otherProps} = props

  const {onOpen, isOpen, onClose} = useDisclosure()
  const {removeNote} = useNote()

  return (
    <>
      <Menu autoSelect={false} colorScheme="primary">
        <MenuButton
          {...otherProps}
          as={IconButton}
          variant="ghost"
          colorScheme="primary"
          size="sm"
          aria-label="more option"
          icon={<MoreHorizontal />}
        />
        <MenuList fontSize="sm">
          <MenuItem
            onClick={onOpen}
            color="red.500"
            _hover={{backgroundColor: 'red.50'}}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        message="This action cannot be undone. Are you sure?"
        title="Delete Note"
        okTitle="Delete"
        onOk={() => removeNote(noteId)}
      />
    </>
  )
}

export default NoteOption
