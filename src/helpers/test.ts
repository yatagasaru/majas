import {Index} from 'flexsearch'

export const idx = new Index({
  charset: 'latin:advanced',
  tokenize: 'reverse',
  cache: true
})
