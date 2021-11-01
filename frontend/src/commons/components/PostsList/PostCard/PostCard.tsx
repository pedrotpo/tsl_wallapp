import React from 'react'
import {
  Box,
  Flex,
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { useAppSelector, useDucks } from 'commons/hooks'
import { Button } from '@chakra-ui/button'
import { PostDetail } from 'commons/types'

const PostCard = ({ post }: { post: PostDetail }) => {
  const { id, content, author, published, author_id } = post
  const currentUser = useAppSelector((state) => state.user.data)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { deletePost, loadPosts } = useDucks()
  const date = new Date(published).toLocaleString()

  const handleClick = async () => {
    await deletePost(id)
    loadPosts()
  }

  return (
    <>
      <Flex
        p="20px"
        bg="transparent"
        border="2px solid"
        borderColor="brandpurple.500"
        borderRadius="none"
        direction="column"
        mb="20px"
      >
        <Box mb="10px">
          <Text>{content}</Text>
        </Box>
        <Flex justifyContent="space-between">
          <Text>
            Posted by:{' '}
            <Text as="span" color="brandaqua.500">
              {author}
            </Text>
          </Text>
          <Text>
            Posted on:{' '}
            <Text as="span" color="brandaqua.500">
              {date}
            </Text>
          </Text>
          {currentUser &&
            Object.keys(currentUser).length !== 0 &&
            currentUser.id === author_id && (
              <Button size="sm" onClick={onOpen}>
                Del?
              </Button>
            )}
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="brandblue.500"
          border="2px solid"
          borderColor="brandpurple.500"
          borderRadius="none"
        >
          <ModalCloseButton />
          <ModalBody p="10px">
            <Heading size="md">U sure about that?</Heading>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} size="sm" mr={3}>
              Nah
            </Button>
            <Button onClick={handleClick} size="sm" variant="solid">
              Do it!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PostCard
