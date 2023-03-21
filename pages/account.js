import Head from 'next/head'
import useSWR from 'swr'
import { Button, ButtonGroup, Heading, Text, Code, Icon, Box, Flex } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import { createCheckoutSession } from '@/lib/db'


const Account = () => {
    const { user } = useAuth()
    // const { data } = useSWR(user ? ['/api/user', user.token] : null, fetcher)


    // //If no data return the loading state
    // if (!data) {
    //     return <DashboardShell>
    //         <SiteTableHeader />
    //         <SiteTableSkeleton />
    //     </DashboardShell>
    // }


    return <DashboardShell>
        <Box>
            < Button

                mt={4} onClick={(e) => createCheckoutSession(user.uid)}
                backgroundColor="gray.900"
                _hover={{ bg: "gray.700" }}
                color="white"
                _active={{
                    bg: "gray.800",
                    transform: "scale(0.70)"
                }}
            >
                Upgrage to Starter
            </Button >
        </Box>
    </DashboardShell>
}

export default Account
