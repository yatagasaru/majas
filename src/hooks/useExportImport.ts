import exportFromJSON from 'export-from-json'
import {getItem} from '../helpers/localStorage'

import {
  readNote,
  writeExportMetaToStorage,
  writeImportMetaToStorage,
  writeNoteToStorage
} from '../helpers/storage'
import {Note} from './useStorage'

export type ExportImportData = {
  notes: Note[]
  recentlyOpened: string[]
  meta: {
    createdAt: string
    deviceName: string
  }
}

const useExportImport = () => {
  const exportLocal = () => {
    const notes = readNote('Notes')
    const recentlyOpened = readNote('RecentlyOpenedNotes')
    const deviceName = getItem('DeviceName')

    const fileName = `majas-${+new Date()}`

    const exportType = exportFromJSON.types.json

    const data: ExportImportData = {
      notes,
      recentlyOpened,
      meta: {
        createdAt: new Date().toISOString(),
        deviceName
      }
    }

    writeExportMetaToStorage({
      createdAt: new Date().toISOString(),
      length: notes.length
    })

    exportFromJSON({data, fileName, exportType})
  }

  const importLocal = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as ExportImportData

      writeNoteToStorage('Notes', parsed.notes)
      writeNoteToStorage('RecentlyOpenedNotes', parsed.recentlyOpened)
      writeImportMetaToStorage({
        ...parsed.meta,
        importedAt: new Date().toISOString(),
        length: parsed.notes.length
      })
    } catch (err) {}
  }

  return {
    exportLocal,
    importLocal
  }
}

export default useExportImport
