import React, { useState, useEffect } from "react";

export default function Header({
  setDropdownOpen,
  dropdownOpen,
  textpage,
  isAdmin,
  setIsAdmin,
  setAdminData,
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

    const handleAdminLogout = () => {
      localStorage.removeItem("AToken");
      localStorage.removeItem("isAdmin");
      setIsAdmin(false);
      setAdminData({ adminid: "", email: "", role: "" });
    };

  return (
    <div>
      {/* Header */}
      <div className="flex bg-white shadow rounded-lg p-4 justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard - {textpage}
        </h1>
        {/* Digital Clock */}
        <div className="text-2xl font-semibold text-gray-700 mr-4">
          {time.toLocaleTimeString()}
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          />
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
            alt="Profile Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          <div className="relative">
            <button
              className="block px-4 py-2 text-gray-800 font-medium"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Admin User
            </button>
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="py-2">
                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                      Profile
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                      Settings
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition"
                      onClick={handleAdminLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
