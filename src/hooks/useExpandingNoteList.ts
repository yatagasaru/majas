import {createGlobalState} from 'react-hooks-global-state'

type InitialState = {
  isNoteListExpanded: boolean
}

const initialState: InitialState = {
  isNoteListExpanded: false
}

const {useGlobalState} = createGlobalState(initialState)

const useExpandingNoteList = () => {
  const [isNoteListExpanded, setIsNoteListExpanded] =
    useGlobalState('isNoteListExpanded')

  return {
    isNoteListExpanded,
    setIsNoteListExpanded
  }
}

export default useExpandingNoteList
