import firebase from "firebase/app";
import "firebase/auth";


export const getToken = () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return currentUser.getIdToken();
};


export const login = (email, pw) => {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
    .then((signInResponse) => {
      loginStatus.apply(AUTH_ACTIONS.FIREBASE_LOGIN);
      return _doesUserExist(signInResponse.user.uid);
    })
    .then((doesUserExist) => {
      if (doesUserExist) {
        loginStatus.apply(AUTH_ACTIONS.API_LOGIN);
      } else {
        return logout().then(() => {
          throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
        });
      }
    }).catch(err => {
      console.error(err);
      throw err;
    });
};


export const logout = () => {
  return firebase.auth().signOut()
    .then(() => loginStatus.apply(AUTH_ACTIONS.LOGOUT));
};


export const register = (userProfile, password) => {
  return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
    .then((createResponse) => {
      loginStatus.apply(AUTH_ACTIONS.FIREBASE_LOGIN);
      return _saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid })
    })
    .then(() => loginStatus.apply(AUTH_ACTIONS.API_LOGIN));
};


export function onLoginStatusChange(handler) {
  loginStatus.setOnLoginStatusChangedHandler(handler);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginStatus.apply(AUTH_ACTIONS.REINSTATE_FIREBASE_LOGIN);
    } else {
      loginStatus.apply(AUTH_ACTIONS.LOGOUT);
    }
  });
};


const _apiUrl = "/api/userprofile";

function _doesUserExist(firebaseUserId) {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.ok));
}

function _saveUser(userProfile) {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
    }).then(resp => resp.json()));
}

const loginStatus = {
  _state: INITIAL,
  get _isLoggedIn() {
    return this._state === INITIAL ? null : this._state === AUTHENTICATED;
  },
  apply(action) {
    const prevIsLoggedIn = this._isLoggedIn;
    this._state = this._state(action);
    this._loginStatusChanged(prevIsLoggedIn);
  },
  setOnLoginStatusChangedHandler(handler) {
    handler(this._isLoggedIn);
    this._onLoginStatusChangedHandler = handler;
  },
  _onLoginStatusChangedHandler() { },
  _loginStatusChanged(prevIsLoggedIn) {
    if (prevIsLoggedIn !== this._isLoggedIn) {
      this._onLoginStatusChangedHandler(this._isLoggedIn);
    }
  }
};

const AUTH_ACTIONS = ['REINSTATE_FIREBASE_LOGIN', 'FIREBASE_LOGIN', 'API_LOGIN', 'LOGOUT']
  .reduce((actions, action) => ({ ...actions, [action]: action }), {});

function INITIAL(action) {
  switch (action) {
    case AUTH_ACTIONS.REINSTATE_FIREBASE_LOGIN: return AUTHENTICATED;
    case AUTH_ACTIONS.FIREBASE_LOGIN: return FIREBASE_AUTHENTICATED_API_UNAUTHENTICATED;
    case AUTH_ACTIONS.LOGOUT: return UNAUTHENTICATED;
    default: return INITIAL;
  }
}

function UNAUTHENTICATED(action) {
  switch (action) {
    case AUTH_ACTIONS.FIREBASE_LOGIN: return FIREBASE_AUTHENTICATED_API_UNAUTHENTICATED;
    default: return UNAUTHENTICATED;
  }
}

function FIREBASE_AUTHENTICATED_API_UNAUTHENTICATED(action) {
  switch (action) {
    case AUTH_ACTIONS.API_LOGIN: return AUTHENTICATED;
    case AUTH_ACTIONS.LOGOUT: return UNAUTHENTICATED;
    default: return FIREBASE_AUTHENTICATED_API_UNAUTHENTICATED;
  }
}

function AUTHENTICATED(action) {
  switch (action) {
    case AUTH_ACTIONS.LOGOUT: return UNAUTHENTICATED;
    default: return AUTHENTICATED;
  }
}
