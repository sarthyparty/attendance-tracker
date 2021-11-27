import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import Typewriter from "typewriter-effect";


function Login(props) {
  const code = useFormInput("");
  const navigate = useNavigate();

  // handle button click of login form
  const join = () => {
    navigate("/join/" + code.value)
  };

  document.title = "Home";

  return (
    <div class = "home">
      <br />
      <br />
      <div class="label">
            <Typewriter
            onInit={(typewriter) => {
              typewriter
              .typeString("Welcome!")
              .stop()
              .start();}}
            />
      </div>
      <div>
        <br />
        <div class="box" style={{width:300, height:100}}>
        <input type="text" placeholder="Type in code ..." {...code} autoComplete="new-password" />
        <br />
        <br />
        </div>
      </div>
      <br />
      <div class = "join_button" style={{width:200, height:100}}>
      <input type="button" value={"Join"} onClick={join}/>
      </div>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
