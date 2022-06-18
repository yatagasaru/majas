import {getItem, Key, keys, setItem} from './localStorage'
import {ImportMeta, Note} from '../hooks/useStorage'

function readNote(key: typeof keys[0], raw?: false): Note[]
function readNote(key: typeof keys[1], raw?: false): string[]
function readNote(key: typeof keys[0], raw?: true): string
function readNote(key: typeof keys[1], raw?: true): string
function readNote(key: Key, raw?: boolean) {
  if (key === 'Notes') {
    if (raw) {
      const rawNotes = getItem(key)
      return rawNotes
    } else {
      const notes: Note[] = JSON.parse(getItem(key))
      return notes
    }
  }

  if (key === 'RecentlyOpenedNotes') {
    if (raw) {
      const rawRecentlyOpened = getItem(key)
      return rawRecentlyOpened
    }
    const recentlyOpenedNotes: string[] = JSON.parse(getItem(key))
    return recentlyOpenedNotes
  }
}

function writeNoteToStorage(key: typeof keys[0], newValue: Note[]): void
function writeNoteToStorage(key: typeof keys[1], newValue: string[]): void
function writeNoteToStorage(key: Key, newValue: string[] | Note[]) {
  setItem(key, JSON.stringify(newValue))
}

function readImportMeta() {
  const importMeta: ImportMeta | null = JSON.parse(getItem('ImportMeta'))
  return importMeta
}
function writeImportMetaToStorage(data: ImportMeta) {
  setItem('ImportMeta', JSON.stringify(data))
}

export {readNote, writeNoteToStorage, readImportMeta, writeImportMetaToStorage}
