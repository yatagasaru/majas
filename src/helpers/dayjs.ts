import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localeData)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

export default dayjs
