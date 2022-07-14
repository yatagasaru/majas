import {useRef, ChangeEvent} from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Input,
  FormLabel,
  Button,
  ButtonProps
} from '@chakra-ui/react'

import Download from '../../assets/svgs/Download'
import DownloadCloud from '../../assets/svgs/DownloadCloud'
import Upload from '../../assets/svgs/Upload'
import UploadCloud from '../../assets/svgs/UploadCloud'
import useExportImport from '../../hooks/useExportImport'
import useToast from '../../hooks/useToast'

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

const ExportImportAccordion = ({
  currentNotesLen
}: {
  currentNotesLen: number
}) => {
  const {exportLocal, importLocal} = useExportImport()
  const {errorToast} = useToast()

  const labelRef = useRef<HTMLLabelElement>(null)

  const handleFilePicker = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    try {
      const isImported = await importLocal(e.target.files[0])

      if (isImported) {
        window.location.replace('/')
      }
    } catch (err) {
      errorToast({
        title: 'Import Failed',
        description: 'Invalid or corrupt backup file.',
        duration: 4000
      })
    }
  }

  return (
    <Accordion allowToggle>
      <AccordionItem
        border="none"
        isDisabled={currentNotesLen < 1 ? true : false}
      >
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

export default ExportImportAccordion
