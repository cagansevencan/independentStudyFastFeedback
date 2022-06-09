import firebase from "./firebase";
import React, { useState, useEffect, useContext, createContext } from 'react';

const authContext = createContext();

//Any child of the provider has access to the hook, hook into that state
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
//TODO: Make this context available to our entire application


//Use context of Auth, Provider will make things available to the children
export const useAuth = () => {
    return useContext(authContext);
};



//After we get the user we want to put it in state so we can access it later
function useProvideAuth() {
    const [user, setUser] = useState(null);

    console.log(user)

    const signinWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    };

    const signup = (email, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signout,
    };
}