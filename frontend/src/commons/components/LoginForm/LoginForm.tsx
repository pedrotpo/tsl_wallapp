import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { useDucks } from 'commons/hooks'

const LoginForm = () => {
  const [show, setShow] = useState(false)
  const handleShowPassword = () => setShow(!show)
  const { logInUser, loadUserProfile } = useDucks()
  const onSubmit = async (values: any) => {
    const id = await logInUser(values)
    await loadUserProfile(id)
  }
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            render={({ input, meta }) => (
              <Box>
                <label>Email</label>
                <Input {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </Box>
            )}
          />
          <Field
            name="password"
            render={({ input, meta }) => (
              <Box mt={3} mb={5}>
                <label>Password</label>
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
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </Box>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      )}
    />
  )
}

export default LoginForm
