import Head from 'next/head'
import useSWR from 'swr'
import { Button, ButtonGroup, Heading, Text, Code, Icon, Box, Flex } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import FeedbackTable from '@/components/FeedbackTable'
import FeedbackTableHeader from '@/components/FeedbackTableHeader'


const MyFeedback = () => {
    const { user } = useAuth()
    // Include the token alongside the request, so that our API route also has access to that info.
    const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher)
    //Fetcher that we want to fetch with - SWR leaves it up to us. We can do REST, GraphQL, etc.
    //We are gonna use a basic fetcher to return JSON.

    //If no data return the loading stat e
    if (!data) {
        return <DashboardShell>
            <FeedbackTableHeader />
            <SiteTableSkeleton />
        </DashboardShell>
    }
    //This is the empty state that we want to show when the user is not signed in
    return <DashboardShell>
        <FeedbackTableHeader />
        {data.feedback.length ? (
            <FeedbackTable allFeedback={data.feedback} />
        ) : (
            <EmptyState />
        )}
    </DashboardShell>
}

export default MyFeedback
