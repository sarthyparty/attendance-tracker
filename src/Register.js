import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { auth, registerWithUsernameAndPassword, sendVerificationEmail } from "./firebase";
import "./Register.css"
import { createUser } from "./Utils.js"

//At least 6 characters & must contain letters and numbers
export function containsLettersAndNumbers(password){
    var letterCount = 0;
    var numCount = 0;
    for(var i=0; i<password.length; i++) {
        if("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".includes(password.charAt(i))){
            letterCount++;
        }
        if("0123456789".includes(password.charAt(i))){
            numCount++;
        }
    }
    return letterCount>0 && numCount>0;
}

function Register(props) {
    document.title = "Register";
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [color, setColor] = useState('red');

  // handle button click of login form
    const handleRegister = () => {
        setLoading(true);

        if(password.length < 6 || !containsLettersAndNumbers(password)){
            console.log(error+" "+password);
            setColor('red');
            setError("Password must be at least 6 characters and must contain letters and numbers");
        }else{
            setError(null);
            registerWithUsernameAndPassword(username, password)
            .then(value => {
                if (value == null) {
                    console.log(auth.currentUser);
                    if(auth.currentUser.emailVerified){
                        createUser(username);
                        navigate("/login");
                    }else{
                        setColor('green');
                        sendVerificationEmail();
                        setError("Email verification instructions are sent to your email. When finished, go to Login");
                        //need an async method that will wait for user to click verification --> navigate to dashboard;
                    }
                }else{
                    setColor('red');
                    console.log(value);
                    //console.log(auth.currentUser.emailVerified);
                    switch(value){
                        case "Firebase: The email address is badly formatted. (auth/invalid-email).":
                            setError("Please type a valid email.");
                            break;
                        case "Firebase: The email address is already in use by another account. (auth/email-already-in-use).":
                            setError("This email is already in use.");
                            break;
                        case "Missing or insufficient permissions.":
                            setColor('green');
                            sendVerificationEmail();
                            setError("Email verification instructions are sent to your email. When finished, go to Login");
                            break;
                        default:
                            setError("Registering failed");
                            break;
                    }
                }
            
                setLoading(false);
            });
        }
        
        setLoading(false);
    }

    return (
        <div class="register">
            <h1>Sign Up</h1>
        <div class = "text">
            <br />
            <input 
                placeholder="Email"
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="new-username" 
            />
        </div>
        <div class = "text" style={{ marginTop: 10 }}>
            <br />
            <input 
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)} 
                autoComplete="new-password" 
            />
            <br/><br/>
        </div>
            {error && <><small style={{ color: color }}>{error}</small><br /></>}
            <div class = "button">
            <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
            </div>
            <br/>
            <Link to="/login">Login</Link>
        </div>
  );
}

export default Register;
