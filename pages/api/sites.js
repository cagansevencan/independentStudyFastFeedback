import { getAllSites } from "@/lib/db-admin";


export default async (_, res) => {
    const { sites, error } = await getAllSites();

    if (error) {
        res.statusCode = 500;
        res.json({ error });
    }

    res.status(200).json({ sites })

}