import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

const activePath = ['/', 'new', 'home'] as const
export type ActivePath = typeof activePath[number]
export const DEFAULT_PATH: ActivePath = '/'

const isActivePath = (ap: any): ap is ActivePath => activePath.includes(ap)

const usePath = () => {
  const router = useRouter()
  const [active, setActive] = useState<ActivePath>(DEFAULT_PATH)
  const [is404, setIs404] = useState(false)

  useEffect(() => {
    if (router.pathname === '/') {
      setActive('/')
    } else {
      const path = router.pathname.split('/')

      if (isActivePath(path[1])) {
        setActive(path[1])
      } else {
        setIs404(true)
      }
    }
  }, [router.pathname])

  return {
    active,
    is404
  }
}

export default usePath
