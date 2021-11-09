import React from 'react';
import { NavLink } from 'react-router-dom';
import { setupTracker } from "./Utils.js"


function Dashboard(props) {

  const handleLogout = () => {
    props.history.push("/login");
  };


  return (
    <div>
      <div className="header">
            <NavLink activeClassName="active" to="/dashboard/trackers">Trackers</NavLink><small></small>
            <NavLink activeClassName="active" to="/dashboard/stats">Stats</NavLink><small></small>
      </div>
      <input type="button" onClick={handleLogout} value="Logout" />
      <input type="button" onClick={setupTracker} value="Create Tracker" />
    </div>
  );
}

export default Dashboard;