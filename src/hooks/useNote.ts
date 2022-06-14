import {useEffect} from 'react'
import {createGlobalState} from 'react-hooks-global-state'
import {Index} from 'flexsearch'
import {debounce} from 'throttle-debounce'

import {countCharLength} from '../helpers/string'
import {Note} from './useStorage'
import {generate} from '../helpers/nanoid'
import {writeNoteToStorage} from '../helpers/storage'

type InitialState = {
  currentNoteCharCount: number
  notes: Note[]
  recentlyOpenedNotes: Note[]
  currentNoteId: string
  currentNote: Note | null
  isIndexBuilding: boolean
  isIndexSearching: boolean
  isIndexAdding: boolean
  index: Index | null
  searchResults: Note[]
}

const initialState: InitialState = {
  currentNoteCharCount: 0,
  notes: [],
  recentlyOpenedNotes: [],
  currentNoteId: '',
  currentNote: null,
  isIndexBuilding: false,
  isIndexSearching: false,
  isIndexAdding: false,
  index: null,
  searchResults: []
}

const {useGlobalState} = createGlobalState(initialState)

const useNote = () => {
  const [currentNoteCharCount, _setCurrentNoteCharCount] = useGlobalState(
    'currentNoteCharCount'
  )
  const [notes, setNotes] = useGlobalState('notes')
  const [recentlyOpenedNotes, setRecentlyOpenedNotes] = useGlobalState(
    'recentlyOpenedNotes'
  )
  const [currentNoteId, setCurrentNoteId] = useGlobalState('currentNoteId')
  const [currentNote, setCurrentNote] = useGlobalState('currentNote')

  const [isIndexBuilding, setIsIndexBuilding] =
    useGlobalState('isIndexBuilding')
  const [isIndexSearching, setIsIndexSearching] =
    useGlobalState('isIndexSearching')
  const [isIndexAdding, setIsIndexAdding] = useGlobalState('isIndexAdding')
  const [searchResults, setSearchResults] = useGlobalState('searchResults')
  const [index, setIndex] = useGlobalState('index')

  useEffect(() => {
    return () => _setCurrentNoteCharCount(0)
  }, [])

  const getNote = (id: string) => {
    const note = notes.find(note => note.id === id)

    setCurrentNote(note || null)

    if (note) {
      setCurrentNoteId(note.id)
      _setCurrentNoteCharCount(countCharLength(note.text))
      updateRecentlyOpened(note)

      return true
    } else {
      return false
    }
  }

  const writeNote = async (text: string) => {
    if (!currentNoteId) {
      //create new note
      const date = new Date().toISOString()
      const id = await generate()

      const newNote: Note = {
        id,
        createdAt: date,
        updatedAt: date,
        text
      }

      const newNotes = [newNote].concat(notes)

      setCurrentNoteId(id)
      setNotes(newNotes)
      writeNoteToStorage('Notes', newNotes)
      updateRecentlyOpened(newNote)

      await addIndex(id, text)
    } else {
      //update existing note
      const updatedAt = new Date().toISOString()

      const newNotes = notes.map(note =>
        note.id === currentNoteId ? {...note, updatedAt, text} : note
      )

      setNotes(newNotes)
      writeNoteToStorage('Notes', newNotes)

      const newRecentlyOpened = recentlyOpenedNotes
      newRecentlyOpened[0].text = text
      newRecentlyOpened[0].updatedAt = updatedAt
      setRecentlyOpenedNotes(newRecentlyOpened)

      await updateIndex(currentNoteId, text)
    }
  }

  const removeNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id)
    const updatedRecentlyOpened = recentlyOpenedNotes.filter(
      note => note.id !== id
    )

    console.log('updatedRecentlyOpened', updatedRecentlyOpened)

    setNotes(updatedNotes)
    setRecentlyOpenedNotes(updatedRecentlyOpened)

    writeNoteToStorage('Notes', updatedNotes)
    writeNoteToStorage(
      'RecentlyOpenedNotes',
      updatedRecentlyOpened.map(recentNote => recentNote.id)
    )

    removeIndex(id)
  }

  const updateRecentlyOpened = (note: Note) => {
    const newRecently: Note[] = recentlyOpenedNotes.filter(
      recentlyNote => recentlyNote.id !== note.id
    )

    if (newRecently.length === 3) {
      newRecently.pop()
      newRecently.unshift(note)
    } else {
      newRecently.unshift(note)
    }

    setRecentlyOpenedNotes(newRecently)

    writeNoteToStorage(
      'RecentlyOpenedNotes',
      newRecently.map(note => note.id)
    )
  }

  const setCurrentNoteCharCount = (text: string | null | undefined) => {
    _setCurrentNoteCharCount(countCharLength(text || ''))
  }

  const clearCurrent = () => {
    setCurrentNote(null)
    setCurrentNoteId('')
    _setCurrentNoteCharCount(0)
  }

  const initSearchIndex = async (docs: Note[]) => {
    if (index instanceof Index) return

    setIsIndexBuilding(true)

    const idx = new Index({
      charset: 'latin:advanced',
      tokenize: 'reverse',
      cache: true
    })
    for (const note of docs) {
      await idx.addAsync(note.id, note.text)
    }

    setIndex(idx)
    setIsIndexBuilding(false)
  }

  const search = debounce(150, async (serchVal: string) => {
    if (!index) return

    setIsIndexSearching(true)

    const res = await index.searchAsync(serchVal)

    const results = res.map(id => notes.find(note => note.id === id) as Note)

    setSearchResults(results)
    setIsIndexSearching(false)
  })

  const addIndex = async (id: string, text: string) => {
    if (!index) return

    setIsIndexAdding(true)

    await index.addAsync(id, text)

    setIsIndexAdding(false)
  }

  const updateIndex = async (id: string, text: string) => {
    if (!index) return

    await index.updateAsync(id, text)
  }

  const removeIndex = async (id: string) => {
    if (!index) return

    await index.removeAsync(id)
  }

  return {
    currentNoteCharCount,
    notes,
    recentlyOpenedNotes,
    currentNoteId,
    currentNote,
    isIndexBuilding,
    isIndexAdding,
    isIndexSearching,
    searchResults,
    setNotes,
    setRecentlyOpenedNotes,
    setCurrentNoteCharCount,
    setCurrentNoteId,
    getNote,
    writeNote,
    removeNote,
    clearCurrent,
    initSearchIndex,
    search,
    setSearchResults
  }
}

export default useNote
