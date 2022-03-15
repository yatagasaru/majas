import React, {ClipboardEvent, FormEvent, useEffect} from 'react'
import {Box} from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import useNote from '../../../hooks/useNote'

let noteBox: HTMLDivElement

const TextBox = () => {
  const {
    charCount,
    setCharCount,
    writeNote,
    countCharLength,
    currentNoteId,
    getNote
  } = useNote()

  useEffect(() => {
    noteBox = document.querySelector('#noteBox')! as HTMLDivElement
  }, [])

  useEffect(() => {
    if (currentNoteId) {
      const note = getNote(currentNoteId)

      if (note) {
        noteBox.innerText = note.text

        noteBox.focus()

        const range = document.createRange()
        const selection = window.getSelection()

        range.selectNodeContents(noteBox)
        range.collapse(false)

        selection?.removeAllRanges()
        selection?.addRange(range)

        setCharCount(countCharLength(note.text))
      }
    }
  }, [currentNoteId])

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData('text/plain')

    const selection = window.getSelection()
    if (selection) {
      if (!selection.rangeCount) return false
      selection.deleteFromDocument()
      selection.getRangeAt(0).insertNode(document.createTextNode(text))
    }

    writeNote(noteBox.innerText)

    setCharCount(charCount + countCharLength(text))

    e.preventDefault()
  }

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText

    writeNote(text)
    setCharCount(countCharLength(text))
  }

  return (
    <Box h="92%" mt="2">
      <SimpleBar style={{height: '100%'}}>
        <Box
          ref={ref => ref?.focus()}
          spellCheck={false}
          id="noteBox"
          bgColor="primary.50"
          contentEditable="true"
          lineHeight="1.3"
          fontWeight="300"
          pos="relative"
          p="3"
          rounded="md"
          _focusVisible={{outline: 'none'}}
          onPaste={e => handlePaste(e)}
          onInput={handleInput}
        />
      </SimpleBar>
    </Box>
  )
}

export default TextBox
