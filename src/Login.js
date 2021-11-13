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
    
    //const [user, loading, error] = useAuthState(auth);
    //const [username, setUsername] = useState("");
    //const [password, setPassword] = useState("");
    //const history = useHistory(); **import from "react-router-dom";

    // useEffect(() => { **import from 'react'
    //     if (loading) {
    //       // maybe trigger a loading screen
    //       return;
    //     }
    //     if (user) history.replace("/dashboard");
    //   }, [user, loading]);

  // handle button click of login form
    const handleLogin = () => {
        signInWithUsernameAndPassword(username, password)
        setError("login failed");
        setLoading(true);
        navigate("/dashboard")
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
                type="text" //{...username}  
                //className="login__textBox"
                //value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="new-username"
                //placeholder="Username"
            />
        </div>
        <div style={{ marginTop: 10 }}>
            Password
            <br />
            <input 
                type="password" //{...password} 
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password" 
                //className="login__textBox"
                //value={password}
                
                //placeholder="Password"
            />
        </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
        </div>
    // <div className="login">
    //   <div className="login__container">
    //     <input
    //       type="text" {...username} //autoComplete="new-username"
    //       className="login__textBox"
    //       value={username}
    //       //onChange={(e) => setUsername(e.target.value)}
    //       placeholder="Username"
    //     />
    //     <input
    //       type="password" {...password} //autoComplete="new-password" 
    //       className="login__textBox"
    //       value={password}
    //       //onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <button
    //       className="login__btn"
    //       onClick={() => handleLogin()}
    //     >
    //   </button>
    //   </div>
    // </div>

        
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