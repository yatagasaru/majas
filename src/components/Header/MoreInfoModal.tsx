import {useState, useEffect} from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  ModalFooter,
  Text
} from '@chakra-ui/react'
import dayjs from 'dayjs'

import {readImportMeta, readExportMeta} from '../../helpers/storage'
import {ExportMeta, ImportMeta} from '../../hooks/useStorage'
import {Overlay} from '../Modal'

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

export default MoreInfoModal
