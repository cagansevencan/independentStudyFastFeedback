import Head from 'next/head'
import { Button, Heading, Text, Icon, Flex, Stack } from '@chakra-ui/core'

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

      <Heading marginBottom={"20px"}>
        Fast Feedback
      </Heading>

      <Icon name="logo" size="54px" mb={2} />

      <Text textAlign={"center"} mb={"1rem"} fontSize="lg" p={4}>
        <Text as="span" fontWeight="bold" display="inline">
          Fast Feedback
        </Text>
        {` is the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
      </Text>

      {auth.user ? (

        <Button
          as="a" fontWeight={"medium"} href="/dashboard"
          backgroundColor="gray.900"
          _hover={{ bg: "gray.700" }}
          color="white"
          _active={{
            bg: "gray.800",
            transform: "scale(0.70)"
          }}
        >
          View Dashboard
        </Button>

      ) : (
        <Stack>
          <Button
            leftIcon={"github"}
            mt={4} size="lg" onClick={(e) => auth.signinWithGithub()}
            backgroundColor="gray.900"
            _hover={{ bg: "gray.700" }}
            color="white"
            _active={{
              bg: "gray.800",
              transform: "scale(0.70)"
            }}
          >
            Sign In with Github
          </Button>

          <Button
            leftIcon={"google"}
            mt={4} size="lg" onClick={(e) => auth.signinWithGoogle()}
            backgroundColor="white"
            _hover={{ bg: "gray.100" }}
            color="gray.900"
            variant='outline'
            _active={{
              bg: "gray.100",
              transform: "scale(0.70)"
            }}
          >
            Sign In with Google
          </Button>

        </Stack>
      )}

    </Flex>
  )
}
