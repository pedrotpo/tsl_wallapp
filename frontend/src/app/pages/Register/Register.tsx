import React from 'react'
import RegisterForm from 'commons/components/RegisterForm'
import { Box, GridItem } from '@chakra-ui/react'

const Register = () => (
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
      <RegisterForm />
    </Box>
  </GridItem>
)

export default Register
