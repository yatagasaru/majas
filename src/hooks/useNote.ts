import {useEffect} from 'react'
import {createGlobalState} from 'react-hooks-global-state'

import {
  newNote,
  updateNote,
  getNote as gn,
  getNotes as gns,
  getRecentlyOpened as gro
} from '../helpers/storageAdapter'
import {generate} from '../helpers/nanoid'

type InitialState = {
  charCount: number
  currentNoteId: string
}

const initialState: InitialState = {
  charCount: 0,
  currentNoteId: ''
}

const {useGlobalState} = createGlobalState(initialState)

const countCharLength = (txt: string) => {
  return txt.replace(/[\r\n]+/g, ' ').length
}

const useNote = () => {
  const [charCount, setCharCount] = useGlobalState('charCount')
  const [currentNoteId, setCurrentNoteId] = useGlobalState('currentNoteId')

  useEffect(() => {
    return () => setCharCount(0)
  }, [])

  const writeNote = async (text: string) => {
    if (!currentNoteId) {
      const date = new Date().toISOString()
      const id = await generate()
      newNote({
        id,
        createdAt: date,
        updatedAt: date,
        text
      })

      setCurrentNoteId(id)
    } else {
      updateNote(currentNoteId, text)
    }
  }

  const getNote = (id: string) => gn(id)

  const getNotes = () => gns().reverse()

  const getRecentlyOpenedNotes = () => gro().reverse()

  return {
    charCount,
    currentNoteId,
    setCharCount,
    countCharLength,
    writeNote,
    setCurrentNoteId,
    getNote,
    getNotes,
    getRecentlyOpenedNotes
  }
}

export default useNote
