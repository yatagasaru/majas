import React, {useRef} from 'react'
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ButtonProps
} from '@chakra-ui/react'

type Props = {
  message: string
  title: string
  okTitle: string
  cancelTitle?: string
  isOpen: boolean
  okColorScheme?: ButtonProps['colorScheme']
  onOk: () => void
  onClose: () => void
  onCancel?: () => void
}

const ConfirmationModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    onOk,
    onCancel,
    title,
    message,
    okTitle,
    cancelTitle = 'Cancel',
    okColorScheme = 'red'
  } = props

  const cancelRef = useRef(null)

  const handleCancel = () => {
    onCancel && onCancel()
    onClose()
  }

  const handleOk = () => {
    onOk()
    onClose()
  }

  return (
    <AlertDialog
      onClose={onClose}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCancel}>
              {cancelTitle}
            </Button>
            <Button colorScheme={okColorScheme} onClick={handleOk} ml={3}>
              {okTitle}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default ConfirmationModal
