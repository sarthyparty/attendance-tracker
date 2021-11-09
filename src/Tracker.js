import React from 'react';
import { getTracker } from "./Utils.js";
import { useAsync } from "react-async"; 

function Tracker() {
  const temp = window.location.href.split('/');
  const len = temp.length
  const id = temp[len - 1];
  const {data} = useAsync({ promiseFn: getTracker, id});
  if (data) {
    console.log(data);
    return (
      <div>
        <h1>Present: {data.people.length}</h1>
        <h2>Join with code: {data.key}</h2>
        {data.people.map((person) => (
        <div class="card">
          <div class="card-body">
            <p>{person}</p>
          </div>
        </div>
      ))}
      </div>
    );
  }
  return <div>
    <h1>People</h1>
    <p>Loading...</p>
  </div>;
}

export default Tracker;