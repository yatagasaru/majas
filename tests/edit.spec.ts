import {expect, test} from '@playwright/test'
import {injectNote, sleep} from './utils'

const URL = 'http://localhost:3000'

test('Load & edit existing note', async ({page}) => {
  await page.goto(URL)

  const {noteId} = await injectNote(page, ['test note'])

  await page.goto(URL + '/note/' + noteId[0])

  await expect(page).toHaveTitle(`${noteId[0]} - test note`)
  await expect(page.locator('p.editor-paragraph')).toContainText('test note')

  await page.fill('div.editorInput', 'edited')

  await sleep()

  await page.goto(URL + '/note/' + noteId[0])

  await expect(page).toHaveTitle(`${noteId[0]} - edited`)
  await expect(page.locator('p.editor-paragraph')).toContainText('edited')

  await page.goto(URL + '/note')

  await expect(page.locator('li >> text=edited')).toBeVisible()
})
