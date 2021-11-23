import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {resetPassword} from "./firebase";
import "./Register.css"

function PasswordReset(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  // handle button click of login form
    const handlePWReset = () => {
        setLoading(true);
        resetPassword(username)
        .then(value => {
            if (value == null) {
                navigate("/login");
            }else{
                console.log(value);
                // switch(value){
                //     case "Firebase: The email address is badly formatted. (auth/invalid-email).":
                //         setError("Please type a valid email.");
                //         break;
                //     case "Firebase: The email address is already in use by another account. (auth/email-already-in-use).":
                //         setError("This email is already in use.");
                //         break;
                //     default:
                //         setError("Registering failed");
                //         break;
                // }
            }
            
            setLoading(false);
        });

        setLoading(false);
    }

    return (
        <div class="register">
            <h1>Reset Password</h1>
            <label>Reset password link sent will be sent to your email . . .</label>
        <div class = "text">
            <br />
            <input 
                placeholder="Email"
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="new-username" 
            /><br /><br />
        </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
            <div class = "button">
            <input type="button" value={loading ? 'Loading...' : 'Password'} onClick={handlePWReset} disabled={loading} /><br />
            </div>
            <br/>
            <Link to="/login">Login</Link>
        </div>
  );
}

export default PasswordReset;