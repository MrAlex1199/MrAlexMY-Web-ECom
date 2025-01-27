import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminManageOrders({
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

  // Sample data for orders list
  const orders = [
    {
      id: 1,
      customer: "John Doe",
      product: "Smartphone - Galaxy S21",
      date: "2025-01-01",
      total: "$799.99",
      payment: "Paid",
      stock: "20/100",
      status: "Completed",
    },
    {
      id: 2,
      customer: "Jane Smith",
      product: "Laptop - MacBook Pro",
      date: "2025-01-02",
      total: "$1299.00",
      payment: "Pending",
      stock: "5/50",
      status: "Processing",
    },
    {
      id: 3,
      customer: "Bob Johnson",
      product: "Headphones - Sony WH-1000XM4",
      date: "2025-01-03",
      total: "$348.00",
      payment: "Pending",
      stock: "5/50",
      status: "Processing",
    },
    {
      id: 4,
      customer: "Alice Brown",
      product: "Watch - Apple Watch Series 6",
      date: "2025-01-04",
      total: "$399.00",
      payment: "Paid",
      stock: "10/30",
      status: "Completed",
    },
    {
      id: 5,
      customer: "Mike Lee",
      product: "Tablet - iPad Pro",
      date: "2025-01-05",
      total: "$799.00",
      payment: "Unpaid",
      stock: "8/40",
      status: "Pending",
    },
    {
      id: 6,
      customer: "Emma Watson",
      product: "Camera - Canon EOS R",
      date: "2025-01-06",
      total: "$1899.00",
      payment: "Paid",
      stock: "3/20",
      status: "Shipping",
    },
    {
      id: 7,
      customer: "David Beckham",
      product: "Gaming Console - PlayStation 5",
      date: "2025-01-07",
      total: "$499.99",
      payment: "Paid",
      stock: "12/60",
      status: "Completed",
    },
    {
      id: 8,
      customer: "Sarah Connor",
      product: 'Smart TV - LG OLED 55"',
      date: "2025-01-08",
      total: "$1499.99",
      payment: "Paid",
      stock: "18/50",
      status: "Completed",
    },
    {
      id: 9,
      customer: "Tom Cruise",
      product: "Fitness Tracker - Fitbit Charge 4",
      date: "2025-01-09",
      total: "$149.95",
      payment: "Pending",
      stock: "25/100",
      status: "Processing",
    },
    {
      id: 10,
      customer: "Angelina Jolie",
      product: "Coffee Maker - Nespresso Vertuo",
      date: "2025-01-10",
      total: "$199.00",
      payment: "Paid",
      stock: "18/50",
      status: "Completed",
    },
  ];

  const handleAdminLogout = () => {
    localStorage.removeItem("AToken");
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setAdminData({ adminid: "", email: "", role: "" });
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex bg-white shadow rounded-lg p-4 justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Manage - Products
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

        {/* Orders List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Orders List
          </h2>
          {/* Tabs for different order statuses */}
          <div className="flex space-x-4 mb-4">
            {["All Orders", "Drafts", "Canceled", "Shipping", "Completed"].map(
              (tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg ${
                    index === 0
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-purple-600 hover:text-white transition duration-300`}
                >
                  {tab}
                </button>
              )
            )}
            <button className="ml-auto px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
              Export as CSV
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
              + Add Customers
            </button>
          </div>

          {/* Search, Filter, and Date Range */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-300">
              Filter
            </button>
            <div className="p-2 border border-gray-300 rounded-lg">
              12 Jul 24 - 20 Jul 24
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {[
                    "",
                    "Order",
                    "Customer",
                    "Date",
                    "Payment",
                    "Price",
                    "Stock",
                    "Order Status",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-left"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-100 transition duration-300"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-purple-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.id}. {order.customer}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.customer}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-green-500">
                      {order.status === "Completed" ? "Paid" : "Unpaid"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.total}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.stock}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.status === "Completed" && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Deliver
                        </span>
                      )}
                      {order.status === "Shipping" && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Shipping
                        </span>
                      )}
                      {order.status === "Processing" && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Processing
                        </span>
                      )}
                      {order.status === "Pending" && (
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav className="inline-flex">
              <button className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                <span>«</span>
              </button>
              {[1, 2, 3, 4, 5, 6].map((page, index) => (
                <button
                  key={index}
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                <span>»</span>
              </button>
            </nav>
          </div>
          {/* Product Delete */}
          <div className="flex flex-wrap gap-6 mb-6">
            {/* Delete Product */}
            <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Delete Product
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Product ID</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter product ID"
                  />
                </div>
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
                  Delete Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
