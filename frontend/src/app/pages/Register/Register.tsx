import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, GridItem, Heading, Text, Link } from '@chakra-ui/react'
import RegisterForm from 'commons/components/RegisterForm'

const Register = () => (
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
      <Heading size="lg">
        Welcome to{' '}
        <Text as="span" fontStyle="italic" color="brandaqua.500">
          THE WALL
        </Text>{' '}
        by TSL!
      </Heading>
      <Text>
        Register below, or{' '}
        <Link>
          <RouterLink to="/login/">log in</RouterLink>
        </Link>
      </Text>
    </Box>
    <Box
      maxW="xl"
      borderWidth="2px"
      borderRadius="none"
      borderColor="brandpurple.500"
      p={5}
      overflow="hidden"
      h="100%"
      mt="20px"
      mb="20px"
    >
      <RegisterForm />
    </Box>
  </GridItem>
)

export default Register
