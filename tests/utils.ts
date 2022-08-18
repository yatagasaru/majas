import {Page} from '@playwright/test'
import {generate} from '../src/helpers/nanoid'
import {Note} from '../src/hooks/useStorage'

const injectNote = async (page: Page, texts: string[]) => {
  const noteId: string[] = []

  const notes: Note[] = []

  for (const text of texts) {
    const id = await generate()
    noteId.push(id)
    notes.push({
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      text
    })
  }

  const stringed = JSON.stringify(notes)

  await page.evaluate(
    `window.localStorage.setItem('majas-notes-app-Notes', '${stringed}')`
  )

  return {noteId}
}

const sleep = async (dur?: number) =>
  new Promise(r => setTimeout(r, dur || 400))

export {injectNote, sleep}
