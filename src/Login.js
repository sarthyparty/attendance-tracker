import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { auth, signInWithUsernameAndPassword } from "./firebase";
import "./Login.css";

function Login(props) {

  document.title = "Login";

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  var err = undefined;

  document.body.style.overflow = "hidden";
  if (localStorage.getItem("email") != "null" && localStorage.getItem("email") != null && auth.currentUser!=null && auth.currentUser.emailVerified){
    document.tile = "Dashboard";
    return <Navigate to="/dashboard"/>
  }

  // handle button click of login form
  const handleLogin = () => {
    setLoading(true);
    const err = signInWithUsernameAndPassword(username, password);
    err.then((value) => {
      if (value == null) {
        if(auth.currentUser!=null && auth.currentUser.emailVerified){
          navigate("/dashboard"); 
        }else{
          setError("If you registered, please verify your email. Verification instructions were sent to your email.");
        }
      } else {
        console.log(value);
        switch (value) {
          case "Firebase: The email address is badly formatted. (auth/invalid-email).":
            setError("Please type a valid email.");
            break;
          default:
            setError("Login failed");
            break;
        }
      }
      setLoading(false);
    });
  };

  return (
    <div class="login">
      <div class="form">
        <h1>Login</h1>
        <div class="text">
          <br />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="new-username"
          />
        </div>
        <div class="text" style={{ marginTop: 10 }}>
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <br />
        
        {error && <><small style={{ color: 'red' }}>{error}</small><br/><br></br></>}
            <div class = "button">
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
            </div>
            <br/>
            <Link to="/reset-password">Forgot Password</Link> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link to="/register">Sign Up</Link> 
      </div>
    </div>
  );
}

export default Login;
