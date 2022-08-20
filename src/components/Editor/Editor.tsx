import React from 'react'
import {Box} from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'
import {EditorState} from 'lexical'
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin'
import {$convertToMarkdownString, TRANSFORMERS} from '@lexical/markdown'

import useNote from '../../hooks/useNote'
import {setGlobalState} from '../../state'
import {debounce} from 'throttle-debounce'
import SavedNoteTransformPlugin from './Plugins/SavedNoteTransformPlugin'
import CharCounterPlugin from './Plugins/CharCounterPlugin'
import EnhancedAutoScrollPlugin from './Plugins/EnhancedAutoScrollPlugin'

const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph'
}

const onError = (error: any) => {
  console.error(error)
}

const Editor = () => {
  const {writeNote} = useNote()

  const initialConfig = {
    namespace: 'MajasEditor',
    theme,
    onError
  }

  const onChange = debounce(300, (editorState: EditorState) => {
    editorState.read(async () => {
      const markdown = $convertToMarkdownString(TRANSFORMERS)

      await writeNote(markdown || '')

      setGlobalState('isEditorProcessing', false)
    })
  })

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Box h="92%" mt="2">
        <SimpleBar style={{height: '100%'}}>
          <Box rounded="md" bgColor="primary.50" fontWeight={400}>
            <PlainTextPlugin
              contentEditable={<ContentEditable className="editorInput" />}
              placeholder=""
            />
            <OnChangePlugin onChange={onChange} ignoreSelectionChange />
            <EnhancedAutoScrollPlugin />
            <SavedNoteTransformPlugin />
            <CharCounterPlugin />
          </Box>
        </SimpleBar>
      </Box>
    </LexicalComposer>
  )
}

export default Editor
