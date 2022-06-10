import Head from 'next/head'
import { Button, ButtonGroup, Heading, Text, Code } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'


export default function Home() {
  const auth = useAuth()

  return <div>

    <Head>
      <title>Fast Feedback</title>
    </Head>

    <main>

      <Heading>
        Fast Feedback
      </Heading>

      <Text>
        Current user: <Code>{auth.user ? auth.user.email : 'None'} </Code>
      </Text>

      {auth.user ? (
        <Button onClick={(e) => auth.signout()}>Sign Out</Button>
      ) : (
        <Button onClick={(e) => auth.signinWithGithub()} >Sign In</Button>
      )}


    </main>

  </div>
}
