import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const pieChartOptions = {
  maintainAspectRatio: false, // Allow custom dimensions
  responsive: true,
};

export default function Overview() {
  // Sample data for pie chart
  const pieChartData = {
    labels: ["Products", "Orders", "Users"],
    datasets: [
      {
        data: [120, 45, 300],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Sample data for bar chart
  const barChartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [5000, 7000, 4000, 8000, 6000],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard - Overview
          </h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-semibold text-gray-500">
              Total Products
            </h2>
            <p className="text-2xl font-bold text-blue-600">120</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-semibold text-gray-500">
              Total Orders
            </h2>
            <p className="text-2xl font-bold text-green-600">45</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-semibold text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold text-purple-600">300</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-semibold text-gray-500">Total Sales</h2>
            <p className="text-2xl font-bold text-red-600">$25,000</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Overview
            </h2>
            <div className="h-48 w-full">
              {/* Reduce height */}
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Monthly Sales
            </h2>
            <div className="h-64 w-full">
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
