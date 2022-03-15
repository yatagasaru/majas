import {customAlphabet} from 'nanoid/async'

const CUSTOM = '0123456789abcdefghijklmnopqrstuvwxyz'

const nanoid = customAlphabet(CUSTOM, 6)

export const generate = async () => Promise.resolve(await nanoid())
