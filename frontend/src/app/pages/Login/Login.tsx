import React from 'react'
import LoginForm from 'commons/components/LoginForm'
import { Box, GridItem } from '@chakra-ui/react'

const Login = () => (
  <GridItem justifySelf="center" alignSelf="center">
    <Box
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      overflow="hidden"
      bg="gray.50"
      h="100%"
    >
      <LoginForm />
    </Box>
  </GridItem>
)

export default Login
