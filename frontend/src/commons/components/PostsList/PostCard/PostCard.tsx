import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { useAppSelector, useDucks } from 'commons/hooks'
import { Button } from '@chakra-ui/button'

const PostCard = ({ post }: any) => {
  const { id, content, author, published, author_id } = post
  const currentUser = useAppSelector((state) => state.user.data)
  const { deletePost, loadPosts } = useDucks()

  const handleClick = async () => {
    await deletePost(id)
    loadPosts()
  }

  return (
    <Flex p="10px" bg="gray.50" borderRadius="sm">
      <Box>
        <Text>{content}</Text>
        {currentUser &&
          Object.keys(currentUser).length !== 0 &&
          currentUser.id === author_id && (
            <Button onClick={handleClick}>Click</Button>
          )}
      </Box>
      <Box>
        <Text>{author}</Text>
        <Text>{published}</Text>
      </Box>
    </Flex>
  )
}

export default PostCard
