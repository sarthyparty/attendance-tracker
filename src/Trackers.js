import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getTrackers, removeTracker } from "./Utils.js";
import { useAsync } from "react-async";
import Loading from "./Loading.js";
import { FcCancel } from "react-icons/fc";

function Trackers() {
  var { data } = useAsync({ promiseFn: getTrackers });

  const deleteTracker = (tracker) => {
    removeTracker(tracker);
  };

  if (data) {
    for (let i = 0; i < data.items.length; i++) {
      let date = new Date(data.items[i].datetime);
      data.items[i].date =
        date.toDateString() + ": " + data.items[i].people.length + " joined";
    }

    console.log(data);

    return (
      <div class="trackers">
        <h1>My Attendance Trackers</h1>
        {data.items.map((tracker) => (
          <div class="cards">
            <div class="card-body">
              <Item tracker={tracker}/>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div class="trackers">
      <h1>My Attendance Trackers</h1>
      <div class="loading">
        <Loading />
      </div>
    </div>
  );
}

function Item(props) {
  const [deleted, setDeleted] = useState(false);
  const deleteTracker = () => {
    console.log(props.tracker);
    removeTracker(props.tracker);
    setDeleted(true);
  };
  if (deleted) {
    return <div class="deleted"></div>;
  }
  return (
    <div>
      <NavLink
        to={{
          pathname: "/dashboard/tracker/".concat(props.tracker.key),
        }}
      >
        {props.tracker.date}
      </NavLink>
      &nbsp;&nbsp;
      <button onClick={deleteTracker}>
        <FcCancel />
      </button>
    </div>
  );
}

export default Trackers;
