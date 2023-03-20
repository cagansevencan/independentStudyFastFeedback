import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    Button
} from '@chakra-ui/core'
import { useState, useRef } from 'react'
import { deleteFeedback } from '@/lib/db'
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth'


function RemoveButton({ feedbackId }) {
    const [isOpen, onOpen] = useState()
    const onClose = () => onOpen(false)
    const auth = useAuth()
    const onDelete = () => {
        console.log('This is the feedbackId: ', feedbackId)
        deleteFeedback(feedbackId)

        mutate(
            ['/api/feedback', auth.user.token],
            async (data) => {
                return {
                    feedback:
                        data.feedback.filter(
                            (feedback) => feedback.id !== feedbackId)
                };
            }, false)
        onClose()
    }

    const cancelRef = useRef()


    return (
        <>
            <IconButton
                aria-label='Delete Feedback'
                icon="delete"
                variant='ghost'
                onClick={() => onOpen(true)}
            />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Feedback
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button variantColor='red' onClick={onDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
export default RemoveButton