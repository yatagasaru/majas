import {expect, test} from '@playwright/test'
import {sleep} from './utils'

const URL = 'http://localhost:3000'

test('Load new note page', async ({page}) => {
  await page.goto(URL + '/note/new')

  await expect(page).toHaveTitle('Create new note')
})

test('Random/non exist note id should redirect to new note page', async ({
  page
}) => {
  await page.goto(URL + '/note/12osdnb0')

  await expect(page).toHaveTitle('Create new note')
})

test('Should be able to add new note', async ({page}) => {
  await page.goto(URL + '/note/new')

  await page.fill('div.editorInput', 'test note')

  await sleep()

  await page.goto(URL + '/note/')

  await expect(page.locator('li >> text=test')).toBeVisible()
})
