import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import Sidebar from "../../components/AdminComponents/Sidebar";
import Header from "../../components/AdminComponents/header";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
};

export default function Finance({ adminData }) {
  // Sample data for pie chart
  const pieChartData = {
    labels: ["Electronics", "Clothing", "Home Appliances", "Books", "Others"],
    datasets: [
      {
        data: [35.3, 27.8, 7.3, 5.8, 23.8], // Sample data
        backgroundColor: [
          "#916AFF",
          "#FF9F40",
          "#4CAF50",
          "#FF6B6B",
          "#46B6AC",
        ], // Colors
        hoverBackgroundColor: [
          "#7F5BE6",
          "#E58C3B",
          "#429947",
          "#E05757",
          "#3EA496",
        ], // Hover colors
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          font: {
            size: 14,
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Sample data for bar charts
  const barChartDataM = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dececember"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [1500, 2000, 2500, 3000, 2500, 4000, 3500, 4000, 5500, 6000, 7000, 8000],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const barChartDataY = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Year Sales ($)",
        data: [8000, 12000, 14000, 10000, 17000, 20000],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  // Sample data for line chart weekly
  const lineChartDataW = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Weekly Revenue ($)",
        data: [1500, 2000, 2500, 3000, 2500, 4000],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Sample data for line chart weekly
  const lineChartDataMM = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dececember"],
    datasets: [
      {
        label: "Monthly Revenue ($)",
        data: [1500, 2000, 2500, 3000, 2500, 4000, 3500, 4000, 5500, 6000, 7000, 8000],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Sample data for line chart Monthly
  const lineChartDataM = {
    labels: [
      "Quarter 1",
      "Quarter 2",
      "Quarter 3",
      "Quarter 4",
      "Quarter 5",
      "Quarter 6",
    ],
    datasets: [
      {
        label: "Quarter Revenue ($)",
        data: [1500, 2000, 2500, 3000, 2500, 4000],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Header
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          textpage="Overview"
          AdminData={adminData}
        />
        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            { title: "Total Account", value: 21, color: "text-blue-600" },
            { title: "Active Account", value: 18, color: "text-green-600" },
            { title: "Total Products", value: 21, color: "text-blue-600" },
            { title: "SoldOut Products", value: 3, color: "text-red-600" },
            { title: "Active Discount", value: 18, color: "text-green-600" },
            { title: "Remove Discount", value: 2, color: "text-purple-600" },
            {
              title: "Total Discount Value",
              value: "$30,000",
              color: "text-red-600",
            },
            {
              title: "Total Sales",
              value: "$2,500,000",
              color: "text-red-100",
            },
            {
              title: "Total Revenue",
              value: "$1,500,000",
              color: "text-indigo-700",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 flex-1 min-w-[200px]"
            >
              <h2 className="text-sm font-semibold text-gray-500">
                {card.title}
              </h2>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Pie Chart */}
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Products group Sells
            </h2>
            <div className="w-[400px] h-[400px]">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>

          {/* Bar Charts */}
          <div className="bg-white shadow rounded-lg p-6 flex-1 min-w-[300px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Sales Overview
            </h2>
            <div className="h-64">
              <Bar data={barChartDataM} options={chartOptions} />
            </div>
            <div className="h-64 mt-6">
              <Bar data={barChartDataY} options={chartOptions} />
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white shadow rounded-lg p-6 flex-1 min-w-[300px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Day Sells Report
            </h2>
            <div className="h-64">
              <Line data={lineChartDataW} options={chartOptions} />
            </div>
            <div className="h-64 mt-6">
              <Line data={lineChartDataM} options={chartOptions} />
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white shadow rounded-lg p-6 flex-1 min-w-[300px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Weekly Sells Report
            </h2>
            <div className="h-64">
              <Line data={lineChartDataW} options={chartOptions} />
            </div>
            <div className="h-64 mt-6">
              <Line data={lineChartDataM} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex-1 min-w-[300px]">
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Line Chart */}
            <div className="bg-white shadow rounded-lg p-6 flex-1 min-w-[300px]">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Monthly Sells Report
              </h2>
              <div className="h-64">
                <Line data={lineChartDataMM} options={chartOptions} />
              </div>
              <div className="h-64 mt-6">
                <Line data={lineChartDataMM} options={chartOptions} />
              </div>
            </div>
            {/* Line Chart */}
            <div className="bg-white shadow rounded-lg p-6 flex-1 min-w-[300px]">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Yearly Sells Report
              </h2>
              <div className="h-64">
                <Line data={lineChartDataW} options={chartOptions} />
              </div>
              <div className="h-64 mt-6">
                <Line data={lineChartDataM} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
