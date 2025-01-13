import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-70 p-5">
      <h2 className="text-2xl font-bold mb-6">SERGENTX Dashboard</h2>
      <h3 className="text-2xl font-bold mb-6">Admin Alex</h3>
      <nav className="space-y-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 bg-gray-700 rounded-md"
              : "block px-4 py-2 hover:bg-gray-700 rounded-md"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin-dashboard/products"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 bg-gray-700 rounded-md"
              : "block px-4 py-2 hover:bg-gray-700 rounded-md"
          }
        >
          Manage Products
        </NavLink>
        <NavLink
          to="/admin-dashboard/orders"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 bg-gray-700 rounded-md"
              : "block px-4 py-2 hover:bg-gray-700 rounded-md"
          }
        >
          Manage Orders
        </NavLink>
        <NavLink
          to="/admin-dashboard/users"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 bg-gray-700 rounded-md"
              : "block px-4 py-2 hover:bg-gray-700 rounded-md"
          }
        >
          Manage Users
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
