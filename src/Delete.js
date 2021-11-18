import { FaLock, FaLockOpen } from "react-icons/fa";
import React, { useState } from 'react';
import { removePerson, removeTracker } from "./Utils.js"

function Person(props) {
  
  const [deleted, setDeleted] = useState(false)

  console.log(props.person);
  const handleClick = () => {
    removePerson(props.tracker, props.person);
    setDeleted(true);
  }

  if (deleted) {
    return <div class = "deleted">
    </div>
  } else {
    return (
      <div class = "delete">
        <button onClick = {handleClick}>
          {props.person}
        </button>
      </div>
    );
  }
}

export default Person;
