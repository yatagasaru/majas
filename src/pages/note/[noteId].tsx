import React, {useEffect, useState} from 'react'
import {Container} from '@chakra-ui/react'
import {useRouter} from 'next/router'

import Layout from '../../components/Layout'
import BackButton from '../../pageComponents/Notes/BackButton'
import Footer from '../../pageComponents/Notes/Footer'
import FullPageLoading from '../../components/FullPageLoading'
import Editor from '../../pageComponents/Notes/Editor'
import useNote from '../../hooks/useNote'

const Note = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const {getNote} = useNote()

  const {noteId} = router.query

  useEffect(() => {
    if (noteId) {
      const isNoteExist = getNote(noteId as string)

      if (!isNoteExist) {
        router.replace('/new')
      } else {
        setIsLoading(false)
      }
    }
  }, [noteId])

  if (isLoading) return <FullPageLoading />

  return (
    <Layout>
      <Container maxW="container.md" h="100%" overflow="hidden">
        <BackButton />
        <Editor />
      </Container>
      <Footer />
    </Layout>
  )
}

export default Note
