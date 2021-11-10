import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getTrackers } from "./Utils.js";
import { useAsync } from "react-async";
import Loading from "./Loading.js";

function Trackers() {
  const { data } = useAsync({ promiseFn: getTrackers });
  if (data) {
    console.log(data);
    return (
      <div class="trackers">
        <h1>Attendance Trackers</h1>
        {data.items.map((tracker) => (
          <div class="cards">
            <div class="card-body">
              <NavLink
                to={{
                  pathname: "/dashboard/tracker/".concat(tracker.key),
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
  return (
    <div class = "trackers">
      <h1>Attendance Trackers</h1>
      <div class="loading">
        <Loading />
      </div>
    </div>
  );
}

export default Trackers;
