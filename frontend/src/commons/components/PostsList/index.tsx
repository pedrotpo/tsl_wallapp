import React from 'react'
import { useAppSelector } from 'commons/hooks'
import { Box } from '@chakra-ui/layout'

const PostsList = () => {
  const state = useAppSelector((state) => state.posts)

  const lorem = () => {
    const array = []
    for (let i = 0; i <= 100; i++) {
      array.push(<div>{i}</div>)
    }
    return array
  }

  return (
    <Box mt="60px">
      {state.loading && <div>Loading</div>}
      {!state.loading &&
        state.data &&
        Object.values(state.data).map((item: any) => (
          <div key={item.id}>{item.title}</div>
        ))}
      {lorem()}
    </Box>
  )
}

export default PostsList
