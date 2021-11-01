import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Heading, Text, Link, GridItem } from '@chakra-ui/react'
import LoginForm from 'commons/components/LoginForm'

const Login = () => (
  <GridItem justifySelf="center" alignSelf="center">
    <Box
      maxW="xl"
      borderWidth="2px"
      borderRadius="none"
      borderColor="brandpurple.500"
      p={5}
      overflow="hidden"
      h="100%"
    >
      <Heading size="lg">Welcome Back!</Heading>
      <Text>
        Not registered yet?{' '}
        <Link>
          <RouterLink to="/register/">Register here!</RouterLink>
        </Link>
      </Text>
    </Box>
    <Box
      maxW="xl"
      borderWidth="2px"
      borderColor="brandpurple.500"
      borderRadius="none"
      p={5}
      overflow="hidden"
      h="100%"
      mt="20px"
      mb="60px"
    >
      <LoginForm />
    </Box>
  </GridItem>
)

export default Login
