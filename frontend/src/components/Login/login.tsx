"use client";
// import Image from "next/image";
import "./login.css"; // Make sure this file contains your styles
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const Base_Url = 'http://localhost:8000/';
  const navigate = useNavigate(); // Use useNavigate here


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${Base_Url}users/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        // Redirect to Dashboard
        navigate('/dashboard'); // Redirect to the dashboard page
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="container1">
      <div className="loginItem">
        <h1 className="text-center fontLogin">
          Login to Your Account
        </h1>

        <h5 className="text-center text-secondary mt-4 fontCommon">
          Welcome to the E-Commerce.
        </h5>
        <h5 className="text-center text-secondary fontCommon">
          Please log in to view Dashboard.
        </h5>
      </div>
      <div className="textBox">
        <div className="inputBoxLeft">
          <div>
            <input
              type="text"
              aria-label="Email"
              className="form-control px-3 py-3 textBorder"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              aria-label="Password"
              className="form-control px-3 py-3 mt-3 textBorder"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-danger mt-3">{error}</div>}
          <div>
            <button
              className="btn btn-outline-secondary px-3 py-3 mt-3 text-dark loginButton"
              onClick={handleLogin}
            >
              <span className="d-flex-column">
                <span className="loginSet">Login to Your Account</span>
                {/* Uncomment if you want to add an image/icon */}
                {/* <span className="arrow">
                  <i>
                    <Image
                      src="/arrow.png"
                      alt="arrow img"
                      className="logo1"
                      width={25}
                      height={20}
                    />
                  </i>
                </span> */}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
