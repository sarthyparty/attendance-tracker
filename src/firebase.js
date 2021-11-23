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
  try {
    await auth.sendPasswordResetEmail(username);
  } catch (err) {
      console.log(err.message);
  }
}

export {
  auth,
  db,
  signInWithUsernameAndPassword,
  registerWithUsernameAndPassword,
  resetPassword
};


