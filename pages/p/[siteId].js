import Feedback from "@/components/Feedback";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";


//Given some data that we fetched from our db/api we can return this as props to our component
export async function getStaticProps(context) {
    const siteId = context.params.siteId;
    const feedback = await getAllFeedback(siteId);
    return {
        props: {
            initialFeedback: feedback
        }
    }
}

//For this dynamic route we have X number of sites - 
//we want to generate a route for every single site that is available
//When we sub in the siteId it tells getStaticPaths which routes are available
export async function getStaticPaths() {
    const sites = await getAllSites()
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

    return initialFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
    ))
}

export default SiteFeedback