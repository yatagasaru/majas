import {createGlobalState} from 'react-hooks-global-state'
import {uniqueNamesGenerator, adjectives, animals} from 'unique-names-generator'
import {getItem, setItem} from '../helpers/localStorage'

import {readNote, writeNoteToStorage} from '../helpers/storage'
import useNote from './useNote'

export type Note = {
  id: string
  createdAt: string
  updatedAt: string
  text: string
}

export type ImportMeta = {
  createdAt: string
  deviceName: string
  importedAt: string
  length: number
}

export type ExportMeta = {
  createdAt: string
  length: number
}
export interface NotesDB {
  notes: Note[]
  recentlyOpenedNotes: string[]
}

type InitialState = {
  isInitialized: boolean
}

const initialState: InitialState = {
  isInitialized: false
}

const {useGlobalState} = createGlobalState(initialState)

const useStorage = () => {
  const {setNotes, setRecentlyOpenedNotes, initSearchIndex} = useNote()

  const [isInitialized, setIsInitialized] = useGlobalState('isInitialized')

  const initStorage = () => {
    if (isInitialized) return

    let notes: Note[] = []

    try {
      notes = readNote('Notes')
      if (!notes.length) writeNoteToStorage('Notes', [])
      else {
        setNotes(notes)
        initSearchIndex(notes)
      }
    } catch (err) {
      writeNoteToStorage('Notes', [])
    }

    try {
      const recentlyOpenedNotes = readNote('RecentlyOpenedNotes')
      if (!recentlyOpenedNotes.length)
        writeNoteToStorage('RecentlyOpenedNotes', [])
      else {
        const recentlyOpened: Note[] = []

        recentlyOpenedNotes.map(id => {
          const targetNote = notes.find(note => note.id === id)

          if (targetNote) {
            recentlyOpened.push(targetNote)
          }
        })

        setRecentlyOpenedNotes(recentlyOpened)
      }
    } catch {
      writeNoteToStorage('RecentlyOpenedNotes', [])
    }

    const name = getItem('DeviceName')

    if (!name) {
      const deviceName: string = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        separator: ' ',
        length: 2,
        style: 'capital'
      })

      setItem('DeviceName', deviceName)
    }

    setIsInitialized(true)
  }

  return {
    initStorage
  }
}

export default useStorage
