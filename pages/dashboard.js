import Head from 'next/head'
import useSWR from 'swr'
import { Button, ButtonGroup, Heading, Text, Code, Icon, Box, Flex } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import SiteTable from '@/components/SiteTable'


const Dashboard = () => {
    const auth = useAuth()
    const { data } = useSWR('/api/sites', fetcher)
    //Fetcher that we want to fetch with - SWR leaves it up to us. We can do REST, GraphQL, etc.
    //We are gonna use a basic fetcher to return JSON.

    //If no data return the loading stat e
    if (!data) {
        return <DashboardShell>
            <SiteTableSkeleton />
        </DashboardShell>
    }

    if (!auth.user) {
        return <DashboardShell>
            <SiteTableSkeleton />
        </DashboardShell>
    }

    //This is the empty state that we want to show when the user is not signed in
    return <DashboardShell>
        {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
}

export default Dashboard
