import React from 'react'
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

const AlertModal = ({
  message,
  isOpen,
  onClose
}: {
  message: string
  isOpen: boolean
  onClose: () => void
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="brandblue.500"
        border="2px solid"
        borderColor="brandpurple.500"
        borderRadius="none"
      >
        <ModalBody py="16px" px="36px">
          <Text size="md">{message}</Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} size="sm" mr={3}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AlertModal
