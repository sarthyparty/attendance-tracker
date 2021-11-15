import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registerWithUsernameAndPassword } from "./firebase";

function Register(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    var error = null;

  // handle button click of login form
    const handleRegister = () => {
        error = registerWithUsernameAndPassword(username, username, password);
        setLoading(true);
        error.then(meta => {
            console.log(meta); 
            if(meta==null){
                navigate("/dashboard");
            }else{
                navigate("/login")
            }
        });
        // if(error){
        //     console.log(error);
        // }
        // setLoading(true);
        // if(error==null){
        //     navigate("/dashboard");
        // }else{
        //     navigate("/login")
        // }
        
        //setError(err);
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
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
            <br />
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