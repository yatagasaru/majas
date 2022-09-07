import React from 'react'
import {Box} from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'
import {$getRoot, $isParagraphNode, EditorState} from 'lexical'
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin'
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin'

import useNote from '../../hooks/useNote'
import {setGlobalState} from '../../state'
import {debounce} from 'throttle-debounce'
import SavedNoteTransformPlugin from './Plugins/SavedNoteTransformPlugin'
import CharCounterPlugin from './Plugins/CharCounterPlugin'
import {AutoScrollRichTextPlugin} from './Plugins/EnhancedAutoScrollPlugin'

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
      const children = $getRoot().getChildren()

      const plainText = []

      for (let i = 0; i < children.length; i++) {
        if ($isParagraphNode(children[i])) {
          if (children[i].isEmpty()) {
            plainText.push('\n')
          } else {
            //firefox for android will append \n when enter pressed
            //make sure that each paragraph can only contain a single \n
            plainText.push(
              children[i].getTextContent().trimEnd() +
                (i === children.length - 1 ? '' : '\n')
            )
          }
        }
      }

      await writeNote(plainText.join('') || '')

      setGlobalState('isEditorProcessing', false)
    })
  })

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Box h="92%" mt="2">
        <SimpleBar style={{height: '100%'}}>
          <Box rounded="md" bgColor="primary.50" fontWeight={400}>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editorInput" />}
              placeholder=""
            />
            <OnChangePlugin onChange={onChange} ignoreSelectionChange />
            <AutoScrollRichTextPlugin />
            <SavedNoteTransformPlugin />
            <CharCounterPlugin />
            <HistoryPlugin />
          </Box>
        </SimpleBar>
      </Box>
    </LexicalComposer>
  )
}

export default Editor
