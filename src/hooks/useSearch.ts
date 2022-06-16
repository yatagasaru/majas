import {createGlobalState} from 'react-hooks-global-state'
import {debounce} from 'throttle-debounce'
import useNote from './useNote'
import {Note} from './useStorage'

type InitialState = {
  isIndexSearching: boolean
  searchResults: Note[]
}

const initialState: InitialState = {
  isIndexSearching: false,
  searchResults: []
}

const {useGlobalState} = createGlobalState(initialState)

const useSearch = () => {
  const {index, notes} = useNote()

  const [searchResults, setSearchResults] = useGlobalState('searchResults')
  const [isIndexSearching, setIsIndexSearching] =
    useGlobalState('isIndexSearching')

  const search = debounce(150, async (serchVal: string) => {
    if (!index) return

    setIsIndexSearching(true)

    const res = await index.searchAsync(serchVal)

    const results = res.map(id => notes.find(note => note.id === id) as Note)

    setSearchResults(results)
    setIsIndexSearching(false)
  })

  return {
    search,
    setSearchResults,
    searchResults,
    isIndexSearching
  }
}

export default useSearch
