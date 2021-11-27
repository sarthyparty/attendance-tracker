import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {resetPassword} from "./firebase";
import "./Register.css"

function ResetMessage(props){
    return (
        <div class="register">
            <h1>Password reset link sent to your email!</h1>
            <h1>Follow the instructions the link provides</h1>
            <br/>
            <br/>
            <Link to="/login">Login</Link>
        </div>
  );
}

export default ResetMessage;