import React, { useState } from 'react';
import { getTracker } from "./Utils.js";
import { useAsync } from "react-async"; 
import Loading from "./Loading.js";

function Info() {

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
        <h1>Join with code: {data.key}</h1>
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

class Tracker extends React.Component {
  handleClick = () => {
    // force a re-render
    this.forceUpdate();
  };
  render(props) {
    return (
    <div>
      {/* <button onClick={this.handleClick}>helo</button> */}
      <Info/>
    </div>
    );
  }
}


export default Tracker;