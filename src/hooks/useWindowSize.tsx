import {useEffect, useState} from 'react'

type WindowSize = {
  width?: number
  height?: number
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined
  })

  const isMobile =
    windowSize.height && windowSize.width
      ? window.innerWidth >= 700 && window.innerHeight >= 700
        ? false
        : true
      : true

  useEffect(() => {
    const onResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    onResize()

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return {
    windowSize,
    isMobile
  }
}

export default useWindowSize
