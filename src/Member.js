import { FaLock, FaLockOpen } from "react-icons/fa";
import React, { useState } from 'react';
import { switchLock } from "./Utils.js"
import { Outlet } from "react-router-dom";

function Member(props) {
  
  return <>
    <h1>This is temporarily unavailable</h1>
    <Outlet/>
  </>
}

export default Member;