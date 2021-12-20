// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from "./Keys.js"

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
export default firebase;

const signInWithUsernameAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    localStorage.setItem('email', email);
  } catch (err) { 
    return err.message;
  }
  return null;
};

const registerWithUsernameAndPassword = async (username, password) => {
  var retVal = null;
  try {
    const res = await auth.createUserWithEmailAndPassword(username, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      authProvider: "local",
      username,
      password,
    });
  } catch (err) {
    retVal = err.message;
  }
  return retVal;
};

const resetPassword = async(username) => {
  var retval = null;
  try {
    await firebase.auth().currentUser.sendPasswordResetEmail(username);
  } catch (err) {
      retval = err.message;
  }return retval;
}

const sendVerificationEmail = async() => {
  var retVal = null;
  var user = auth.currentUser;
  try {
    user.sendEmailVerification();
  } catch (err) {
    console.log(err);
    retVal = err.message;
  }return retVal;
}

export {
  auth,
  db,
  signInWithUsernameAndPassword,
  registerWithUsernameAndPassword,
  resetPassword,
  sendVerificationEmail
};


