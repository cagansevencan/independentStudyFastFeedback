import Head from 'next/head'
import { Button, ButtonGroup, Heading, Text, Code, Icon, Box, Flex } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'


const Dashboard = () => {
    const auth = useAuth()
    if (!auth.user) {
        return 'Loading...'
    }

    return <EmptyState />  //This is the empty state that we want to show when the user is not signed in
}

export default Dashboard
