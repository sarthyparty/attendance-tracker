import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import {containsLettersAndNumbers} from './Register';

export function handleEmailVerification(){
  
}

export function handleResetPassword(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  var password = null;
  var error = null;

  // Verify the password reset code is valid.
  verifyPasswordResetCode(auth, actionCode).then((email) => {
    const accountEmail = email;

    // TODO: Show the reset screen with the user's email and ask the user for
    // the new password.

    // Save the new password.
    if(!containsLettersAndNumbers(password)){
      error="Password must be at least 6 characters and must contain letters and numbers";
    }else{
      confirmPasswordReset(auth, actionCode, password).then((resp) => {
        // Password reset has been confirmed and new password updated.
  
        // TODO: Display a link back to the app, or sign-in the user directly
        // if the page belongs to the same domain as the app:
        // auth.signInWithEmailAndPassword(accountEmail, newPassword);
  
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
      }).catch((error) => {
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
        error = "Firebase: could not confirm password reset";
      });
    }
  }).catch((error) => {
    // Invalid or expired action code. Ask user to try to reset the password
    // again.
    error = "Invalid or expired action code: please reset password again";
  });

  return (
    <div class="register">
        <h1>Reset Password</h1>
    <div class = "text">
        <br />
        <input 
            placeholder="New Password"
            type="text" 
            onChange={(e) => password = e.target.value}
            autoComplete="new-username" 
        /><br /><br />
    </div>
        {error && <>
            <small style={{ color: 'red' }}>
                {error}
            </small>
            <br />
        </>}
    </div>
);
}