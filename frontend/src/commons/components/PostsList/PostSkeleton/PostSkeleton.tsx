import React from 'react'
import { SkeletonText } from '@chakra-ui/skeleton'
import { Box } from '@chakra-ui/layout'
const PostSkeleton = () => (
  <Box p="10px" bg="gray.50" borderRadius="sm">
    <SkeletonText mt="4" noOfLines={2} spacing="4" />
  </Box>
)

export default PostSkeleton
