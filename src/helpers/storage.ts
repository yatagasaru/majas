import {getItem, Key, keys, setItem} from './localStorage'
import {Note} from '../hooks/useStorage'

function readNote(key: typeof keys[0]): Note[]
function readNote(key: typeof keys[1]): string[]
function readNote(key: Key) {
  if (key === 'Notes') {
    const notes: Note[] = JSON.parse(getItem(key))
    return notes
  }

  if (key === 'RecentlyOpenedNotes') {
    const recentlyOpenedNotes: string[] = JSON.parse(getItem(key))
    return recentlyOpenedNotes
  }
}

function writeNoteToStorage(key: typeof keys[0], newValue: Note[]): void
function writeNoteToStorage(key: typeof keys[1], newValue: string[]): void
function writeNoteToStorage(key: Key, newValue: string[] | Note[]) {
  setItem(key, JSON.stringify(newValue))
}

export {readNote, writeNoteToStorage}
