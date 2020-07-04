import React, { useState, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
    const userProfile = sessionStorage.getItem("userProfile");
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null)

    const login = async (email, pw) => {
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, pw);

        const token = await user.getIdToken();
        sessionStorage.setItem("token", token);

        const profile = await getUserProfile(user.uid);
        sessionStorage.setItem("userProfile", JSON.stringify(profile));

        setIsLoggedIn(true);
    };

    const getUserProfile = (firebaseUserId) => {
        const token = sessionStorage.getItem("token");
        return fetch(`api/userprofile/${firebaseUserId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(resp => resp.json());
    };

    return (
        <UserProfileContext.Provider value={{ isLoggedIn, login }}>
            {props.children}
        </UserProfileContext.Provider>
    );
}