import React, {useEffect, useState} from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  VStack
} from '@chakra-ui/react'

import MoreVertical from '../../assets/svgs/MoreVertical'
import pkg from '../../../package.json'
import {getItem} from '../../helpers/localStorage'
import useNote from '../../hooks/useNote'
import Download from '../../assets/svgs/Download'
import DownloadCloud from '../../assets/svgs/DownloadCloud'
import Upload from '../../assets/svgs/Upload'
import UploadCloud from '../../assets/svgs/UploadCloud'

const ExportImportAccordion = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Export
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p="0">
          <MenuItem
            pr="0.8rem"
            pl="1.5rem"
            py="0.4rem"
            icon={<Upload />}
            color="red.500"
            _hover={{backgroundColor: 'red.50'}}
          >
            Local Export
          </MenuItem>
          <MenuItem
            pr="0.8rem"
            pl="1.5rem"
            py="0.4rem"
            icon={<UploadCloud />}
            color="red.500"
            _hover={{backgroundColor: 'red.50'}}
          >
            Cloud Export
          </MenuItem>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="none">
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Import
            </Box>

            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p="0">
          <MenuItem
            pr="0.8rem"
            pl="1.5rem"
            py="0.4rem"
            icon={<Download />}
            color="red.500"
            _hover={{backgroundColor: 'red.50'}}
          >
            Local Import
          </MenuItem>
          <MenuItem
            pr="0.8rem"
            pl="1.5rem"
            py="0.4rem"
            icon={<DownloadCloud />}
            color="red.500"
            _hover={{backgroundColor: 'red.50'}}
          >
            Cloud Import
          </MenuItem>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

const MoreButton = () => {
  const {notes} = useNote()

  const [deviceName, setDeviceName] = useState('')

  useEffect(() => {
    const dName = getItem('DeviceName')
    if (dName && !deviceName) setDeviceName(dName)
  }, [])

  return (
    <Menu autoSelect={false} colorScheme="primary">
      <MenuButton
        as={IconButton}
        variant="ghost"
        colorScheme="primary"
        size="sm"
        aria-label="more option"
        icon={<MoreVertical />}
      />

      <MenuList zIndex={99}>
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
          {/* <MenuItem closeOnSelect={false}>Export</MenuItem>
          <MenuItem closeOnSelect={false}>Import</MenuItem> */}
        </MenuGroup>
        <MenuItem color="red.500" _hover={{backgroundColor: 'red.50'}}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MoreButton
