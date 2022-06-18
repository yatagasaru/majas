import {FormLabel, Button, Input} from '@chakra-ui/react'
import React, {ChangeEvent} from 'react'
import useFile from '../hooks/useFIle'

const ExpImp = () => {
  const {exportLocal, importLocal} = useFile()

  const handleFilePicker = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    importLocal(e.target.files[0])
  }

  return (
    <>
      <Button onClick={exportLocal}>Export Local</Button>
      <Input
        display="none"
        id="localImportFile"
        name="localImportFile"
        type="file"
        accept=".json"
        onChange={handleFilePicker}
      />
      <FormLabel cursor="pointer" htmlFor="localImportFile">
        Local Import
      </FormLabel>
    </>
  )
}

export default ExpImp
