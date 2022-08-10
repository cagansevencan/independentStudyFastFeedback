import { useRouter } from "next/router";
import { useState } from "react";
import { Box, FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/core';

import { useAuth } from "@/lib/auth";
import { createFeedback } from "@/lib/db";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";



//Given some data that we fetched from our db/api we can return this as props to our component
export async function getStaticProps(context) {
    const siteId = context.params.siteId;
    const { feedback } = await getAllFeedback(siteId);
    return {
        props: {
            initialFeedback: feedback
        },
        revalidate: 1
    }
}

//For this dynamic route we have X number of sites - 
//we want to generate a route for every single site that is available
//When we sub in the siteId it tells getStaticPaths which routes are available
export async function getStaticPaths() {
    const { sites } = await getAllSites()
    //return an object, its gonna have a structure it with params
    const paths = sites.map(site => ({
        params: {
            siteId: site.id.toString()
        }
    }))
    //It will infer a key of paths, and value of params
    return {
        paths,
        fallback: false
    }
}

const SiteFeedback = ({ initialFeedback }) => {
    const auth = useAuth();
    const router = useRouter();
    const [allFeedback, setAllFeedback] = useState(initialFeedback);

    const onSubmit = (e) => {
        e.preventDefault();
        //Get values and save it to db
        //Pull siteID from URL
        const newFeedback = {
            author: auth.user.name,
            authorID: auth.user.uid,
            siteId: router.query.siteId,
            text: e.target.elements.comment.value,
            createdAt: new Date().toISOString(),
            provider: auth.user.provider,
            status: "pending"
        }
        setAllFeedback([newFeedback, ...allFeedback]);
        //Save to db
        //Doing it on client side
        createFeedback(newFeedback);

    }
    return (
        <Box display={"flex"} flexDirection="column"
            width={"full"} maxWidth="700px"
            margin={"0 auto"}
        >
            <Box as="form" onSubmit={onSubmit}>
                <FormControl my={8}>
                    <FormLabel htmlFor="comment">Comment</FormLabel>
                    <Input type='comment' id="comment" />
                    <Button mt={2} type="submit" fontWeight={"medium"}>
                        Add Comment
                    </Button>
                    <FormHelperText>Leave a comment!  </FormHelperText>
                </FormControl>
            </Box>

            {allFeedback.map((feedback) => (

                <Feedback key={feedback.id} {...feedback} />
            ))}
        </Box>
    )
}

export default SiteFeedback