import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Form, Field } from 'react-final-form'
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormLabel
} from '@chakra-ui/react'
import { useDucks } from 'commons/hooks'

const LoginForm = () => {
  const [show, setShow] = useState(false)
  const handleShowPassword = () => setShow(!show)
  const history = useHistory()
  const { logInUser, loadUserProfile } = useDucks()
  const onSubmit = async (values: any) => {
    const id = await logInUser(values)
    await loadUserProfile(id)
    history.push('/')
  }
  return (
    //TODO Clear Post Data
    //TODO Add Validators
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            render={({ input, meta }) => (
              <Box>
                <FormLabel>Email</FormLabel>
                <Input {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </Box>
            )}
          />
          <Field
            name="password"
            render={({ input, meta }) => (
              <Box mt="20px">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    {...input}
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      mr="10px"
                      onClick={handleShowPassword}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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

export default LoginForm
