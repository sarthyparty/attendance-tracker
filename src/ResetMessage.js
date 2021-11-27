import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {resetPassword} from "./firebase";
import "./Register.css"

function ResetMessage(props){
    return (
        <div class="register">
            <h1>Success!</h1>
            <p>Password reset instructions sent to your email.</p>
            <br/>
            <br/>
            <Link to="/login">Login</Link>
        </div>
  );
}

export default ResetMessage;