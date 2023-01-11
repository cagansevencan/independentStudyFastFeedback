import { getUserFeedback } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    try {
        //We have our token on the header and we will use that to verify our connection with firebase
        const token = req.headers.token;
        //This value will gives us back the user object, specifically we want the uid
        const { uid } = await auth.verifyIdToken(token)
        const { feedback } = await getUserFeedback(uid);

        res.status(200).json({ feedback })
    }
    catch (error) {
        res.statusCode = 500;
        res.json({ error });
    }
}