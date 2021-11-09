import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getTrackers } from "./Utils.js";
import { useAsync } from "react-async";

function Trackers() {
  const {data} = useAsync({ promiseFn: getTrackers });
  if (data) {
    console.log(data);
    return (
      <div>
        <h1>Trackers</h1>
        {data.items.map((tracker) => (
        <div class="card">
          <div class="card-body">
            <NavLink
              to={{
                pathname: "/dashboard/tracker/".concat(tracker.key)
              }}
            >
              {tracker.datetime}
            </NavLink>
          </div>
        </div>
      ))}
      </div>
    );
  }
  return <div>
    <h1>Trackers</h1>
    <p>Loading...</p>
  </div>;
}

export default Trackers;
