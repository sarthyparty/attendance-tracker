import React, { useState } from "react";
import { getUser, joinTracker } from "./Utils.js";
import { useAsync } from "react-async";
import { useNavigate } from "react-router-dom";
import Creatable from "react-select/creatable";
import Loading from "./Loading.js";

function Dropdown(props) {
  const email = props.email;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("red");
  const [option, setOption] = useState(null);
  const { data } = useAsync({ promiseFn: getUser, email });

  const handleJoin = () => {
    setError(null);
    setLoading(true);
    let msg = joinTracker(option, props.tracker, data);
    setError(msg);
    setLoading(false);
    if (msg == "Success") {
      setColor("green");
    } else {
      setColor("red");
    }
  };

  const handleChange = (e) => {
    if (e.value) {
      setOption(e.value);
      console.log(e.value);
      setError(null);
    }
  };

  if (data) {
    var options = [];
    for (let i = 0; i < data.members.length; i++) {
      options.push({ value: data.members[i], label: data.members[i] });
    }
    return (
      <div class="dropdown">
        <h1>Type your name!</h1>
        <br />
        <Creatable options={options} onChange={handleChange} />
        {error && (
          <>
            <small style={{ color: color }}>{error}</small>
            <br />
          </>
        )}
        <br />
        <div class="button">
          <button onClick={handleJoin}>Mark Me Present!</button>
        </div>
      </div>
    );
  }
  return (
    <div class="Loading">
      <Loading />
    </div>
  );
}

export default Dropdown;
