import exportFromJSON from 'export-from-json'
import {create, array, Describe, object, string} from 'superstruct'

import {getItem} from '../helpers/localStorage'

import {
  readNote,
  writeExportMetaToStorage,
  writeImportMetaToStorage,
  writeNoteToStorage
} from '../helpers/storage'
import {JsISOString} from '../helpers/superstructs'
import {Note} from './useStorage'

export type ExportImportData = {
  notes: Note[]
  recentlyOpened: string[]
  meta: {
    createdAt: string
    deviceName: string
  }
}

const ExportImportData: Describe<ExportImportData> = object({
  notes: array(
    object({
      id: string(),
      createdAt: string(),
      updatedAt: string(),
      text: string()
    })
  ),
  recentlyOpened: array(string()),
  meta: object({
    createdAt: JsISOString(),
    deviceName: string()
  })
})

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
      const text = await file.text()
      const parsed = JSON.parse(text) as ExportImportData

      const validated = create(parsed, ExportImportData)

      writeNoteToStorage('Notes', validated.notes)
      writeNoteToStorage('RecentlyOpenedNotes', validated.recentlyOpened)
      writeImportMetaToStorage({
        ...validated.meta,
        importedAt: new Date().toISOString(),
        length: parsed.notes.length
      })

      return Promise.resolve(true)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return {
    exportLocal,
    importLocal
  }
}

export default useExportImport
