import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import {useEffect} from 'react'
import {countCharLength} from '../../../../helpers/string'
import useNote from '../../../../hooks/useNote'
import {setGlobalState, useGlobalState} from '../../../../state'

const CharCounterPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [currentNote] = useGlobalState('currentNote')
  const {setCurrentNoteCharCount} = useNote()

  useEffect(() => {
    const editorListener = editor.registerTextContentListener(textContent => {
      const isSameLen =
        countCharLength(textContent) ===
        countCharLength(currentNote?.text || '')

      setGlobalState('isEditorProcessing', !isSameLen ? true : false)

      setCurrentNoteCharCount(textContent || '')
    })

    return () => editorListener()
  }, [editor])

  return null
}

export default CharCounterPlugin
