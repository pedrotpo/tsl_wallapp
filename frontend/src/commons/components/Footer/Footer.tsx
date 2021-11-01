import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'

const Footer = () => (
  <Flex
    h="70px"
    bg="brandblue.500"
    position={'fixed'}
    bottom={0}
    w="100%"
    alignItems="center"
    justifyContent="center"
    borderTop="2px solid"
    borderTopColor="brandpurple.500"
    direction="column"
  >
    <Text color="brandaqua.500">
      Made with care and Chakra UI, React, Vite and Redux!
    </Text>
    <Text color="brandaqua.500">By Pedro T. Pires</Text>
  </Flex>
)

export default Footer
