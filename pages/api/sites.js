import { getUserSites } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";
import { logger, formatObjectKeys } from "@/utils/logger";



// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    try {
        //We have our token on the header and we will use that to verify our connection with firebase
        const token = req.headers.token;
        //This value will gives us back the user object, specifically we want the uid

        const { uid } = await auth.verifyIdToken(token)
        const sites = await getUserSites(uid);
        res.status(200).json(sites)
    }
    catch (error) {

        const headers = formatObjectKeys(req.headers)

        logger.error({
            request: {
                headers: headers,
                url: req.url,
                method: req.method
            },
            response: {
                statusCode: res.statusCode
            }
        },
            "Error in /api/sites.js: " + error.message)

        res.statusCode = 500;
        res.json({ error });
    }
}