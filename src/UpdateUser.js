import { verifyPasswordResetCode, confirmPasswordReset, applyActionCode } from "firebase/auth";
import {containsLettersAndNumbers} from './Register';
import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from "react-router-dom";
import {initializeApp} from "firebase/app";
import {auth} from "./firebase";

var verified=false;

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function UpdateUser(props){
  var jsx_elem = null;

  //Get action to complete
  const mode = getParameterByName('mode');
  
  // Get the one-time code from the query parameter.
  const actionCode = getParameterByName('oobCode');

  // (Optional) Get the continue URL from the query parameter if available.
  const continueUrl = getParameterByName('continueUrl');

  // (Optional) Get the language code if available.
  const lang = getParameterByName('lang') || 'en';

  // Handle the user management action.
  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      jsx_elem = HandleResetPassword(auth, actionCode, continueUrl, lang);
      break;
    case 'recoverEmail':
      // Display email recovery handler and UI.
      //handleRecoverEmail(auth, actionCode, lang);
      break;
    case 'verifyEmail':
      // Display email verification handler and UI.
      jsx_elem = HandleVerifyEmail(auth, actionCode, continueUrl, lang);
      break;
    default: //nothing should be done here
      jsx_elem = <div>Inappropriate Mode</div> //good if this was a 404 error page
  }

  return jsx_elem;
}


function HandleResetPassword(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('red');
  const [error, setError] = useState("");
  const [successfulReset, setSuccessfulReset] = useState(false);

  const handlePWReset = () => {
  setLoading(true);
  // Verify the password reset code is valid.
  verifyPasswordResetCode(auth, actionCode).then((email) => {
    const accountEmail = email;
    if(!containsLettersAndNumbers(password)){
      setColor('red');
      setError("Password must be at least 6 characters and must contain letters and numbers");
    }else{
      confirmPasswordReset(auth, actionCode, password).then((resp) => {
        // Password reset has been confirmed and new password updated.
        setColor('green');
        setError("Password reset successful!");
        setSuccessfulReset(true);
  
        // TODO: Display a link back to the app, or sign-in the user directly
        // if the page belongs to the same domain as the app:
        // auth.signInWithEmailAndPassword(accountEmail, newPassword);
  
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
      }).catch((error) => {
        console.log(error);
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
        setColor('red');
        setError("Firebase: could not confirm password reset");
      });
    }
    setLoading(false);
  }).catch((error) => {
    console.log(error);
    setColor('red');
    setError("Invalid or expired action code: please reset password again"); 
    setLoading(false);
  });
  }
  return (
    <div className = "register">
        <h1>Reset Password</h1>
    <div className = "text">
        <br />
        <input 
            placeholder="New Password"
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-username" 
        /><br /><br />
    </div>
          {error && <> <small style={{ color: color }}>{error}</small><br /></>}
          <div className = "button">
          <input type="button" value={loading ? 'Loading...' : 'Reset Password'} onClick={handlePWReset} disabled={loading} /><br />
          </div>
          <br/>
          {successfulReset ? <Link to="/login">Login</Link> : <></>}
    </div>

  );
}

  function HandleVerifyEmail(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Try to apply the email verification code.

    
    const [successfulVerification, setSuccessfulVerification] = useState(false);
    const [color, setColor] = useState('red');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailVerif = () => {
    setLoading(true);
    applyActionCode(auth, actionCode).then((resp) => {
      // Email address has been verified.
  
      // TODO: Display a confirmation message to the user.
      // You could also provide the user with a link back to the app.
      setColor('green');
      setError('Verification Successful!');
      verified=true;
      setSuccessfulVerification(true);
  
      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
      setLoading(false);
    }).catch((error) => {
      // Code is invalid or expired. Ask the user to verify their email address
      // again.
      console.log(error);
      setColor('red');
      setError('Verification code is invalid or expired. Please verify again.');
      setSuccessfulVerification(false);

      setLoading(false);
    });
    }
    return (
      <div className = "register">
          <h1>Verify Email</h1>
          {error && <> <small style={{ color: color }}>{error}</small><br /></>}
          <div className = "button">
          <input type="button" value={loading ? 'Loading...' : 'Verify Email'} onClick={handleEmailVerif} disabled={loading} /><br />
          </div>
          <br/>
          {successfulVerification || verified ? <Link to="/login">Login</Link> : <></>}
      </div>
  
    );
  }


export default UpdateUser;