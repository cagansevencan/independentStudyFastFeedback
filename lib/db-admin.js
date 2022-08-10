import { db } from './firebase-admin';

//Get feedback for a specific site
export async function getAllFeedback(siteId) {
    try {
        const snapshot = await db.collection('feedback').where('siteId', '==', siteId).get()

        const feedback = []
        snapshot.forEach((doc) => {
            feedback.push({ id: doc.id, ...doc.data() });
        });

        //Sort feedback by timestamp
        feedback.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return { feedback }
    } catch (error) {
        console.log(error)
        return { error }
    }
};


export async function getAllSites() {

    try {
        const snapshot = await db.collection('sites').get()

        const sites = []

        snapshot.forEach((doc) => {
            sites.push({ id: doc.id, ...doc.data() });
        });

        return { sites };

    } catch (error) {
        console.log(error)
        return { error };
    }
};




export async function getUserSites(userId) {
    const snapshot = await db.collection('sites').where('authorId', '==', userId).get()
    const sites = []

    snapshot.forEach((doc) => {
        sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
};

