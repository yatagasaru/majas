import Head from 'next/head'

import {BASE_URL} from '../../statics'

type MetaPageType =
  | 'home'
  | 'pricing'
  | 'app-dashboard'
  | 'app-new'
  | 'app-read'
  | '404'

type Props = {
  page: MetaPageType
  title?: string
  description?: string
}

const MetaTags = (props: Props) => {
  const {page, title, description} = props

  const switchTag = (page: MetaPageType) => {
    const tgs = {
      title: '',
      url: BASE_URL,
      description:
        'Simple and straightforward day-to-day note taking app with unlimited full text search and backup-restore for you to enjoy'
    }

    switch (page) {
      case 'home':
        tgs.title =
          'MAJAS - Simple and straightforward. Your day-to-day note taking app'
        break
      case 'pricing':
        tgs.title = 'MAJAS - Free forever!'
        tgs.url = `${BASE_URL}/pricing`
        tgs.description = "It ain't much, but it's honest work"
        break
      case 'app-dashboard':
        tgs.title = 'Dashboard'
        tgs.url = `${BASE_URL}/note`
        break
      case 'app-new':
        tgs.title = 'Create new note'
        tgs.url = `${BASE_URL}/note/new`
        break
      case 'app-read':
        tgs.url = `${BASE_URL}/note`
      case '404':
        tgs.title = 'MAJAS - 404'
        break
      default:
        tgs.title = 'MAJAS - 404'
    }

    if (title) tgs.title = title
    if (description) tgs.description = description

    return tgs
  }

  return (
    <Head>
      <title>{switchTag(page).title}</title>
      <meta property="og:url" name="og:url" content={switchTag(page).url} />
      <meta
        property="og:title"
        name="og:title"
        content={switchTag(page).title}
      />
      <meta name="description" content={switchTag(page).description} />
      <meta property="og:type" name="og:type" content="website" />
      <meta
        property="og:description"
        name="og:description"
        content={switchTag(page).description}
      />
      <meta
        property="twitter:url"
        name="twitter:url"
        content={switchTag(page).url}
      />
      <meta
        property="twitter:title"
        name="twitter:title"
        content={switchTag(page).title}
      />
      <meta
        property="twitter:description"
        name="twitter:description"
        content={switchTag(page).description}
      />
    </Head>
  )
}

export default MetaTags
