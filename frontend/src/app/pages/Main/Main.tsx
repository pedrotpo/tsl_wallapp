import React, { useEffect } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useDucks } from 'commons/hooks'
import PostsList from 'commons/components/PostsList'
import PostForm from 'commons/components/PostForm/PostForm'

const Main = () => {
  const { loadPosts } = useDucks()

  useEffect(() => {
    loadPosts()
  })

  return (
    <Grid mx="auto" w="600px">
      <GridItem><PostForm/></GridItem>
      <GridItem>
        <PostsList />
      </GridItem>
    </Grid>
  )
}

export default Main
