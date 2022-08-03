import {Index} from 'flexsearch'
import {debounce} from 'throttle-debounce'

import {setGlobalState, getGlobalState} from '../state'
import {Note} from './useStorage'

const useSearch = () => {
  const search = debounce(150, async (serchVal: string) => {
    const index = getGlobalState('searchIndex')

    if (!index) return

    setGlobalState('isIndexSearching', true)

    const res = await index.searchAsync(serchVal)

    const results = res.map(
      id => getGlobalState('notes').find(note => note.id === id) as Note
    )

    setGlobalState('searchResults', results)
    setGlobalState('isIndexSearching', false)
  })

  const initSearchIndex = async (docs: Note[]) => {
    const index = getGlobalState('searchIndex')

    if (index instanceof Index) return

    setGlobalState('isIndexBuilding', true)

    const idx = new Index({
      charset: 'latin:advanced',
      tokenize: 'reverse',
      cache: true
    })
    for (const note of docs) {
      await idx.addAsync(note.id, note.text)
    }

    setGlobalState('searchIndex', idx)
    setGlobalState('isIndexBuilding', true)
  }

  const addIndex = async (id: string, text: string) => {
    const index = getGlobalState('searchIndex')
    const notes = getGlobalState('notes')

    if (!index && !notes.length) return

    if (!index) {
      // first note. create index from global note state
      initSearchIndex(notes)
    } else {
      setGlobalState('isIndexAdding', true)

      await index.addAsync(id, text)

      setGlobalState('isIndexAdding', false)
    }
  }

  const updateIndex = async (id: string, text: string) => {
    const index = getGlobalState('searchIndex')

    if (!index) return

    await index.updateAsync(id, text)
  }

  const removeIndex = async (id: string) => {
    const index = getGlobalState('searchIndex')

    if (!index) return

    await index.removeAsync(id)
  }

  return {
    search,
    initSearchIndex,
    addIndex,
    updateIndex,
    removeIndex
  }
}

export default useSearch
