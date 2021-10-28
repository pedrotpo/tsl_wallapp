import React, { useEffect } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useDucks } from 'commons/hooks'
import PostsList from 'commons/components/PostsList'

const Main = () => {
  const { loadPosts } = useDucks()

  useEffect(() => {
    loadPosts()
  })

  return (
    <Grid>
      <GridItem>Me</GridItem>
      <GridItem>
        <PostsList />
      </GridItem>
    </Grid>
  )
}

export default Main
