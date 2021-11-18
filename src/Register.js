import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registerWithUsernameAndPassword } from "./firebase";

// function currentloginid() {
//     return fetch('http://localhost/gaq/api/api.php?action=userid', {method: 'GET'})
//       .then(response => response.json())
//       .then(function(data) {
//         var userid = JSON.parse(data);
//         console.log(userid);
//         return userid;
//       })
//   }
  
//   currentloginid().then(value => console.log(value));

function Register(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  // handle button click of login form
    const handleRegister = () => {
        setLoading(true);
        registerWithUsernameAndPassword(username, username, password)
        .then(value => {
            if (value == null) {
                navigate("/login");
            }else{
                switch(value){
                    case "Firebase: The email address is badly formatted. (auth/invalid-email).":
                        setError("Please type a valid email.");
                        break;
                    case "Firebase: The email address is already in use by another account. (auth/email-already-in-use).":
                        setError("This email is already in use.");
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

// const useFormInput = initialValue => {
//     const [value, setValue] = useState(initialValue);

//     const handleChange = e => {
//         setValue(e.target.value);
//     };
//     return {
//         value,
//         onChange: handleChange
//     };
// };

export default Register;