import React, {useEffect, useRef} from 'react'
import {Box} from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'
import {
  $createParagraphNode,
  $getRoot,
  $setSelection,
  CLEAR_HISTORY_COMMAND,
  EditorState
} from 'lexical'
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin'
// import {AutoScrollPlugin} from '@lexical/react/LexicalAutoScrollPlugin'
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'

import useNote from '../../../hooks/useNote'
import {setGlobalState, useGlobalState} from '../../../state'
import {debounce} from 'throttle-debounce'
import {countCharLength} from '../../../helpers/string'

const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph'
}

const EditorInit = () => {
  const [currentNote] = useGlobalState('currentNote')
  const [currentNoteId] = useGlobalState('currentNoteId')

  const {setCurrentNoteCharCount} = useNote()
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const editorListener = editor.registerTextContentListener(textContent => {
      const isSameLen =
        countCharLength(textContent) ===
        countCharLength(currentNote?.text || '')

      setGlobalState('isEditorProcessing', !isSameLen ? true : false)

      setCurrentNoteCharCount(textContent || '')
    })

    if (currentNoteId && currentNote) {
      editor.update(() => {
        const root = $getRoot()
        const paragrapNode = $createParagraphNode()
        const selection = paragrapNode.select()
        selection.insertRawText(currentNote.text)
        root.append(paragrapNode)
        // root.getFirstChild()?.remove()
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)

        $setSelection(null)
      })
    }

    return () => editorListener()
  }, [editor, currentNoteId])

  return null
}

const onError = (error: any) => {
  console.error(error)
}

const Editor = () => {
  const {writeNote} = useNote()

  const simpleBarScrollRef = useRef(null)
  const initialConfig = {
    namespace: 'MajasEditor',
    theme,
    onError
  }

  const onChange = debounce(300, (editorState: EditorState) => {
    editorState.read(async () => {
      await writeNote($getRoot().__cachedText || '')

      setGlobalState('isEditorProcessing', false)
    })
  })

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Box h="92%" mt="2">
        <SimpleBar
          style={{height: '100%'}}
          scrollableNodeProps={{ref: simpleBarScrollRef}}
        >
          <Box rounded="md" bgColor="primary.50" fontWeight={400}>
            <PlainTextPlugin
              contentEditable={<ContentEditable className="editorInput" />}
              placeholder=""
            />
            <OnChangePlugin onChange={onChange} ignoreSelectionChange />
            {/* <AutoScrollPlugin scrollRef={simpleBarScrollRef} /> */}
            <EditorInit />
          </Box>
        </SimpleBar>
      </Box>
    </LexicalComposer>
  )
}

export default Editor
