import {getGlobalState, setGlobalState} from '../state'
import {countCharLength} from '../helpers/string'
import {Note} from './useStorage'
import {generate} from '../helpers/nanoid'
import {writeNoteToStorage} from '../helpers/storage'
import useSearch from './useSearch'

const REC_NOTES_MAX_LEN = 5

const useNote = () => {
  const {addIndex, updateIndex, removeIndex} = useSearch()

  const getNote = (id: string) => {
    const note = getGlobalState('notes').find(note => note.id === id)

    setGlobalState('currentNote', note || null)

    if (note) {
      setGlobalState('currentNoteId', note.id)
      setCurrentNoteCharCount(note.text)
      updateRecentlyOpened(note)

      return true
    } else {
      return false
    }
  }

  const writeNote = async (text: string) => {
    if (!getGlobalState('currentNoteId')) {
      //create new note
      const date = new Date().toISOString()
      const id = await generate()

      const newNote: Note = {
        id,
        createdAt: date,
        updatedAt: date,
        text
      }

      const newNotes = [newNote].concat(getGlobalState('notes'))

      setGlobalState('currentNoteId', id)
      setGlobalState('notes', newNotes)
      writeNoteToStorage('Notes', newNotes)
      updateRecentlyOpened(newNote)

      await addIndex(id, text)
    } else {
      //update existing note
      const updatedAt = new Date().toISOString()

      const newNotes = getGlobalState('notes').map(note =>
        note.id === getGlobalState('currentNoteId')
          ? {...note, updatedAt, text}
          : note
      )

      setGlobalState('notes', newNotes)
      writeNoteToStorage('Notes', newNotes)

      const newRecentlyOpened = getGlobalState('recentlyOpenedNotes')
      newRecentlyOpened[0].text = text
      newRecentlyOpened[0].updatedAt = updatedAt
      setGlobalState('recentlyOpenedNotes', newRecentlyOpened)

      await updateIndex(getGlobalState('currentNoteId'), text)
    }
  }

  const removeNote = (id: string) => {
    const updatedNotes = getGlobalState('notes').filter(note => note.id !== id)
    const updatedRecentlyOpened = getGlobalState('recentlyOpenedNotes').filter(
      note => note.id !== id
    )

    setGlobalState('notes', updatedNotes)
    setGlobalState('recentlyOpenedNotes', updatedRecentlyOpened)

    writeNoteToStorage('Notes', updatedNotes)
    writeNoteToStorage(
      'RecentlyOpenedNotes',
      updatedRecentlyOpened.map(recentNote => recentNote.id)
    )

    removeIndex(id)
  }

  const updateRecentlyOpened = (note: Note) => {
    const newRecently: Note[] = getGlobalState('recentlyOpenedNotes').filter(
      recentlyNote => recentlyNote.id !== note.id
    )

    if (newRecently.length === REC_NOTES_MAX_LEN) {
      newRecently.pop()
      newRecently.unshift(note)
    } else {
      newRecently.unshift(note)
    }

    setGlobalState('recentlyOpenedNotes', newRecently)

    writeNoteToStorage(
      'RecentlyOpenedNotes',
      newRecently.map(note => note.id)
    )
  }

  const setCurrentNoteCharCount = (
    input: string | number | null | undefined
  ) => {
    if (typeof input === 'number') {
      setGlobalState('currentNoteCharCount', input)
    } else {
      setGlobalState('currentNoteCharCount', countCharLength(input || ''))
    }
  }

  const clearCurrent = () => {
    setGlobalState('currentNote', null)
    setGlobalState('currentNoteId', '')
    setCurrentNoteCharCount(0)
  }

  return {
    setCurrentNoteCharCount,
    getNote,
    writeNote,
    removeNote,
    clearCurrent
  }
}

export default useNote
