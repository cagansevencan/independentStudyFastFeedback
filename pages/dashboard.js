import Head from 'next/head'
import useSWR from 'swr'
import { Button, ButtonGroup, Heading, Text, Code, Icon, Box, Flex } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import SiteTable from '@/components/SiteTable'
import SiteTableHeader from '@/components/SiteTableHeader'


const Dashboard = () => {
    const { user } = useAuth()
    // Include the token alongside the request, so that our API route also has access to that info.
    const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher)
    //Fetcher that we want to fetch with - SWR leaves it up to us. We can do REST, GraphQL, etc.
    //We are gonna use a basic fetcher to return JSON.

    //If no data return the loading state
    if (!data) {
        return <DashboardShell>
            <SiteTableHeader />
            <SiteTableSkeleton />
        </DashboardShell>
    }

    if (!user) {
        return <DashboardShell>
            <SiteTableSkeleton />
        </DashboardShell>
    }

    //This is the empty state that we want to show when the user is not signed in

    return <DashboardShell>
        <SiteTableHeader />
        {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
}

export default Dashboard
