import exportFromJSON from 'export-from-json'
import {getItem} from '../helpers/localStorage'

import {readNote, writeNoteToStorage} from '../helpers/storage'
import {Note} from './useStorage'

export type ExportImportData = {
  notes: Note[]
  recentlyOpened: string[]
  meta: {
    createdAt: string
    deviceName: string
  }
}

const useFile = () => {
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

    exportFromJSON({data, fileName, exportType})
  }

  const importLocal = async (file: File) => {
    const parsed = JSON.parse(await file.text()) as ExportImportData

    writeNoteToStorage('Notes', parsed.notes)
    writeNoteToStorage('RecentlyOpenedNotes', parsed.recentlyOpened)
  }

  return {
    exportLocal,
    importLocal
  }
}

export default useFile
