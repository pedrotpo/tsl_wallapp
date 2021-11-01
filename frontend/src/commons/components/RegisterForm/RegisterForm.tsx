import React, { useState } from 'react'
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
import { UserDetail } from 'commons/types'

const RegisterForm = () => {
  const [show, setShow] = useState(false)
  const { createUser } = useDucks()
  const handleShowPassword = () => setShow(!show)

  const onSubmit = async (values: UserDetail) => {
    //TODO Insert ducks
    await createUser({
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password
    })
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
            name="first_name"
            render={({ input, meta }) => (
              <Box mt="20px">
                <FormLabel>First Name</FormLabel>
                <Input {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </Box>
            )}
          />
          <Field
            name="last_name"
            render={({ input, meta }) => (
              <Box mt="20px">
                <FormLabel>Last Name</FormLabel>
                <Input {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </Box>
            )}
          />
          <Field
            name="password"
            render={({ input }) => (
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

export default RegisterForm
