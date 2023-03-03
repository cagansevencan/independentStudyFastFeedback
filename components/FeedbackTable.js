import React from 'react';
import { Box, Code, Switch } from '@chakra-ui/core';
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


const FeedbackTable = (props) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Feedback</Th>
                    <Th>Route</Th>
                    <Th>Visible</Th>
                    <Th width="50px">{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {props.feedback.map((feedback) => (
                    <Box as="tr" key={feedback.id}>
                        <Td fontWeight="medium">{feedback.author}</Td>
                        <Td>{feedback.text}</Td>
                        <Td>
                            <Code>{feedback.route || '/'}</Code>
                        </Td>
                        <Td>
                            <Switch
                                color="green"
                                defaultIsChecked={feedback.status === 'active'}
                            />
                        </Td>
                        <Td>
                            {/* <DeleteFeedbackButton feedbackId={feedback.id} /> */}
                        </Td>
                    </Box>
                ))}
            </tbody>
        </Table>
    );
};



// const FeedbackTable = ({ allFeedback }) => {
//     return (
//         <Table>
//             <thead>
//                 <Tr>
//                     <Th>Name</Th>
//                     <Th>Feedback</Th>
//                     <Th>Route</Th>
//                     <Th>Visible</Th>
//                     <Th>{''}</Th>
//                 </Tr>
//             </thead>
//             <tbody>
//                 {allFeedback.map((feedback) => (
//                     <FeedbackData feedback={feedback} key={feedback.id} />
//                 ))}
//             </tbody>
//         </Table>
//     );
// };

export default FeedbackTable;