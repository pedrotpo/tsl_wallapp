import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { useAppDispatch } from 'commons/hooks'
import { loadPosts } from 'commons/ducks/posts'
import PostsList from 'commons/components/PostsList'
import NavBar from 'commons/components/NavBar'

const Main = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  })

  return (
    <Box>
      <NavBar />
      <PostsList />
    </Box>
  )
}

export default Main
