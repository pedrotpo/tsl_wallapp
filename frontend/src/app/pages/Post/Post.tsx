import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

import api from 'commons/api'
//TODO Create Post Component
const Register = () => {
  const [show, setShow] = useState(false)
  const handleShowPassword = () => setShow(!show)

  const onSubmit = async (values: any) => {
    /* const response = await api.posts.createPosts({
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password
    })
    console.log(response) */
    window.alert(JSON.stringify(values))
  }
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            render={({ input, meta }) => (
              <div>
                <label>Email</label>
                <Input {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
          <Field
            name="first_name"
            render={({ input, meta }) => (
              <div>
                <label>First</label>
                <Input {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
          <Field
            name="last_name"
            render={({ input, meta }) => (
              <div>
                <label>Last</label>
                <Input {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
          <Field
            name="password"
            render={({ input, meta }) => (
              <InputGroup size="md">
                <Input
                  {...input}
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      )}
    />
  )
}

export default Register
