import React, { useState } from 'react'
import { useHistory } from 'react-router'
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
import { BaseUser } from 'commons/types'
import { useDucks } from 'commons/hooks'
import { required } from 'commons/utils'
import AlertModal from 'commons/components/AlertModal'

const LoginForm = () => {
  const [show, setShow] = useState(false)
  const handleShowPassword = () => setShow(!show)
  const history = useHistory()
  const { logInUser, loadUserProfile } = useDucks()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const onSubmit = async (values: BaseUser, form: any) => {
    try {
      const id = await logInUser(values)
      console.log(id)
      await loadUserProfile(id)
      history.push('/')
    } catch (error) {
      console.log(error)
      onOpen()
    }
    form.reset()
  }
  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ form, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={required}
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
              name="password"
              validate={required}
              render={({ input, meta }) => (
                <Box mt="20px">
                  <FormLabel data-testid="password-label">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      data-testid="password-field"
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
        message="Invalid e-mail or password"
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  )
}

export default LoginForm
