import React from 'react';
import { Box, Code } from '@chakra-ui/core';
import { Table, Tr, Th, Td } from './Table';


const FeedbackData = ({ feedback }) => (
    <Box as="tr" key={feedback.id}>
        <Td fontWeight="medium">
            {feedback.name}
        </Td>
        <Td>
            {feedback.text}
        </Td>
        <Td>
            <Code>{'/'}</Code>
        </Td>
        <Td>
            {'Remove'}
        </Td>
    </Box>
);



const FeedbackTable = ({ allFeedback }) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Feedback</Th>
                    <Th>Route</Th>
                    <Th>Visible</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {allFeedback.map((feedback) => (
                    <FeedbackData feedback={feedback} key={feedback.id} />
                ))}
            </tbody>
        </Table>
    );
};

export default FeedbackTable;