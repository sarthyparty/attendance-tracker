import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {auth, resetPassword} from "./firebase";
import "./Register.css"

function PasswordReset(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("A password reset link will be sent to your email...");
    const [color, setColor] = useState('green');

  // handle button click of login form
    const handlePWReset = () => {
        setLoading(true);
        resetPassword(username)
        .then(value => {
            if (value == null) {
                if(auth.currentUser.emailVerified){
                  navigate("/successful-reset"); 
                }else{
                  setError("Please verify your email. Verification instructions were sent to your email.");
                }
            }else{
                setColor('red')
                console.log(value);
                switch(value){
                    case "Firebase: The email address is badly formatted. (auth/invalid-email).":
                        setError("Please type a valid email.");
                        break;
                    case "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).":
                        setError("This email is not on file.");
                        break;
                    default:
                        setError("Registering failed");
                        break;
                }
            }
            
            setLoading(false);
        });

        setLoading(false);
    }

    return (
        <div class="register">
            <h1>Reset Password</h1>
        <div class = "text">
            <br />
            <input 
                placeholder="Email"
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="new-username" 
            /><br /><br />
        </div>
            {error && <>
                <small style={{ color: color }}>
                    {error}
                </small>
                <br />
            </>}
            <div class = "button">
            <input type="button" value={loading ? 'Loading...' : 'Reset Password'} onClick={handlePWReset} disabled={loading} /><br />
            </div>
            <br/>
            <Link to="/login">Login</Link>
        </div>
  );
}

export default PasswordReset;