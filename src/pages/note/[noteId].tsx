import React, {useEffect, useState} from 'react'
import {Container} from '@chakra-ui/react'
import {useRouter} from 'next/router'

import Layout from '../../components/Layout'
import FullPageLoading from '../../components/FullPageLoading'
import Editor from '../../components/Editor'
import useNote from '../../hooks/useNote'
import useWindowSize from '../../hooks/useWindowSize'
import MetaTags from '../../components/MetaTags'
import {useGlobalState} from '../../state'
import Header from '../../pageComponents/Notes/Header'

const Note = () => {
  const {isMobile} = useWindowSize()
  const router = useRouter()
  const {getNote} = useNote()

  const [isLoading, setIsLoading] = useState(true)
  const [currentNote] = useGlobalState('currentNote')

  const {noteId} = router.query

  const pageTitle = currentNote
    ? currentNote.text.length > 10
      ? currentNote.text.slice(0, 50) + '...'
      : currentNote.text
    : ''

  useEffect(() => {
    if (noteId) {
      const isNoteExist = getNote(noteId as string)

      if (!isNoteExist) {
        router.replace('/note/new')
      } else {
        setIsLoading(false)
      }
    }
  }, [noteId])

  if (isLoading) return <FullPageLoading />

  return (
    <Layout>
      <MetaTags page="app-read" title={`${noteId} - ${pageTitle}`} />
      <Container maxW="container.md" h="100%" pb={isMobile ? '7' : '0'}>
        <Header />
        <Editor />
      </Container>
    </Layout>
  )
}

export default Note
