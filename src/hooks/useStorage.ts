import {createGlobalState} from 'react-hooks-global-state'
import {readNote, writeNoteToStorage} from '../helpers/storage'
import useNote from './useNote'

export type Note = {
  id: string
  createdAt: string
  updatedAt: string
  text: string
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
  const {setNotes, setRecentlyOpenedNotes} = useNote()

  const [isInitialized, setIsInitialized] = useGlobalState('isInitialized')

  const initStorage = () => {
    if (isInitialized) return

    let notes: Note[] = []

    try {
      notes = readNote('Notes')
      if (!notes.length) writeNoteToStorage('Notes', [])
      else setNotes(notes)
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

    setIsInitialized(true)
  }

  return {
    initStorage
  }
}

export default useStorage
