import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { getTrackers } from "./Utils.js";
import { useAsync } from "react-async";
import Loading from "./Loading.js";

function Trackers() {
  var { data } = useAsync({ promiseFn: getTrackers });

  
  if (data) {
    for (let i = 0; i < data.items.length; i++) {
      let date = new Date(data.items[i].datetime);
      data.items[i].date = date.toDateString() + ": "+ data.items[i].people.length + " joined";
    }
    
    console.log(data);

    return (
      <div class="trackers">
        <h1>My Attendance Trackers</h1>
        {data.items.map((tracker) => (
          <div class="cards">
            <div class="card-body">
              <NavLink
                to={{
                  pathname: "/dashboard/tracker/".concat(tracker.key),
                }}
              >
                {tracker.date}
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div class = "trackers">
      <h1>My Attendance Trackers</h1>
      <div class="loading">
        <Loading />
      </div>
    </div>
  );
}

export default Trackers;
