import React, { useState } from 'react';
import { Deta } from 'deta';
import { useNavigate } from "react-router-dom";
import { registerWithUsernameAndPassword } from "./firebase";

import { DEV_PROJECT_KEY } from "./Keys.js"

function Register(props) {
    const navigate = useNavigate();
    //const username = useFormInput("blah");
    //const password = useFormInput("blah");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

  // handle button click of login form
    const handleRegister = () => {
        registerWithUsernameAndPassword(username, password)
        //createUserWithEmailAndPassword(auth, username, password)
        setError(null);
        setLoading(false);
        navigate("/dashboard")
    }

    return (
        <div className="register">
            Register
            <br />
            <br />
        <div>
            Username
            <br />
            <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="new-username" 
            />
        </div>
        <div style={{ marginTop: 10 }}>
            Password
            <br />
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)} 
                autoComplete="new-password" 
            />
        </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
        </div>
  );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    };
    return {
        value,
        onChange: handleChange
    };
};

export default Register;