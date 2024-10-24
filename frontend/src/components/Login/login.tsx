"use client";
import "./login.css"; 
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const Base_Url = 'http://localhost:8000/';
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
      const response = await axios.post(`${Base_Url}users/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate('/dashboard');
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleRegister = async () => {
    if (!username || !name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post(`${Base_Url}users`, {
        username,
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("User registered successfully");
        setIsRegistering(false); 
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container1">
      <ToastContainer />

      <div className="loginItem">
        <h1 className="text-center fontLogin">
          {isRegistering ? "Create Your Account" : "Login to Your Account"}
        </h1>

        <h5 className="text-center mt-4 fontCommon">
          {isRegistering ? "Welcome to the E-Commerce." : "Welcome to the E-Commerce."}
        </h5>
      </div>

      <div className="textBox">
        <div className="inputBoxLeft">
          {isRegistering && (
            <>
              <div>
                <input
                  type="text"
                  aria-label="Username"
                  className="form-control px-3 py-3 textBorder"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  aria-label="Name"
                  className="form-control px-3 py-3 mt-3 textBorder"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <input
              type="text"
              aria-label="Email"
              className="form-control px-3 py-3 mt-3 textBorder"
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

          <div className="d-flex justify-content-between mt-3">
            {!isRegistering && (
              <>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label Register" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <a href="#" className=" forgot">Forgot Password?</a>
              </>
            )}
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn px-3 py-3 text-dark form-control loginButton"
              onClick={isRegistering ? handleRegister : handleLogin}
            >
              {isRegistering ? "Create Account" : "Login to your Account"}
            </button>
          </div>

          {!isRegistering ? (
            <span className="d-flex justify-content-center Register" onClick={() => setIsRegistering(true)}>
              Don't have an account? Register
            </span>
          ) : (
            <span className="d-flex justify-content-center Register" onClick={() => setIsRegistering(false)}>
              Already have an account? Login
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
