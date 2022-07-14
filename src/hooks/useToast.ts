import {useToast as useChakraToast} from '@chakra-ui/react'

type ToastProps = {
  title: string
  description?: string
  duration?: number
}

function useToast() {
  const t = useChakraToast()

  const errorToast = (props: ToastProps) => {
    const {title, description = '', duration = 3000} = props

    t({
      title,
      description,
      status: 'error',
      duration,
      isClosable: true
    })
  }

  const successToast = (props: ToastProps) => {
    const {title, description = '', duration = 2000} = props

    t({
      title,
      description,
      status: 'success',
      duration,
      isClosable: true
    })
  }

  const warningToast = (props: ToastProps) => {
    const {title, description = '', duration = 2000} = props

    t({
      title,
      description,
      status: 'warning',
      duration,
      isClosable: true
    })
  }

  return {
    successToast,
    warningToast,
    errorToast
  }
}

export default useToast
