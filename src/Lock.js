import { FaLock, FaLockOpen } from "react-icons/fa";
import React, { useState } from 'react';
import { switchLock } from "./Utils.js"

function Lock(props) {
  
  const [locked, setLocked] = useState(props.lock)

  const handleClick = () => {
    switchLock(props.tracker);
    setLocked(!locked);
  }

  if (locked) {
    return (
      <div class = "lock">
        <button onClick = {handleClick}>
          <FaLock />
        </button>
      </div>
    );
  } else {
    return (
      <div class = "lock">
        <button onClick = {handleClick}>
          <FaLockOpen />
        </button>
      </div>
    );
  }
}

export default Lock;
