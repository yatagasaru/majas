import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(localeData)
dayjs.extend(customParseFormat)

export default dayjs
