import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  KEY_ENTER_COMMAND
} from 'lexical'
import {useEffect, useRef} from 'react'

const AutoScrollRichTextPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const enterPressed = useRef(false)

  useEffect(() => {
    const enterComm = editor.registerCommand(
      KEY_ENTER_COMMAND,
      () => {
        enterPressed.current = true
        return false
      },
      COMMAND_PRIORITY_HIGH
    )

    const updateListener = editor.registerUpdateListener(({editorState}) => {
      editorState.read(() => {
        const selection = $getSelection()

        if (!$isRangeSelection(selection)) return

        const lastChild = $getRoot().getLastChild()

        //detects if enter is pressed at the very bottom of the editor
        //and the editor should auto scroll to the newly created paragraph
        if (enterPressed.current) {
          if (lastChild?.__key === selection.anchor.key) {
            const anchorElement = editor.getElementByKey(lastChild?.__key)
            anchorElement?.scrollIntoView()
          }
          enterPressed.current = false
        }
      })
    })

    return () => {
      enterComm()
      updateListener()
    }
  }, [editor])
  return null
}

export default AutoScrollRichTextPlugin
