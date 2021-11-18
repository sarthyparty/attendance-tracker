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

const signInWithUsernameAndPassword = async (username, password) => {
  try {
    await auth.signInWithEmailAndPassword(username, password);
  } catch (err) { 
    return err.message;
  }
};

const registerWithUsernameAndPassword = async (name, username, password) => {
  var retVal = null;
  try {
    const res = await auth.createUserWithEmailAndPassword(username, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      username,
      password,
    });
  } catch (err) {
    //console.log(err.message);
    //alert(err.message); 
    retVal = err.message;
  }
  //console.log(retVal);
  return retVal;
};

//probs won't need this/just focus on logins
const logout = () => { 
  auth.signOut();
};

export {
  auth,
  db,
  signInWithUsernameAndPassword,
  registerWithUsernameAndPassword,
  logout,
};


