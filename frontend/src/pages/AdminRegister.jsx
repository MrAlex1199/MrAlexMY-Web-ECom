import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/logo/weblogo.jpg";

// Admin registration component
export default function AdminRegister() {
  // State variables for Email,Password,FirstName,LastName,employeeID fields
  const [adminemail, setAdminEmail] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [Afname, setAfname] = useState("");
  const [Alname, setAlname] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const navigate = useNavigate();

  // Check if the admin is already logged in
  React.useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      navigate("/admindashboard");
    }
  }, [navigate]);

  // Function to handle admin registration
  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log({ adminemail, adminpassword, Afname, Alname, employeeID }); // Debug: log the form data

    try {
      const response = await fetch("http://localhost:3001/admin-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminemail,
          adminpassword,
          Afname,
          Alname,
          employeeID,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
        navigate("/admin-login");
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md" onSubmit={handleRegister}>
            <img className="w-auto h-7 sm:h-8" src={logo} alt="login" />
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
              Admin Registration
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
                  setAdminEmail(e.target.value);
                }}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
            </div>
            <div className="relative flex items-center mt-4">
              <input
                type="fname"
                onChange={(e) => {
                  setAfname(e.target.value);
                }}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="First Name"
              />
              <input
                type="lname"
                onChange={(e) => {
                  setAlname(e.target.value);
                }}
                className="block w-full ml-1 px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Last Name"
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
                  setAdminPassword(e.target.value);
                }}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
              <input
                type="password"
                onChange={(e) => {
                  setEmployeeID(e.target.value);
                }}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Employee ID"
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-6 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                Register
              </button>
              <div className="mt-6 text-center ">
                <Link
                  to="/admin-login"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
