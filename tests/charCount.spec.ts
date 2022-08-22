import {expect, test} from '@playwright/test'
import {injectNote} from './utils'

const URL = 'http://localhost:3000'

test.describe('Should correctly count characters length', () => {
  test('in existing note', async ({page}) => {
    await page.goto(URL)

    const {noteId} = await injectNote(page, ['test note'])

    await page.goto(URL + '/note/' + noteId[0])

    await expect(page.locator('text= 9 characters')).toBeVisible()

    await page.fill('div.editorInput', 'test note. Fill more')

    await expect(page.locator('text= 20 characters')).toBeVisible()
  })

  test('in new note', async ({page}) => {
    await page.goto(URL + '/note/new')

    await page.fill('div.editorInput', 'test note')

    await expect(page.locator('text= 9 characters')).toBeVisible({
      timeout: 300
    })
  })
})
