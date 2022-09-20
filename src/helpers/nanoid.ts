import {customAlphabet} from 'nanoid/async'

const CUSTOM = '0123456789abcdefghijklmnopqrstuvwxyz'

const generate = customAlphabet(CUSTOM, 6)

export {generate}
