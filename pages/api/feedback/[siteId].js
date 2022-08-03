import { getAllFeedback } from "@/lib/db-admin";
import db from "@/lib/firebase-admin";

export default async (req, res) => {

    const siteId = req.query.siteId;
    console.log("This is siteID: ", siteId);

    const { feedback, error } = await getAllFeedback(siteId)

    if (error) {
        res.statusCode = 500;
        res.json({ error: error });
    }

    res.status(200).json({ feedback })

}