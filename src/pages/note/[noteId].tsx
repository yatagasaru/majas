import React, {useEffect, useState} from 'react'
import {Container} from '@chakra-ui/react'
import {useRouter} from 'next/router'

import Layout from '../../components/Layout'
import BackButton from '../../pageComponents/Notes/BackButton'
import Footer from '../../pageComponents/Notes/Footer'
import FullPageLoading from '../../components/FullPageLoading'
import Editor from '../../pageComponents/Notes/Editor'
import useNote from '../../hooks/useNote'
import useWindowSize from '../../hooks/useWindowSize'

const Note = () => {
  const {isMobile} = useWindowSize()
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
      <Container
        maxW="container.md"
        h="100%"
        overflow="hidden"
        pb={isMobile ? '7' : '0'}
      >
        <BackButton />
        <Editor />
      </Container>
      <Footer />
    </Layout>
  )
}

export default Note
