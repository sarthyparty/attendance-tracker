import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTracker, joinTracker} from "./Utils.js";
import { useAsync } from "react-async";

function Join(props) {
  const navigate = useNavigate();
  const name = useFormInput("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const temp = window.location.href.split("/");
  const len = temp.length;
  const id = temp[len - 1];
  const { data } = useAsync({ promiseFn: getTracker, id });
  // handle button click of login form
  const handleJoin = () => {
    setError(null);
    setLoading(true);
    let msg = joinTracker(name, data);
    setError(msg);
    setLoading(false);
    navigate("/");
  };

  if (data) {
    return (
      <div>
        Type your name:
        <br />
        <br />
        <div>
          Name
          <br />
          <input type="text" {...name} autoComplete="new-password" />
        </div>
        {error && (
          <>
            <small style={{ color: "red" }}>{error}</small>
            <br />
          </>
        )}
        <br />
        <input
          type="button"
          value={loading ? "Loading..." : "Record my attendance"}
          onClick={handleJoin}
          disabled={loading}
        />
        <br />
      </div>
    );
  }
  return <h1>Loading...</h1>
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Join;
