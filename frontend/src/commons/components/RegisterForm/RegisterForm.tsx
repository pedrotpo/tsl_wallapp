import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

import api from 'commons/api'

const RegisterForm = () => {
  const [show, setShow] = useState(false)
  const handleShowPassword = () => setShow(!show)

  const onSubmit = async (values: any) => {
    //TODO Insert ducks
    await api.users.createUser({
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password
    })
  }

  return (
    //TODO Clear Post Data
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
                <label>First Name</label>
                <Input {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
          <Field
            name="last_name"
            render={({ input, meta }) => (
              <div>
                <label>Last Name</label>
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

export default RegisterForm
