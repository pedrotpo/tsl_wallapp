import React from 'react'
import { Form, Field } from 'react-final-form'
import { Button, Input } from '@chakra-ui/react'
import jwt from 'jwt-decode'

import { useDucks } from 'commons/hooks'
import { Decoded } from 'commons/types'

const PostForm = () => {
  const { createPosts } = useDucks()

  const onSubmit = async (values: any) => {
    const token = localStorage.getItem('access_token') || 'null'
    const { user_id } = jwt<Decoded>(token)

    createPosts({ ...values, author_id: user_id })
    console.log(values)
    window.alert(JSON.stringify(values))
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="title"
            render={({ input, meta }) => (
              <div>
                <label>Title</label>
                <Input {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
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
