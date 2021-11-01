import React from 'react'
import { useHistory } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Flex,
  IconButton,
  Image,
  Button,
  Stack,
  Text,
  StackDivider,
  Collapse,
  useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useAppSelector, useDucks } from 'commons/hooks'
import imgURL from '../../../public/logo.png'

const NavBar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const currentUser = useAppSelector((state) => state.user.data)
  const history = useHistory()
  const { logOutUser } = useDucks()

  const renderButtons = (mobile = false) => {
    const handleClick = (url: string) => {
      if (url === '/logout/') logOutUser()
      url === '/logout/' ? history.push('/') : history.push(url)
      if (mobile) onClose()
    }

    let base = 'none'
    let md = 'inline-flex'

    if (mobile) {
      base = 'inline-flex'
      md = 'none'
    }

    if (!currentUser || Object.keys(currentUser).length === 0)
      return (
        <>
          <Button
            display={{ base: base, md: md }}
            onClick={() => handleClick('/login/')}
          >
            Sign In
          </Button>
          <Button
            display={{ base: base, md: md }}
            variant="solid"
            onClick={() => handleClick('/register/')}
          >
            Sign Up
          </Button>
        </>
      )
    if (currentUser && Object.keys(currentUser).length !== 0)
      return (
        <Flex
          w="300px"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {!mobile && (
            <Text
              minW="150px"
              textAlign="center"
            >{`Hello ${currentUser.first_name}!`}</Text>
          )}
          <Button
            display={{ base: base, md: md }}
            alignSelf="flex-end"
            onClick={() => handleClick('/logout/')}
          >
            Logout
          </Button>
        </Flex>
      )
  }

  return (
    <Box position={'fixed'} top={0} w="100%" zIndex={1000}>
      <Flex
        bg="brandblue.500"
        color="brandaqua.500"
        h={'70px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={2}
        borderStyle={'solid'}
        borderBottomColor="brandpurple.500"
        align={'center'}
        justifyContent="space-between"
      >
        <Flex ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={() => onToggle()}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex
          w="300px"
          display={{ base: 'none', md: 'inline-flex' }}
          justify={{ base: 'center', md: 'start' }}
        >
          <RouterLink to="/">
            <Image src={imgURL} boxSize="50px" alt="logo" />
          </RouterLink>
        </Flex>
        <Box flex={1} textAlign="center" maxW="680px">
          <Text as="span" fontStyle="italic" fontWeight="700" fontSize="3xl">
            THE WALL
          </Text>
        </Box>

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
          divider={<StackDivider borderColor="brandpurple.500" />}
          bg="brandblue.500"
        >
          {renderButtons(true)}
        </Stack>
      </Collapse>
    </Box>
  )
}
export default NavBar
