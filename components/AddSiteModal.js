import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Button,
    Input,
    useDisclosure,
    useToast
} from '@chakra-ui/core';

import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { mutate } from 'swr';


const AddSiteModal = ({ children }) => {
    const initialRef = useRef();
    const toast = useToast();
    const auth = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleSubmit, register } = useForm();




    const onCreateSite = ({ name, url }) => {
        const newSite = {
            authorId: auth.user.uid,
            createdAt: new Date().toISOString(),
            name,
            url
        }
        //This is gonna a return a site as an object, we can destructure and pull of the id
        const { id } = createSite(newSite);
        toast({
            title: 'Success!',
            description: "We've added your site.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        //API will return sites, and that's the array so spread the rest of the sites and include the new site

        mutate(
            ['/api/sites', auth.user.token],
            //Implicit return with an error function
            async (data) => ({
                sites: [{ id, ...newSite }, ...data.sites]
            }),
            false);
        onClose();
    };

    return (
        <>
            <Button
                onClick={onOpen}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                _hover={{ bg: 'gray.700' }}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                {children}
            </Button>


            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
                    <ModalHeader fontWeight="bold">Add Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder="My site"
                                name="name"
                                ref={register({
                                    required: 'Required'
                                })}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Link</FormLabel>
                            <Input
                                placeholder="https://website.com"
                                name="url"
                                ref={register({
                                    required: 'Required'
                                })}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} fontWeight="medium">
                            Cancel
                        </Button>
                        <Button
                            backgroundColor="#99FFFE"
                            color="#194D4C"
                            fontWeight="medium"
                            type="submit"
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddSiteModal;