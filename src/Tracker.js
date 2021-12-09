import React, { useState } from "react";
import { getTracker, getUser } from "./Utils.js";
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
  const email = localStorage.getItem("email");
  var member = useAsync({ promiseFn: getUser,  email});
  const [present, setPresent] = useState(true);
  var absentees;

  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
  ];

  function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

  const handleClick1 = () => {
    setPresent(true);
  };

  const handleClick2 = () => {
    setPresent(false);
  };
  if (error) {
    return <h1>Invalid tracker url</h1>;
  }
  if (data && member.data) {
    var csvStuff = [];
    for (let i = 0; i < data.people.length; i++) {
      const names = data.people[i].split(" ");
      csvStuff.push({ firstName: names[0], lastName: names[1] });
    }
    absentees = Array.from(difference(new Set(member.data.members), new Set(data.people)))
    console.log(absentees);
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
        <div class="stuff">
          <div class="present">
            <div class={present ? "selected" : "not-selected"}>
              <input
                type="button"
                value={" Present "}
                onClick={handleClick1}
              />
            </div>
            <div class={present ? "not-selected" : "selected"}>
              <input
                type="button"
                value={" Absent "}
                onClick={handleClick2}
              />
            </div>
          </div>
          <br/>
          <div class={present ? "list-active" : "list"}>
            {data.people.map((person) => (
              <div class="name">
                <Person person={person} tracker={data} present={false} />
              </div>
            ))}
          </div>
          <div class={present ? "list" : "list-active"}>
            {absentees.map((person) => (
              <div class="name">
                <p>{person}</p>
              </div>
            ))}
          </div>
        </div>
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
