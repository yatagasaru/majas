import {createGlobalState} from 'react-hooks-global-state'
import {Index} from 'flexsearch'

import {Note} from '../hooks/useStorage'

type ExpandingNoteListState = {
  isNoteListExpanded: boolean
}

type LastNoteListScroll = {
  lastScrollY: number
}

type SearchState = {
  isIndexSearching: boolean
  isIndexBuilding: boolean
  isIndexAdding: boolean
  searchResults: Note[]
  searchIndex: Index | null
}

type NotesState = {
  notes: Note[]
  recentlyOpenedNotes: Note[]
  currentNoteCharCount: number
  currentNoteId: string
  currentNote: Note | null
}

type InitialState = LastNoteListScroll &
  ExpandingNoteListState &
  SearchState &
  NotesState

const initialState: InitialState = {
  isNoteListExpanded: false,
  lastScrollY: 0,
  searchIndex: null,
  isIndexSearching: false,
  isIndexBuilding: false,
  isIndexAdding: false,
  searchResults: [],
  notes: [],
  recentlyOpenedNotes: [],
  currentNoteCharCount: 0,
  currentNoteId: '',
  currentNote: null
}

export const {setGlobalState, getGlobalState, useGlobalState} =
  createGlobalState(initialState)
