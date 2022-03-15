import {getItem, setItem} from './localStorage'

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

const initStorage = () => {
  try {
    const notes: Note[] = JSON.parse(getItem('Notes'))
    if (!notes.length) setItem('Notes', JSON.stringify([]))
  } catch {
    setItem('Notes', JSON.stringify([]))
  }

  try {
    const recentlyOpenedNotes: string[] = JSON.parse(
      getItem('RecentlyOpenedNotes')
    )
    if (!recentlyOpenedNotes.length)
      setItem('RecentlyOpenedNotes', JSON.stringify([]))
  } catch {
    setItem('RecentlyOpenedNotes', JSON.stringify([]))
  }
}

const readNote = () => {
  const notes: Note[] = JSON.parse(getItem('Notes'))

  return notes
}

const updateRecentlyOpened = (newId: string) => {
  const recentlyOpenedNotes: string[] = JSON.parse(
    getItem('RecentlyOpenedNotes')
  )

  const newRecently: string[] = recentlyOpenedNotes.filter(
    noteId => noteId !== newId
  )

  if (newRecently.length === 3) {
    newRecently.shift()
    newRecently.push(newId)
  } else {
    newRecently.push(newId)
  }

  setItem('RecentlyOpenedNotes', JSON.stringify(newRecently))
}

const newNote = (note: Note) => {
  const notes = readNote()

  notes.push(note)
  updateRecentlyOpened(note.id)

  setItem('Notes', JSON.stringify(notes))
}

const updateNote = (id: string, text: string) => {
  const notes = readNote()

  const newNotes = notes.map(note =>
    note.id === id ? {...note, updatedAt: new Date().toISOString(), text} : note
  )

  setItem('Notes', JSON.stringify(newNotes))
}

const getNotes = () => {
  const notes = readNote()

  return notes
}

const getNote = (id: string) => {
  const notes = readNote()

  const note = notes.find(note => note.id === id)

  if (note) {
    updateRecentlyOpened(id)
  }

  return note || null
}

const getRecentlyOpened = () => {
  const notes = readNote()
  const recentlyOpenedNotes: string[] = JSON.parse(
    getItem('RecentlyOpenedNotes')
  )

  const recentlyOpened: Note[] = []

  recentlyOpenedNotes.map(id => {
    const targetNote = notes.find(note => note.id === id)

    if (targetNote) {
      recentlyOpened.push(targetNote)
    }
  })

  return recentlyOpened
}

const removeNote = (id: string) => {
  const notes = readNote()

  const updatedNotes = notes.filter(note => note.id !== id)

  setItem('Notes', JSON.stringify(updatedNotes))
}

export {
  initStorage,
  newNote,
  updateNote,
  getNotes,
  getNote,
  getRecentlyOpened,
  removeNote
}
