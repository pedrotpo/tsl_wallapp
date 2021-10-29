import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'

const Footer = () => (
  <Flex h="70px" bg="gray.300" position={'fixed'} bottom={0} w="100%" alignItems="center" justifyContent="center">
    <Text>Made with care and Chakra</Text>
  </Flex>
)

export default Footer
