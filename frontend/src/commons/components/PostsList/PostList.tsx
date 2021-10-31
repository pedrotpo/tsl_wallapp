import React from 'react'
import { useAppSelector } from 'commons/hooks'
import PostCard from './PostCard'
import PostSkeleton from './PostSkeleton'
import { Box } from '@chakra-ui/layout'

const PostsList = () => {
  const state = useAppSelector((state) => state.posts)

  return (
    <Box>
      {state.loading && <PostSkeleton />}
      {!state.loading &&
        state.data &&
        Object.values(state.data).map((item: any) => (
          <PostCard key={item.id} post={item} />
        ))}
    </Box>
  )
}

export default PostsList
