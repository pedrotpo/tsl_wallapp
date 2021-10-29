import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Flex,
  IconButton,
  Image,
  Button,
  Stack,
  StackDivider,
  Collapse,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useAppSelector, useDucks } from 'commons/hooks'
import imgURL from '../../../public/logo.png'

const NavBar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const currentUser = useAppSelector((state) => state.user.data)
  const userProfileIsLoaded = useAppSelector((state) => state.user.loaded)
  const history = useHistory()
  const { logOutUser } = useDucks()

  const renderButtons = (mobile = false) => {
    const handleClick = (url: string) => {
      if (url === '/logout') logOutUser()
      url === '/logout' ? history.push('/') : history.push(url)
      if (mobile) onClose()
    }

    let base = 'none'
    let md = 'inline-flex'

    if (mobile) {
      base = 'inline-flex'
      md = 'none'
    }

    if (
      (!currentUser || Object.keys(currentUser).length === 0) &&
      !userProfileIsLoaded
    )
      return (
        <>
          <Button
            display={{ base: base, md: md }}
            fontSize={'sm'}
            fontWeight={400}
            color={'white'}
            bg={'pink.400'}
            onClick={() => handleClick('/login')}
            _hover={{
              bg: 'pink.300'
            }}
          >
            Sign In
          </Button>
          <Button
            display={{ base: base, md: md }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            onClick={() => handleClick('/register')}
            _hover={{
              bg: 'pink.300'
            }}
          >
            Sign Up
          </Button>
        </>
      )
    if (
      currentUser &&
      Object.keys(currentUser).length !== 0 &&
      userProfileIsLoaded
    )
      return (
        <Button
          display={{ base: base, md: md }}
          fontSize={'sm'}
          fontWeight={400}
          color={'white'}
          bg={'pink.400'}
          onClick={() => handleClick('/logout')}
          _hover={{
            bg: 'pink.300'
          }}
        >
          Logout
        </Button>
      )
  }

  return (
    <Box position={'fixed'} top={0} w="100%" zIndex={1000}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        h={'70px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1 }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={() => onToggle()}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <RouterLink to="/">
            <Image src={imgURL} boxSize="50px" alt="logo" />
          </RouterLink>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          align="center"
          spacing={6}
        >
          {renderButtons()}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'column'}
          align="flex-start"
          spacing={6}
          p={4}
          boxShadow="base"
          divider={<StackDivider borderColor="gray.200" />}
          bg={useColorModeValue('white', 'gray.800')}
        >
          {renderButtons(true)}
        </Stack>
      </Collapse>
    </Box>
  )
}
export default NavBar
