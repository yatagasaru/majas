import React, {useEffect, useRef} from 'react'
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  EditorState
} from 'lexical'
import LexicalComposer from '@lexical/react/LexicalComposer'
import LexicalPlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin'
import LexicalContentEditable from '@lexical/react/LexicalContentEditable'
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin'
import LexicalAutoScrollPlugin from '@lexical/react/LexicalAutoScrollPlugin'
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import {Box} from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'
import useNote from '../../../hooks/useNote'

const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph'
}

const MyCustomAutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.focus()
    console.log(editor.getEditorState().toJSON())
  }, [editor])

  return null
}

const MyCustomNoteInit = () => {
  const {currentNote, currentNoteId} = useNote()
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (currentNoteId && currentNote) {
      editor.update(() => {
        const root = $getRoot()
        const paragraphNode = $createParagraphNode()
        const textNode = $createTextNode(currentNote.text)
        paragraphNode.append(textNode)
        root.getFirstChild()?.remove()
        root.append(paragraphNode)
        root.collapseAtStart(root.selectEnd())
      })
    }
  }, [editor, currentNoteId])

  return null
}

const onError = (error: any) => {
  console.error(error)
}

const Editor = () => {
  const {writeNote, setCurrentNoteCharCount} = useNote()

  const simpleBarScrollRef = useRef(null)
  const initialConfig = {
    theme,
    onError
  }

  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot()
      console.log(root.__cachedText)
      writeNote(root.__cachedText || '')
      setCurrentNoteCharCount(root.__cachedText || '')
    })
    console.log(editorState.toJSON())
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Box h="92%" mt="2">
        <SimpleBar
          style={{height: '100%'}}
          scrollableNodeProps={{ref: simpleBarScrollRef}}
        >
          <Box rounded="md" bgColor="primary.50" fontWeight={400}>
            <LexicalPlainTextPlugin
              contentEditable={
                <LexicalContentEditable className="editorInput" />
              }
              placeholder={null}
            />
            <LexicalOnChangePlugin onChange={onChange} />
            <MyCustomAutoFocusPlugin />
            <LexicalAutoScrollPlugin scrollRef={simpleBarScrollRef} />
            <MyCustomNoteInit />
          </Box>
        </SimpleBar>
      </Box>
    </LexicalComposer>
  )
}

export default Editor
