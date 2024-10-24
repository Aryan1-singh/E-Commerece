import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import './about.css';

function About() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/";
    }
  }, [navigate]);

  return (
    <>
      <Sidebar />
      <div className="about-container">
        <span className="about-text">
          Welcome to the E-Commerce platform! This application is developed as a project to test and enhance the developer's skills in building full-stack applications. It demonstrates functionalities like user authentication, order management, and more.
        </span>
      </div>
    </>
  );
}

export default About;
