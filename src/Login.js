import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { auth, signInWithUsernameAndPassword } from "./firebase";
//import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login(props) {
    const navigate = useNavigate();
    // const username = useFormInput('');
    // const password = useFormInput('');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    var err = undefined;

  // handle button click of login form
    const handleLogin = () => {
        setLoading(true);
        const err = signInWithUsernameAndPassword(username, password);
        err.then(value => {
            if (value == null) {
                navigate("/dashboard");
            }
            setError(value);
            setLoading(false);
        });
        
    }

    return (
        <div className="login">
            Login
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
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
        </div>
  );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return {
        value,
        onChange: handleChange
    };
};

export default Login;