import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  KEY_ENTER_COMMAND
} from 'lexical'
import {useEffect, useRef, useState} from 'react'

const EnhancedAutoScrollPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [currentKey, setCurrentKey] = useState(0)

  const previousKey = useRef(0)
  const enterPressed = useRef(false)

  useEffect(() => {
    previousKey.current = currentKey
  }, [currentKey])

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
        // @ts-ignore: undocumented __children props
        const lastChildChild = lastChild?.__children
        const currentChildKey = lastChildChild[lastChildChild.length - 1] || 0

        setCurrentKey(currentChildKey)

        //detects if enter is pressed at the very bottom of the editor
        //and the editor should auto scroll to the newly created paragraph
        if (enterPressed.current) {
          if (currentChildKey > previousKey.current) {
            const anchorElement = editor.getElementByKey(currentChildKey)
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

export default EnhancedAutoScrollPlugin
