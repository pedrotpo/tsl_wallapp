import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import api from 'commons/api'

const Login = () => {
  const [show, setShow] = useState(false)
  const handleShowPassword = () => setShow(!show)
  const onSubmit = async (values: any) => {
    const { user_id } = await api.auth.login({
      email: values.email,
      password: values.password
    })
    const token = localStorage.getItem('access_token')
    await api.users.updateUser(user_id, {
      email: 'rob@tsl.com',
      first_name: 'Rob',
      last_name: 'teste',
      password: 'teste123'
    })
    const response = await api.users.getUser(user_id)
    console.log(response)
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
                <label>Bio</label>
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

export default Login
