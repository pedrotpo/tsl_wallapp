import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormLabel,
  useDisclosure
} from '@chakra-ui/react'

import { useDucks } from 'commons/hooks'
import { UserDetail } from 'commons/types'
import {
  required,
  isEmail,
  password,
  maxChar,
  minChar,
  composeValidators
} from 'commons/utils'
import AlertModal from 'commons/components/AlertModal'

const RegisterForm = () => {
  const [show, setShow] = useState(false)
  const { createUser } = useDucks()
  const handleShowPassword = () => setShow(!show)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const onSubmit = async (values: UserDetail, form: any) => {
    try {
      await createUser({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password
      })
    } catch {
      onOpen()
    }
    form.reset()
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={composeValidators(required, isEmail)}
              render={({ input, meta }) => (
                <Box>
                  <FormLabel data-testid="email-label">Email</FormLabel>
                  <Input data-testid="email-field" {...input} />
                  {meta.touched && meta.error && (
                    <span data-testid="email-error">{meta.error}</span>
                  )}
                </Box>
              )}
            />
            <Field
              name="first_name"
              validate={composeValidators(required, minChar(2), maxChar(25))}
              render={({ input, meta }) => (
                <Box mt="20px">
                  <FormLabel data-testid="first-name-label">
                    First Name
                  </FormLabel>
                  <Input data-testid="first-name-field" {...input} />
                  {meta.touched && meta.error && (
                    <span data-testid="first-name-error">{meta.error}</span>
                  )}
                </Box>
              )}
            />
            <Field
              name="last_name"
              validate={composeValidators(required, minChar(2), maxChar(25))}
              render={({ input, meta }) => (
                <Box mt="20px">
                  <FormLabel data-testid="last-name-label">Last Name</FormLabel>
                  <Input data-testid="last-name-field" {...input} />
                  {meta.touched && meta.error && (
                    <span data-testid="last-name-error">{meta.error}</span>
                  )}
                </Box>
              )}
            />
            <Field
              name="password"
              validate={composeValidators(required, password)}
              render={({ input, meta }) => (
                <Box mt="20px">
                  <FormLabel data-testid="password-label">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      {...input}
                      data-testid="password-field"
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
                  {meta.touched && meta.error && (
                    <span data-testid="password-error">{meta.error}</span>
                  )}
                </Box>
              )}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                data-testid="submit-button"
                type="submit"
                mt="20px"
                variant="solid"
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      />
      <AlertModal
        message="User registration failed. Review inserted information and try again"
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  )
}

export default RegisterForm
