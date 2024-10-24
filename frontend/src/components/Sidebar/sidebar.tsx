"use client";

import React from 'react';
import "./sidebar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <div className="sidebar1 d-flex flex-column vh-100">
      <h3>E-Commerce</h3>
      <ul className="flex-grow-1">
        <li onClick={() => navigate('/dashboard')} >Manage Order</li>
        <li onClick={() => navigate('/about')} >About us</li>
      </ul>
      
      <div className="d-flex  align-items-end">
        <button className="btn btn-link p-0 text-decoration-none logoutbtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
