import React, {useEffect, useState} from 'react'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'

import MoreVertical from '../../assets/svgs/MoreVertical'
import pkg from '../../../package.json'
import {clear, getItem} from '../../helpers/localStorage'
import Info from '../../assets/svgs/Info'
import RotateCCW from '../../assets/svgs/RotateCCW'
import ConfirmationModal from '../ConfirmationModal'
import ExportImportAccordion from './ExportImportAccordion'
import MoreInfoModal from './MoreInfoModal'
import {useGlobalState} from '../../state'

const MoreButton = () => {
  const [notes] = useGlobalState('notes')

  const {
    onOpen: onOpenReset,
    isOpen: isOpenReset,
    onClose: onCloseReset
  } = useDisclosure()
  const {
    onOpen: onOpenInfo,
    isOpen: isOpenInfo,
    onClose: onCloseInfo
  } = useDisclosure()

  const [deviceName, setDeviceName] = useState('')

  useEffect(() => {
    requestAnimationFrame(() => {
      const dName = getItem('DeviceName')
      if (dName && !deviceName) setDeviceName(dName)
    })
  }, [])

  return (
    <>
      <Menu autoSelect={false} colorScheme="primary">
        <MenuButton
          as={IconButton}
          variant="ghost"
          colorScheme="primary"
          size="sm"
          aria-label="more option"
          icon={<MoreVertical />}
        />

        <MenuList zIndex={99} maxW="20ch">
          <Text
            fontWeight="bold"
            fontSize="xx-small"
            letterSpacing="wider"
            textAlign="center"
            color="gray.400"
          >
            MAJAS v.{pkg.version}
          </Text>
          <VStack px="0.8rem" py="0.4rem" align="stretch">
            <Text>{deviceName}</Text>
            <Text>{notes.length} Notes</Text>
          </VStack>
          <MenuDivider />
          <MenuGroup title="Backup">
            <ExportImportAccordion currentNotesLen={notes.length} />
          </MenuGroup>
          <MenuGroup>
            <MenuItem
              onClick={onOpenInfo}
              closeOnSelect={false}
              icon={<Info />}
              fontSize="sm"
              _hover={{bgColor: 'gray.50'}}
            >
              More Info
            </MenuItem>
            <MenuItem
              onClick={onOpenReset}
              isDisabled={!notes.length}
              closeOnSelect={false}
              icon={<RotateCCW />}
              fontSize="sm"
              color="red.300"
              _hover={{bgColor: 'red.50'}}
            >
              Reset
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      {isOpenInfo && (
        <MoreInfoModal isOpen={isOpenInfo} onClose={onCloseInfo} />
      )}
      <ConfirmationModal
        isOpen={isOpenReset}
        onClose={onCloseReset}
        message="Resetting the app will delete all notes and reassign a new device name. This action cannot be undone. Are you sure?"
        title=""
        okTitle="Reset"
        onOk={() => {
          clear()
          window.location.replace('/note')
        }}
      />
    </>
  )
}

export default MoreButton
