import firebase from "firebase/app";
import "firebase/auth";
import { useEffect, useState } from "react";


let hasFirebaseBeenInitialized = false;
export function useAuth() {
  const initialIsLoggedInValue = hasFirebaseBeenInitialized
    ? !!firebase.auth().currentUser
    : null;

  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedInValue);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      hasFirebaseBeenInitialized = true;
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  return { isLoggedIn, login, logout, register };
}


export function getToken() {
  if (!firebase.auth().currentUser) {
    throw new Error("Cannot get a token because there is no current user. Did you forget to login?");
  }
  return firebase.auth().currentUser.getIdToken();
}


/***************************************************************************************/

const apiUrl = "/api/userprofile";

function login(email, pw) {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
    .then((signInResponse) => doesUserExist(signInResponse.user.uid))
    .then((doesUserExist) => {
      if (!doesUserExist) {

        // If we couldn't find the user in our app's database, we should logout of firebase
        logout();

        throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
      }
    }).catch(err => {
      console.error(err);
      throw err;
    });
}


function logout() {
  firebase.auth().signOut();
}


function register(userProfile, password) {
  return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
    .then((createResponse) => saveUser({
      ...userProfile,
      firebaseUserId: createResponse.user.uid
    }));
}


function doesUserExist(firebaseUserId) {
  return getToken().then((token) => fetch(`${apiUrl}/DoesUserExist/${firebaseUserId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(resp => resp.ok));
}


function saveUser(userProfile) {
  return getToken().then((token) => fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userProfile)
  }).then(resp => resp.json()));
}


