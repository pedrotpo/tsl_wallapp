import React from 'react'
import { Form, Field } from 'react-final-form'
import { Button, Textarea, Box } from '@chakra-ui/react'

import { useAppSelector, useDucks } from 'commons/hooks'

const PostForm = () => {
  const { createPosts, loadPosts } = useDucks()
  const userId = useAppSelector((state) => state.auth.data.user)

  const onSubmit = async (values: Record<'content', string>) => {
    await createPosts({ ...values, author_id: userId })
    loadPosts()
  }

  return (
    //TODO Clear Post Data
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="content"
            render={({ input, meta }) => (
              <Box>
                <Textarea placeholder="Speak your mind!" {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </Box>
            )}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" mt="20px" variant="solid">
              Submit
            </Button>
          </Box>
        </form>
      )}
    />
  )
}

export default PostForm
