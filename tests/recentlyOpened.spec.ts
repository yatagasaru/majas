import {expect, test} from '@playwright/test'
import {injectNote} from './utils'

const URL = 'http://localhost:3000'

test('Should correctly display recently opened sequences', async ({page}) => {
  await page.goto(URL)

  const {noteId} = await injectNote(page, [
    'test note 1',
    'test note 2',
    'test note 3'
  ])

  await page.goto(URL + '/note/' + noteId[0])
  await page.goto(URL + '/note')
  //test note 1 should be the first recently opened note
  expect(
    await page
      .locator('div.simplebar-content div.chakra-stack > div')
      .nth(0)
      .locator('a p')
      .nth(-1)
      .textContent()
  ).toEqual('test note 1')

  await page.goto(URL + '/note/' + noteId[1])
  await page.goBack()
  //test note 1 should be the second recently opened note
  expect(
    await page
      .locator('div.simplebar-content div.chakra-stack > div')
      .nth(1)
      .locator('a p')
      .nth(-1)
      .textContent()
  ).toEqual('test note 1')

  await page.goto(URL + '/note/' + noteId[2])
  await page.goBack()
  //test note 1 should be the third recently opened note
  expect(
    await page
      .locator('div.simplebar-content div.chakra-stack > div')
      .nth(2)
      .locator('a p')
      .nth(-1)
      .textContent()
  ).toEqual('test note 1')
})
