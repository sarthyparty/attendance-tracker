import React from 'react';
import { BrowserRouter, Route, NavLink, Routes} from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import Register from './Register';
import Tracker from "./Tracker.js";
import Stats from "./Stats.js";
import Trackers from "./Trackers.js";
import Join from "./Join.js"
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink><small></small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small></small>
            <NavLink activeClassName="active" to="/register">Register</NavLink><small></small>
          </div>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/join/:id" element={<Join/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/dashboard/*" element={<Dashboard/>}/>
              <Route path="/dashboard/tracker/:id" element={<Tracker/>} />
              <Route path="/dashboard/stats" element={<Stats/>} />
              <Route path="/dashboard/trackers" element={<Trackers/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;
