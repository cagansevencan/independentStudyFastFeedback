import Head from 'next/head'
import useSWR from 'swr'
import { Button, ButtonGroup, Heading, Text, Code, Icon, Box, Flex } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import { createCheckoutSession, goToBillingPortal } from '@/lib/db'


const Account = () => {
    const { user, signout } = useAuth()
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
                onClick={(e) => createCheckoutSession(user.uid)}
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
            <Button
                onClick={() => {
                    goToBillingPortal();
                }}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                ml={4}
                _hover={{ bg: 'gray.700' }}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                View Billing Portal
            </Button>
            <Button ml={4} backgroundColor="gray.200" onClick={() => signout()}>
                Log Out
            </Button>
        </Box>
    </DashboardShell>
}

export default Account
