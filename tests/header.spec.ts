import {expect, Page, test} from '@playwright/test'

const URL = 'http://localhost:3000'

const visibleHeader = async (page: Page) => {
  const headerPath = 'div#__next>header>div.chakra-container'

  const header = page.locator(headerPath)
  const majasIcon = page.locator('a.chakra-heading')
  const searchBox = page.locator('div.chakra-input__group')
  const newNoteButton = page.locator('css=[aria-label="new note"]')
  const moreButton = page.locator('css=[aria-label="more option"]')

  await expect(header).toBeVisible()

  await expect(page.locator(headerPath, {has: majasIcon})).toContainText(
    'M A J A S'
  )
  await expect(page.locator(headerPath, {has: searchBox})).toBeVisible()
  await expect(newNoteButton).toBeVisible()
  await expect(newNoteButton).toHaveAttribute('href', '/note/new')
  await expect(moreButton).toBeVisible()
}

test.describe('Header should be visible', () => {
  test('in home', async ({page}) => {
    await page.goto(URL)
    await visibleHeader(page)
  })

  test('in pricing', async ({page}) => {
    await page.goto(URL + '/pricing')
    await visibleHeader(page)
  })

  test('in dashboard', async ({page}) => {
    await page.goto(URL + '/note')
    await visibleHeader(page)
  })

  test('in new note', async ({page}) => {
    await page.goto(URL + '/note/new')
    await visibleHeader(page)
  })

  test('in 404', async ({page}) => {
    await page.goto(URL + '/404')
    await visibleHeader(page)
  })
})
