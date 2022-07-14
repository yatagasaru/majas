import {pattern, string} from 'superstruct'

const JsISOString = () =>
  pattern(string(), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)

export {JsISOString}
