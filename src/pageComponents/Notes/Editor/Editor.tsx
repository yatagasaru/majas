import React, {useEffect, useRef} from 'react'
import {Box} from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $setSelection,
  EditorState
} from 'lexical'
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin'
import {AutoScrollPlugin} from '@lexical/react/LexicalAutoScrollPlugin'
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
    let editorListener = () => {}

    if (currentNoteId && currentNote) {
      editor.update(() => {
        const root = $getRoot()
        const paragraphNode = $createParagraphNode()
        const textNode = $createTextNode(currentNote.text)
        paragraphNode.append(textNode)
        root.getFirstChild()?.remove()
        root.append(paragraphNode)
        root.collapseAtStart(root.selectEnd())
        $setSelection(null)

        editorListener = editor.registerTextContentListener(textContent => {
          countCharLength(textContent) !== countCharLength(currentNote.text) &&
            setGlobalState('isEditorProcessing', true)

          setCurrentNoteCharCount(textContent || '')
        })
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
      const root = $getRoot()
      await writeNote(root.__cachedText || '')

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
              placeholder={null}
            />
            <OnChangePlugin onChange={onChange} ignoreSelectionChange />
            <AutoScrollPlugin scrollRef={simpleBarScrollRef} />
            <EditorInit />
            {/* <CharCounter /> */}
          </Box>
        </SimpleBar>
      </Box>
    </LexicalComposer>
  )
}

export default Editor
