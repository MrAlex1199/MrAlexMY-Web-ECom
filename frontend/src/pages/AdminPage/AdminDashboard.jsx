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

export default function Overview( {adminData} ) {
  // Sample data for pie chart
  const pieChartData = {
    labels: ["18-22", "23-30", "31-40", "41-50", "51+"],
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
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [5000, 7000, 4000, 8000, 6000],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const barChartDataY = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Year Sales ($)",
        data: [10000, 12000, 8000, 15000, 9000],
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

  // Sample data for line chart Monthly
  const lineChartDataM = {
    labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4", "Quarter 5", "Quarter 6"],
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

  // Sample data for orders list
  const CustomersAccount = [
    {
      id: 1,
      name: "John Cena",
      sex: "Male",
      age: "25",
      email: "Jonhcena@gmail.com",
      phone: "0877654321",
      registered: "2022-01-01",
    },
    {
      id: 2,
      name: "Jane Doe",
      sex: "Female",
      age: "30",
      email: "janedoe@gmail.com",
      phone: "0987654321",
      registered: "2022-02-01",
    },
    {
      id: 3,
      name: "Alice Smith",
      sex: "Female",
      age: "28",
      email: "alicesmith@gmail.com",
      phone: "1122334455",
      registered: "2022-03-01",
    },
    {
      id: 4,
      name: "Bob Johnson",
      sex: "Male",
      age: "35",
      email: "bobjohnson@gmail.com",
      phone: "2233445566",
      registered: "2022-04-01",
    },
    {
      id: 5,
      name: "Charlie Brown",
      sex: "Male",
      age: "40",
      email: "charliebrown@gmail.com",
      phone: "3344556677",
      registered: "2022-05-01",
    },
    {
      id: 6,
      name: "David Wilson",
      sex: "Male",
      age: "45",
      email: "davidwilson@gmail.com",
      phone: "4455667788",
      registered: "2022-06-01",
    },
    {
      id: 7,
      name: "Eve Davis",
      sex: "Female",
      age: "50",
      email: "evedavis@gmail.com",
      phone: "5566778899",
      registered: "2022-07-01",
    },
    {
      id: 8,
      name: "Frank Miller",
      sex: "Male",
      age: "55",
      email: "frankmiller@gmail.com",
      phone: "6677889900",
      registered: "2022-08-01",
    },
    {
      id: 9,
      name: "Grace Lee",
      sex: "Female",
      age: "60",
      email: "gracelee@gmail.com",
      phone: "7788990011",
      registered: "2022-09-01",
    },
    {
      id: 10,
      name: "Hank Moore",
      sex: "Male",
      age: "65",
      email: "hankmoore@gmail.com",
      phone: "8899001122",
      registered: "2022-10-01",
    },
    {
      id: 11,
      name: "Ivy Taylor",
      sex: "Female",
      age: "70",
      email: "ivytaylor@gmail.com",
      phone: "9900112233",
      registered: "2022-11-01",
    },
    {
      id: 12,
      name: "Jack Anderson",
      sex: "Male",
      age: "75",
      email: "jackanderson@gmail.com",
      phone: "0011223344",
      registered: "2022-12-01",
    },
    {
      id: 13,
      name: "Karen Thomas",
      sex: "Female",
      age: "80",
      email: "karenthomas@gmail.com",
      phone: "1122334455",
      registered: "2023-01-01",
    },
    {
      id: 14,
      name: "Larry Jackson",
      sex: "Male",
      age: "85",
      email: "larryjackson@gmail.com",
      phone: "2233445566",
      registered: "2023-02-01",
    },
    {
      id: 15,
      name: "Mona White",
      sex: "Female",
      age: "90",
      email: "monawhite@gmail.com",
      phone: "3344556677",
      registered: "2023-03-01",
    },
    {
      id: 16,
      name: "Nina Harris",
      sex: "Female",
      age: "95",
      email: "ninaharris@gmail.com",
      phone: "4455667788",
      registered: "2023-04-01",
    },
    {
      id: 17,
      name: "Oscar Martin",
      sex: "Male",
      age: "100",
      email: "oscarmartin@gmail.com",
      phone: "5566778899",
      registered: "2023-05-01",
    },
    {
      id: 18,
      name: "Paul Clark",
      sex: "Male",
      age: "105",
      email: "paulclark@gmail.com",
      phone: "6677889900",
      registered: "2023-06-01",
    },
    {
      id: 19,
      name: "Quincy Lewis",
      sex: "Male",
      age: "110",
      email: "quincylewis@gmail.com",
      phone: "7788990011",
      registered: "2023-07-01",
    },
    {
      id: 20,
      name: "Rachel Walker",
      sex: "Female",
      age: "115",
      email: "rachelwalker@gmail.com",
      phone: "8899001122",
      registered: "2023-08-01",
    },
    {
      id: 21,
      name: "Steve Hall",
      sex: "Male",
      age: "120",
      email: "stevehall@gmail.com",
      phone: "9900112233",
      registered: "2023-09-01",
    },
  ];
  // Dropdown state 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [filter, setFilter] = useState("All");

  const filteredItems = filter === "All" ? CustomersAccount : CustomersAccount.filter(account => account.sex === filter);

  const currentFilteredItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalFilteredPages = Math.ceil(filteredItems.length / itemsPerPage);

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
            { title: "Delete Account", value: 2, color: "text-purple-600" },
            { title: "Month Sales", value: "$500,000", color: "text-red-600" },
            { title: "Total Sales", value: "$2,500,000", color: "text-red-100", },
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
              Customer Age Group
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
              Weekly Revenue
            </h2>
            <div className="h-64">
              <Line data={lineChartDataW} options={chartOptions} />
            </div>
            <div className="h-64 mt-6">
              <Line data={lineChartDataM} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Customers Account
          </h2>
          {/* Tabs for different order statuses */}
          <div className="flex space-x-4 mb-4">
            {[
              "All",
              "Male",
              "Female",
            ].map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg ${
                  filter === tab
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-purple-600 hover:text-white transition duration-300`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
            <button className="ml-auto px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
              Export as CSV
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
              01 Jan 25 - 27 Jan 25
            </div>
          </div>

          {/* Customers Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {[
                    "ID",
                    "Name",
                    "Sex",
                    "Age",
                    "Date",
                    "Email",
                    "Phone Number",
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
                {currentFilteredItems.map((account) => (
                  <tr
                    key={account.id}
                    className="hover:bg-gray-100 transition duration-300"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {account.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {account.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {account.sex}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {account.age}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {account.registered}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {account.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {account.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav className="inline-flex">
              <button
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <span>«</span>
              </button>
              {Array.from({ length: totalFilteredPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 leading-tight border ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() =>
                  handlePageChange(Math.min(totalFilteredPages, currentPage + 1))
                }
                disabled={currentPage === totalFilteredPages}
              >
                <span>»</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
