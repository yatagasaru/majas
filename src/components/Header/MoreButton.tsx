import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonProps,
  FormLabel,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'

import MoreVertical from '../../assets/svgs/MoreVertical'
import pkg from '../../../package.json'
import {clear, getItem} from '../../helpers/localStorage'
import useNote from '../../hooks/useNote'
import Download from '../../assets/svgs/Download'
import DownloadCloud from '../../assets/svgs/DownloadCloud'
import Upload from '../../assets/svgs/Upload'
import UploadCloud from '../../assets/svgs/UploadCloud'
import Info from '../../assets/svgs/Info'
import RotateCCW from '../../assets/svgs/RotateCCW'
import ConfirmationModal from '../ConfirmationModal'
import {Overlay} from '../Modal'
import {ExportMeta, ImportMeta} from '../../hooks/useStorage'
import {readExportMeta, readImportMeta} from '../../helpers/storage'
import dayjs from 'dayjs'
import useExportImport from '../../hooks/useExportImport'

const ItemButton = ({
  icon,
  title,
  onClick,
  display
}: {
  icon?: JSX.Element
  title: string
  onClick?: ButtonProps['onClick']
  display?: ButtonProps['display']
}) => {
  return (
    <Button
      display={display || 'inline-flex'}
      onClick={onClick}
      pl="1.5rem"
      rounded="0"
      _hover={{bgColor: 'gray.50'}}
      variant="ghost"
      fontWeight="normal"
      w="100%"
      justifyContent="flex-start"
      alignItems="center"
      leftIcon={icon}
    >
      {title}
    </Button>
  )
}

const ExportImportAccordion = () => {
  const {exportLocal, importLocal} = useExportImport()

  const labelRef = useRef<HTMLLabelElement>(null)

  const handleFilePicker = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    importLocal(e.target.files[0])

    window.location.replace('/')
  }

  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        <h2>
          <AccordionButton _hover={{bgColor: 'gray.50'}}>
            <Box flex="1" textAlign="left">
              Export
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p="0">
          <ItemButton
            icon={<Upload />}
            onClick={exportLocal}
            title="Local Export"
          />
          <ItemButton
            display="none"
            icon={<UploadCloud />}
            title="Cloud Export"
          />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="none">
        <h2>
          <AccordionButton _hover={{bgColor: 'gray.50'}}>
            <Box flex="1" textAlign="left">
              Import
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p="0">
          <Input
            display="none"
            id="localImportFile"
            name="localImportFile"
            type="file"
            accept=".json"
            onChange={handleFilePicker}
          />
          <FormLabel display="none" htmlFor="localImportFile" ref={labelRef} />
          <ItemButton
            icon={<Download />}
            onClick={() => labelRef.current && labelRef.current.click()}
            title="Local Import"
          />
          <ItemButton
            display="none"
            icon={<DownloadCloud />}
            title="Cloud Import"
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

const MoreInfoModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const [importMeta, setImportMeta] = useState<ImportMeta | null>(null)
  const [exportMeta, setExportMeta] = useState<ExportMeta | null>(null)

  useEffect(() => {
    setImportMeta(readImportMeta())
    setExportMeta(readExportMeta())
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <Overlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          {!importMeta && !exportMeta ? (
            <Text>No backup activity recorded.</Text>
          ) : null}
          {importMeta ? (
            <>
              <Text>
                Last import @{' '}
                <Box as="span" fontWeight="bold">
                  {dayjs(importMeta.importedAt).format('LLL')}
                </Box>
              </Text>
              <Text>
                Consisted of{' '}
                <Box as="span" fontWeight="bold">
                  {importMeta.length}
                </Box>{' '}
                notes
              </Text>
              <Text>
                From{' '}
                <Box as="span" fontWeight="bold">
                  {importMeta.deviceName}
                </Box>{' '}
                @{' '}
                <Box as="span" fontWeight="bold">
                  {dayjs(importMeta.createdAt).format('LLL')}
                </Box>
              </Text>
            </>
          ) : null}
          {exportMeta ? (
            <>
              <Text mt="4">
                Last export @{' '}
                <Box as="span" fontWeight="bold">
                  {dayjs(exportMeta.createdAt).format('LLL')}
                </Box>
              </Text>
              <Text>
                Consisted of{' '}
                <Box as="span" fontWeight="bold">
                  {exportMeta.length}
                </Box>{' '}
                notes
              </Text>
            </>
          ) : null}
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

const MoreButton = () => {
  const {notes} = useNote()
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
            <ExportImportAccordion />
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
          window.location.replace('/')
        }}
      />
    </>
  )
}

export default MoreButton
