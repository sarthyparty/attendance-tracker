import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "./Loading.js";
import { getMembers } from "./Utils.js";
import { useAsync } from "react-async";
import { Link } from "react-router-dom";

function Stats(props) {

  const { data } = useAsync({promiseFn: getMembers});

  if (data) {
    return (
      <div class="stats">
      <h1>This page is temporarily unavailable.</h1>
        {/* {data.members.map((person) => (
          <div class="cards">
            <div class="card-body">
              <Link to={"/dashboard/"+person}>{person}</Link>
            </div>
          </div>
        ))} */}
      </div>
    );
  } 
  return <Loading/>;
  
}

export default Stats;
