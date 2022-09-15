import {useEffect} from 'react'
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import {
  $getRoot,
  $setSelection,
  $createParagraphNode,
  $createTextNode,
  $createLineBreakNode,
  CLEAR_EDITOR_COMMAND
} from 'lexical'

import {useGlobalState} from '../../../../state'

const SavedNoteTransformPlugin = () => {
  const [currentNote] = useGlobalState('currentNote')
  const [currentNoteId] = useGlobalState('currentNoteId')
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (currentNoteId && currentNote) {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)

      editor.update(() => {
        const root = $getRoot()

        const lines = currentNote.text.split('\n')

        //remove last line if previous line is emptry string ''
        //because text.split('\n') append empty string to the array
        //if the last line is newline (\n)
        if (lines[lines.length - 1] === '' && lines[lines.length - 2] === '') {
          lines.pop()
        }

        for (const line of lines) {
          let paragraphNode = $createParagraphNode()
          if (line === '\n') {
            paragraphNode = $createParagraphNode().append(
              $createLineBreakNode()
            )
          } else {
            paragraphNode = $createParagraphNode().append($createTextNode(line))
          }
          root.append(paragraphNode)
        }

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
