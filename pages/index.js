import Head from 'next/head'
import { Button, ButtonGroup, Heading, Text, Code, Icon, Box, Flex } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'


export default function Home() {
  const auth = useAuth()

  return (
    <Flex as="main" direction={"column"} align="center"
      justify={"center"}
      height="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>


      <Heading>
        Fast Feedback
      </Heading>

      <Icon name="logo" size="64px" />
      {auth.user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} variant="link" size="sm" onClick={(e) => auth.signinWithGithub()} >Sign In</Button>
      )}

    </Flex>
  )
}
