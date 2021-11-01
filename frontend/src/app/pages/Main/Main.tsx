import React, { useEffect } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useAppSelector, useDucks } from 'commons/hooks'
import PostsList from 'commons/components/PostsList'
import PostForm from 'commons/components/PostForm/PostForm'

const Main = () => {
  const { loadPosts } = useDucks()
  const currentUser = useAppSelector((state) => state.user.data)

  useEffect(() => {
    loadPosts()
  })

  return (
    <Grid mx="auto" w="680px" templateRows="auto 1fr">
      {currentUser && Object.keys(currentUser).length !== 0 && (
        <GridItem
          mt="30px"
          border="2px solid"
          borderColor="brandpurple.500"
          p="20px"
        >
          <PostForm />
        </GridItem>
      )}
      <GridItem mt="40px">
        <PostsList />
      </GridItem>
    </Grid>
  )
}

export default Main
