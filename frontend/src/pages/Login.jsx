import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/logo/weblogo.jpg";

// Login component
export default function Login({ setIsLoggedIn, setUserData }) {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async () => {
    try {
      // Send POST request to login endpoint
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // If login is successful, store token and update state
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store the token in local storage
        setIsLoggedIn(true);
        setUserData({ fname: data.fname, lname: data.lname });
        navigate("/"); // Navigate to home page
      } else {
        // If login fails, display error message
        const errorData = await response.json();
        console.error(errorData.message);
        if (errorData.loginStatus === false) {
          alert("Login failed. Please check your email and password.");
        }
      }
    } catch (error) {
      // Log any errors
      console.error(error);
    }
  };

  return (
    <div>
      {/* Form to handle login */}
      <from
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
          return false;
        }}
      >
        <div className="bg-white dark:bg-gray-900">
          <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <form className="w-full max-w-md" onSubmit={handleLogin}>
              <img className="w-auto h-7 sm:h-8" src={logo} alt="login" />
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
                sign in
              </h1>
              <div className="relative flex items-center mt-8">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                />
              </div>
              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                />
              </div>
              <div className="mt-6">
                <button className="w-full px-6 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                  Sign in
                </button>
                <div className="mt-6 text-center ">
                  <Link
                    to="/register"
                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Already have an account? Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </from>
    </div>
  );
}
