import React from 'react';
import { Box, Link } from '@chakra-ui/core';
import { Table, Tr, Th, Td } from './Table';
import { parseISO, format } from 'date-fns';
import NextLink from 'next/link';


const SiteData = ({ site }) => (
    <Box as="tr" key={site.url}>
        <Td fontWeight="medium">
            {site.name}
        </Td>
        <Td>
            {site.url}
        </Td>
        <Td>
            <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref >
                <Link color="blue.500" fontWeight={"medium"}>View Feedback</Link>
            </NextLink>
        </Td>
        <Td>
            {format(parseISO(site.createdAt), 'PPpp')}
        </Td>
    </Box>
);

const SiteTable = ({ sites }) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Site Link</Th>
                    <Th>Feedback Link</Th>
                    <Th>Date Added</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {sites.map((site) => (
                    <SiteData site={site} key={site.url} />
                ))}
            </tbody>
        </Table>
    );
};

export default SiteTable;