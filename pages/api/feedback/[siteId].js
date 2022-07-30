import { getAllFeedback } from "@/lib/db-admin";
import db from "@/lib/firebase-admin";

export default async (req, res) => {

    const siteId = req.query.siteId;
    console.log("This is siteID: ", siteId);

    const feedback = await getAllFeedback(siteId)

    res.status(200).json({ feedback })

}