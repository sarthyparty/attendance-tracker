import React from 'react';
import { setupTracker } from "./Utils.js";
import { useAsync } from "react-async";
import Loading from "./Loading.js";
import { Navigate } from "react-router-dom";

function Create() {
  const { data } = useAsync({ promiseFn: setupTracker });

  if (data) {
    console.log(data);
    return (
      <Navigate to={"/dashboard/tracker/" + data.key}/>
    );
  }
  return (
    <div class = "trackers">
      <div class="loading">
        <Loading />
      </div>
    </div>
  );
}

export default Create;