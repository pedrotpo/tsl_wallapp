import React from 'react'
import { Form, Field } from 'react-final-form'
import { Button, Input } from '@chakra-ui/react'

import { useAppSelector, useDucks } from 'commons/hooks'

const PostForm = () => {
  const { createPosts, loadPosts } = useDucks()
  const userId = useAppSelector((state) => state.auth.data.user)

  const onSubmit = async (values: any) => {
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
              <div>
                <label>Content</label>
                <Input {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      )}
    />
  )
}

export default PostForm
