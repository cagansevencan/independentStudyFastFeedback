import Head from 'next/head'
import { Button, ButtonGroup, Heading, Text, Code, Icon, Link, Flex } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'


export default function Home() {
  const auth = useAuth()

  return (
    <Flex as="main"
      direction={"column"}
      align="center"
      justify={"center"}
      height="100vh"
      maxW={"400px"}
      margin="0 auto"
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
               if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                 window.location.href = "/dashboard"
               }
             `
          }}
        />
        <title>Fast Feedback</title>
      </Head>

      <Heading>
        Fast Feedback
      </Heading>

      <Icon name="logo" size="42px" mb={2} />

      <Text textAlign={"center"} mb={4}>
        <Text as="span" fontWeight="bold" display="inline">
          Fast Feedback
        </Text>
        {` is the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
      </Text>

      {auth.user ? (
        <Button as="a" fontWeight={"medium"} href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.signinWithGithub()} >Sign In</Button>
      )}

    </Flex>
  )
}
