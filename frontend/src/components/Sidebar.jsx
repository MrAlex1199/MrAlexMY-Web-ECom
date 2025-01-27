import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar(){
  return (
    <div className="font-semibold bg-white text-slate-900 w-70 p-5">
      <h2 className="text-2xl font-bold mb-6">SERGENTX Dashboard</h2>
      <nav className="space-y-4">
      <NavLink
          to="/AdminDashboard"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500 rounded-md"
              : "block px-4 py-2 text-blue-700 rounded-md"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/AdminManageProducts"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500 rounded-md"
              : "block px-4 py-2 text-blue-700 rounded-md"
          }
        >
          Manage Products
        </NavLink>
        <NavLink
          to="/AdminManageOrders"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500 rounded-md"
              : "block px-4 py-2 text-blue-700 rounded-md"
          }
        >
          Manage Orders
        </NavLink>
        <NavLink
          to="/admin-dashboard/users"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500 rounded-md"
              : "block px-4 py-2 text-blue-700 rounded-md"
          }
        >
          Manage Users
        </NavLink>
      </nav>
    </div>
  );
};
