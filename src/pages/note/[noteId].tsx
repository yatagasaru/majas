import React, {useEffect, useState} from 'react'
import {Container} from '@chakra-ui/react'
import {useRouter} from 'next/router'

import Layout from '../../components/Layout'
import BackButton from '../../pageComponents/Notes/BackButton'
import Footer from '../../pageComponents/Notes/Footer'
import TextBox from '../../pageComponents/Notes/TextBox'
import FullPageLoading from '../../components/FullPageLoading'
import {getNote} from '../../helpers/storageAdapter'
import useNote from '../../hooks/useNote'

const Note = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const {setCurrentNoteId} = useNote()

  const {noteId} = router.query

  useEffect(() => {
    if (noteId) {
      if (!getNote(noteId as string)) {
        router.replace('/new')
      } else {
        setCurrentNoteId(noteId as string)
        setIsLoading(false)
      }
    }
  }, [noteId])

  if (isLoading) return <FullPageLoading />

  return (
    <Layout>
      <Container maxW="container.md" h="100%" overflow="hidden">
        <BackButton />
        <TextBox />
      </Container>
      <Footer />
    </Layout>
  )
}

export default Note
