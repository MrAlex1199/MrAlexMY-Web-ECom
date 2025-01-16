import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard({ isAdmin, setIsAdmin, setAdminData }) {
  const [file, setFile] = useState(null);

  // Sample data for pie chart
  const pieChartData = {
    labels: ["Products", "Orders", "Users"],
    datasets: [
      {
        label: "# of Votes",
        data: [120, 45, 300],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("AToken");
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setAdminData({ adminid: "", email: "", role: "" });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/upload-csv",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response:", response.data); // Log success response
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error.response || error); // Log error details
      alert("Failed to upload file");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleAdminLogout}
            className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
          >
            Logout
          </button>
        </div>
        {/* Dashboard Overview with Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <Pie data={pieChartData} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Products</h2>
              <span className="text-2xl font-bold text-blue-600">120</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
              <span className="text-2xl font-bold text-green-600">45</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Users</h2>
              <span className="text-2xl font-bold text-purple-600">300</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Sales</h2>
              <span className="text-2xl font-bold text-red-600">$2,500</span>
            </div>
          </div>
        {/* Product Summaly */}
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Products</h2>
              <span className="text-2xl font-bold text-blue-600">120</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
              <span className="text-2xl font-bold text-green-600">45</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Users</h2>
              <span className="text-2xl font-bold text-purple-600">300</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Sales</h2>
              <span className="text-2xl font-bold text-red-600">$2,500</span>
            </div>
          </div>
        {/* User list */}
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Products</h2>
              <span className="text-2xl font-bold text-blue-600">120</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
              <span className="text-2xl font-bold text-green-600">45</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Users</h2>
              <span className="text-2xl font-bold text-purple-600">300</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Sales</h2>
              <span className="text-2xl font-bold text-red-600">$2,500</span>
            </div>
          </div>
        {/* Order list */}
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Products</h2>
              <span className="text-2xl font-bold text-blue-600">120</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
              <span className="text-2xl font-bold text-green-600">45</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Users</h2>
              <span className="text-2xl font-bold text-purple-600">300</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Sales</h2>
              <span className="text-2xl font-bold text-red-600">$2,500</span>
            </div>
          </div>
        {/* Sales Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Products</h2>
              <span className="text-2xl font-bold text-blue-600">120</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
              <span className="text-2xl font-bold text-green-600">45</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Users</h2>
              <span className="text-2xl font-bold text-purple-600">300</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Sales</h2>
              <span className="text-2xl font-bold text-red-600">$2,500</span>
            </div>
          </div>
        </div>
        {/* File Upload */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleUpload}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Upload CSV
          </button>
        </div>
      </div>
    </div>
  );
}
