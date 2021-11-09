import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(props) {
  const code = useFormInput("");
  const navigate = useNavigate();

  // handle button click of login form
  const join = () => {
    navigate("/join/" + code.value)
  };

  return (
    <div>
      <br />
      <br />
      <div>
        Code
        <br />
        <input type="text" {...code} autoComplete="new-password" />
      </div>
      <input
        type="button"
        value={"Join"}
        onClick={join}
      />
      <br />
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
