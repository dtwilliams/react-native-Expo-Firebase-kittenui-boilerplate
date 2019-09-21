
import firebase from '../firebase';

import * as Facebook from 'expo-facebook';

export async function signInWithFacebook() {
  const appId = Expo.Constants.manifest.extra.facebook.appId;
  const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs
  
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(appId, {permissions});

  switch (type) {
    case 'success': {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      // merge user accounts - call mergeUser function, get user, call firebase.link()
      const facebookProfileData = await firebase.auth().signInWithCredential(credential)
        .catch(err => mergeUser(err));
      await createUser(facebookProfileData.user.uid, facebookProfileData.user);
      return Promise.resolve({ type: 'success' });
    }
    case 'cancel': {
      return Promise.reject({ type: 'cancel' });
    }
  }
}

async function createUser(uid, user) {
  const db = await firebase.database().ref(`/users/${uid}/userDetails`).set({
    username: user.username || user.email,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
}

async function mergeUser(error) {
  if (error.code == 'auth/account-exists-with-different-credential') {
    // firebase.auth().fetchSignInMethodsForEmail(error.email)
    //   .then(res => console.log('res', res));
    // lookup user from email and link error.email
    return Promise.resolve({ type: 'merge success' });
  }
  return Promise.reject({ type: 'merge error', error: error.message });
}

export async function signInWithTwitter(token) {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const credential = firebase.auth.TwitterAuthProvider.credential(token.oauth_token, token.oauth_token_secret);
    const twitterProfileData = await firebase.auth().signInWithCredential(credential)
      .catch(err => mergeUser(err));
    await createUser(twitterProfileData.user.uid, twitterProfileData.user);
    return Promise.resolve({ type: 'success' });
  }
  catch (err) {
    console.log('err', err);
    return Promise.reject({ type: 'cancel' });
  }
}

export async function signUp(data) {
  const { username, email, password } = data;
  const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
  await createUser(user.user.uid, user.user);
  return user;
}

export async function signIn(data) {
  const { username, password } = data;
  return firebase.auth().signInWithEmailAndPassword(username, password);
}

export function isInitialized() {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(resolve)
  })
}

// Get message from firebase and do the reset
export const authStateChanged = () => {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log('Authactions: Line 260: Dispatched loggedin');
          resolve({
            payload: 'loggedin',
            data: user
          });
        } else {
          // console.log('Authactions: Line 216: Dispatched not loggedin');
          resolve({
            payload: 'notloggedin'
          });
        }
      });
  });
}

export const getCurrentUsername = () => {
  return firebase.auth().currentUser; 
}

export async function logOut() {
  return firebase.auth().signOut();
}

export async function forgotPassword({ email }) {
  return firebase.auth().sendPasswordResetEmail(email)
    .then(() => ({ success: 'A password reset has been emailed to you.' }));
}
