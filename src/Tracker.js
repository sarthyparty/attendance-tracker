import React, { useState } from "react";
import { getTracker } from "./Utils.js";
import { useAsync } from "react-async";
import Loading from "./Loading.js";
import Lock from "./Lock.js";
import { FcDownload } from "react-icons/fc";
import Person from "./Delete.js";
import { CSVLink } from "react-csv";

function Tracker() {

  const temp = window.location.href.split("/");
  const len = temp.length;
  const id = temp[len - 1];
  var { data, error } = useAsync({ promiseFn: getTracker, id });

  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
  ];

  if (error) {
    return <h1>Invalid tracker url</h1>;
  }
  if (data) {
    var csvStuff = [];
    for (let i = 0; i < data.people.length; i++) {
      const names = data.people[i].split(" ");
      csvStuff.push({ firstName: names[0], lastName: names[1] });
    }
    let date = new Date(data.datetime);
    document.title = date.toDateString();
    const csvReport = {
      data: csvStuff,
      headers: headers,
      filename: date.toDateString() + ".csv",
    };
    return (
      <div class="info">
        <h1>Join with code: {data.key} </h1>
        <div class="icons">
          <div class="icon">
            <Lock lock={data.isLocked} tracker={data} />
          </div>
          <div class="icon">
            <CSVLink {...csvReport}>
              <FcDownload />
            </CSVLink>
          </div>
        </div>
        <br />
        <h2>{data.people.length} people</h2>
        <br />
        {data.people.map((person) => (
          <div class="name">
            <Person person={person} tracker={data} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div class="info">
      <Loading />
    </div>
  );
}

export default Tracker;
