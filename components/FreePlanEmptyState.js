import React from 'react';
import {
    Box,
    Heading,
    Button,
    Text
} from '@chakra-ui/core';

import DashboardShell from './DashboardShell';

//This is the children that we pass into the DashboardShell for what we want to show
const FreePlanEmptyState = () => {
    <DashboardShell>
        <Box width="100%" backgroundColor="white" borderRadius="8px" p={8}>
            <Heading size="md">Get feedback on your site instantly.</Heading>
            <Text>Start today, then grow with us 🌱</Text>
            <Button>Upgrade to Starter</Button>
        </Box>
    </DashboardShell>
};

export default FreePlanEmptyState;