import React, { useEffect } from 'react'
import { useAppDispatch } from 'commons/hooks'
import { loadPosts } from 'commons/ducks/posts'
import PostsList from 'commons/components/PostsList'

const Main = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadPosts)
  })

  return <PostsList />
}

export default Main
