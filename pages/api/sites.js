import db from "@/lib/firebase-admin";

export default async (_, res) => {
    const siteRef = await db.collection('sites').get()
    const sites = []

    siteRef.forEach((doc) => {
        sites.push({
            id: doc.id,
            ...doc.data()
        })
    })

    res.status(200).json({ sites })

}