import {useEffect} from 'react'
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import {$getRoot, CLEAR_HISTORY_COMMAND, $setSelection} from 'lexical'

import {useGlobalState} from '../../../../state'

const SavedNoteTransformPlugin = () => {
  const [currentNote] = useGlobalState('currentNote')
  const [currentNoteId] = useGlobalState('currentNoteId')
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (currentNoteId && currentNote) {
      editor.update(() => {
        const root = $getRoot()
        const selection = root.select()
        selection.insertRawText(currentNote.text)
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)

        $setSelection(null)

        //remove the rogue paragraphNode
        //empty paragraphNode appears to prepended by lexical if loaded note line < 2
        const rootChild = root.getChildren()
        if (rootChild.length > 1) {
          root.getFirstChild()?.remove()
        }
      })
    }
  }, [editor, currentNoteId])

  return null
}

export default SavedNoteTransformPlugin
