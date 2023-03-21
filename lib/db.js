import firebase from "firebase";
import getStripe from "./stripe";

const firestore = firebase.firestore();

export function createUser(uid, data) {
    return firestore.collection("users").doc(uid).set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
    //Creating a reference to the document so we can use the id
    const site = firestore.collection("sites").doc();
    site.set(data);
    return site;
}

export function createFeedback(data) {
    return firestore.
        collection('feedback').
        add(data)
}

export function deleteFeedback(id) {
    return firestore.
        collection('feedback').doc(id).delete()
}


export const createCheckoutSession = async (uid) => {
    const checkoutSessionRef = await firestore
        .collection('users')
        .doc(uid)
        .collection('checkout_sessions')
        .add({
            price: 'price_1MoADDE7zZO4a6uCcRl3uZQD',
            success_url: window.location.origin,
            cancel_url: window.location.origin
        })
    //Wait for the CheckoutSession to get attached by the extension
    checkoutSessionRef.onSnapshot(async (snap) => {
        const { sessionId } = snap.data();
        if (sessionId) {
            //We have a session, let's redirect to Checkout
            //Init Stripe
            const stripe = await getStripe()
            stripe.redirectToCheckout({ sessionId });
        }
    })
}