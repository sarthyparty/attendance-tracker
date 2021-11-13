import React, { useState } from 'react';
import { getTracker } from "./Utils.js";
import { useAsync } from "react-async"; 
import Loading from "./Loading.js";
import Lock from "./Lock.js"

function Tracker() {

  const temp = window.location.href.split('/');
  const len = temp.length
  const id = temp[len - 1];
  var {data, error} = useAsync({ promiseFn: getTracker, id});

  if (error) {
    return <h1>Invalid tracker url</h1>
  }
  if (data) {
    console.log(data);
    return (
      <div class = "info">
        <h1>Join with code: {data.key} <Lock lock = {data.isLocked} tracker = {data}/></h1>
        <br/>
        <h2>{data.people.length} people</h2>
        <br/>
        {data.people.map((person) => (
        <div class="name">
          <div class="name-body">
            <p>{person}</p>
          </div>
        </div>
      ))}
      </div>
    );
  }
  return <div class = "info">
    <Loading/>
  </div>;
}


export default Tracker;