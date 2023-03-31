import Head from 'next/head'
import { Button, Heading, Text, Icon, Flex, Stack, Box } from '@chakra-ui/core'
import { useAuth } from '@/lib/auth'
import { getAllFeedback } from '@/lib/db-admin'
import Feedback from '@/components/Feedback'
import FeedbackLink from '@/components/FeedbackLink'


const SITE_ID = 'HPjeVkXx2r07BEuZ7Lw7'

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID)
  return {
    props: {
      allFeedback: feedback
    },
    revalidate: 1
  }
}

export default function Home({ allFeedback }) {
  const auth = useAuth()

  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main"
          direction={"column"}
          align="center"
          justify={"center"}
          maxW={"700px"}
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
                mt={4} onClick={(e) => auth.signinWithGithub()}
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
      </Box>

      <Box display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}>
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>

    </>
  )
}
