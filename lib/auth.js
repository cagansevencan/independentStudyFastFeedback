import firebase from "./firebase";
import React, { useState, useEffect, useContext, createContext } from 'react';
import { createUser } from "./db";

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

            createUser(user.uid, user)
            setUser(user);
            return user;
        } else {
            setUser(false);
            return false;
        }
    }


    const signinWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
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
        signout,
    };
}

const formatUser = (rawUser) => {
    return {
        uid: rawUser.uid,
        email: rawUser.email,
        name: rawUser.displayName,
        photoURL: rawUser.photoURL,
        provider: rawUser.providerData[0].providerId,
    }
}