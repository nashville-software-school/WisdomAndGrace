import React, { useState, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "api/userprofile";

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

  const logout = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  const register = async (userProfile, password) => {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(userProfile.email, password);

    const token = await user.getIdToken();
    sessionStorage.setItem("token", token);

    userProfile.firebaseUserId = user.uid;
    const savedUserProfile = await saveUser(userProfile);
    sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile));

    setIsLoggedIn(true);
  };

  const getUserProfile = (firebaseUserId) => {
    const token = sessionStorage.getItem("token");
    return fetch(`${apiUrl}/${firebaseUserId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(resp => resp.json());
  };

  const saveUser = (userProfile) => {
    const token = sessionStorage.getItem("token");
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
    }).then(resp => resp.json());
  };

  return (
    <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {props.children}
    </UserProfileContext.Provider>
  );
}