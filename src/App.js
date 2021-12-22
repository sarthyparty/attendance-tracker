import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes} from 'react-router-dom';

import "./App.css"
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import Register from './Register';
import Tracker from "./Tracker.js";
import Stats from "./Stats.js";
import Trackers from "./Trackers.js";
import Join from "./Join.js"
import Welcome from "./Welcome.js";
import Create from "./CreateTracker.js"
import PasswordReset from "./PasswordReset";
import UpdateUser from "./UpdateUser"; //change to UpdateUser & give this method a jsx return type
import ResetMessage from "./ResetMessage";
 
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink><small></small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small></small>
            <NavLink activeClassName="active" to="/register">Register</NavLink><small></small>
          </div> */}
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="login" element={<Login/>} />
              <Route path="join/:id" element={<Join/>} />
              <Route path="register" element={<Register/>} />
              <Route path="reset-password" element={<PasswordReset/>} />
              <Route path="user-updates" element={<UpdateUser/>} /> 
              <Route path="successful-reset" element={<ResetMessage/>} />
              <Route path="dashboard" element={<Dashboard/>}>
                <Route path="" element={<Welcome/>} />
                <Route path="create" element={<Create/>} />
                <Route path="tracker/:id/*" element={<Tracker/>} />
                <Route path="stats" element={<Stats/>} />
                <Route path="trackers" element={<Trackers/>} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}
 
export default App;
