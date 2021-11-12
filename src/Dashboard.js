import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";

function Dashboard(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const create = () => {
    navigate("/dashboard/create");
  };

  return (
    <div>
      <Navbar />
      <Outlet />
      <div class="dashboard">
        <input type="button" onClick={handleLogout} value="Logout" />
        <input type="button" onClick={create} value="Create Tracker" />
      </div>
    </div>
  );
}

export default Dashboard;
