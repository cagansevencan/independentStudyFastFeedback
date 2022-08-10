import { getUserSites } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";


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
        res.statusCode = 500;
        res.json({ error });
    }
}