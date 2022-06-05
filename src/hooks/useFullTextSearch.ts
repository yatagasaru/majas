import {Index} from 'flexsearch'
import {createGlobalState} from 'react-hooks-global-state'
import useNote from './useNote'
import {Note} from './useStorage'

// type DocumentIndex = {
//   document: {
//     index: ['text']
//   }
// }

type InitialState = {
  isIndexBuilding: boolean
  isIndexSearching: boolean
  index: Index | null
  searchResults: Note[]
}

const initialState: InitialState = {
  isIndexBuilding: false,
  isIndexSearching: false,
  index: null,
  searchResults: []
}

const {useGlobalState} = createGlobalState(initialState)

const useFullTextSearch = () => {
  const [isIndexBuilding, setIsIndexBuilding] =
    useGlobalState('isIndexBuilding')
  const [isIndexSearching, setIsIndexSearching] =
    useGlobalState('isIndexSearching')
  const [searchResults, setSearchResults] = useGlobalState('searchResults')
  const [index, setIndex] = useGlobalState('index')

  const {notes} = useNote()

  const initSearchIndex = async (docs: Note[]) => {
    if (index instanceof Index) return

    setIsIndexBuilding(true)

    const idx = new Index({tokenize: 'reverse', cache: true})
    for (const note of docs) {
      await idx.addAsync(note.id, note.text)
    }

    setIndex(idx)
    setIsIndexBuilding(false)
  }

  const search = async (serchVal: string) => {
    if (!index) return

    setIsIndexSearching(true)

    const res = await index.searchAsync(serchVal)

    const results = res.map(id => notes.find(note => note.id === id) as Note)

    setSearchResults(results)
    setIsIndexSearching(false)
  }

  return {
    initSearchIndex,
    search,
    isIndexBuilding,
    isIndexSearching,
    searchResults,
    index
  }
}

export default useFullTextSearch
