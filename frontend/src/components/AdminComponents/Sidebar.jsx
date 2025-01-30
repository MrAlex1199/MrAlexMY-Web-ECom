import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="font-semibold bg-white text-slate-900 w-70 p-5 sticky top-0">
      <h2 className="text-2xl font-bold mb-6">SERGENTX</h2>
      <nav className="space-y-4">
        <NavLink
          to="/AdminDashboard"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500 rounded-md sticky top-0"
              : "block px-4 py-2 text-blue-700 rounded-md sticky top-0"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/AdminManageProducts"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500 rounded-md sticky top-0"
              : "block px-4 py-2 text-blue-700 rounded-md"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/AdminManageOrders"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500 rounded-md sticky top-0"
              : "block px-4 py-2 text-blue-700 rounded-md"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/AdminManageCustomrs"
          className={({ isActive }) =>
            isActive
              ? "block px-4 py-2 text-white bg-blue-500 rounded-md sticky top-0"
              : "block px-4 py-2 text-blue-700 rounded-md"
          }
        >
          Customers
        </NavLink>
      </nav>
    </div>
  );
}
