import firebase from "./firebase";
import React, { useState, useEffect, useContext, createContext } from 'react';
import { createUser } from "./db";
import cookie from "js-cookie";
import Router from "next/router";

const authContext = createContext();

//Any child of the provider has access to the hook, hook into that state
export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
//TODO: Make this context available to our entire application

//Comment
//Use context of Auth, Provider will make things available to the children
export const useAuth = () => {
    return useContext(authContext);
};



//After we get the user we want to put it in state so we can access it later
function useProvideAuth() {
    const [user, setUser] = useState(null);

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);
            const { token, ...userWithoutToken } = user;


            createUser(user.uid, userWithoutToken)
            //We want user with the token to have on our local so that we can can forward it to our backend
            setUser(user);

            cookie.set("fast-feedback-auth", true, { expires: 1 });

            return user;
        } else {
            Router.push("/");
            setUser(false);
            cookie.remove("fast-feedback-auth");

            return false;
        }
    }


    const signinWithGithub = () => {
        Router.push("/dashboard");
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => handleUser(response.user));
    };

    const signinWithGoogle = () => {
        Router.push("/dashboard");
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => handleUser(response.user));
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => handleUser(false));
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signinWithGoogle,
        signout,
    };
}

const formatUser = (rawUser) => {
    return {
        uid: rawUser.uid,
        email: rawUser.email,
        name: rawUser.displayName,
        token: rawUser.xa,
        photoURL: rawUser.photoURL,
        provider: rawUser.providerData[0].providerId,
    }
}