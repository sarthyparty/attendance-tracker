import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTracker, joinTracker, getUser} from "./Utils.js";
import { useAsync } from "react-async";
import Loading from "./Loading.js";
import Dropdown from "./Dropdown.js"
import Tracker from "./Tracker.js";

function Join(props) {
  const temp = window.location.href.split("/");
  const len = temp.length;
  const id = temp[len - 1];
  const { data } = useAsync({ promiseFn: getTracker, id });

  document.title = "Join";

  if (data) {
    if (data.isLocked) {
      return <h1>This tracker is locked.</h1>
    }
    const user = data.user;

    return (
      <div class = "join">
      <Dropdown email={data.user} tracker={data}/>
      </div>
    );
  }
  return <Loading/>
}

export default Join;
