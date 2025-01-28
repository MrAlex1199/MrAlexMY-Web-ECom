import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminManageCustomrs({
  isAdmin,
  setIsAdmin,
  setAdminData,
}) {
  // Digital Clock logic
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const handleAdminLogout = () => {
    localStorage.removeItem("AToken");
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setAdminData({ adminid: "", email: "", role: "" });
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = CustomersAccount.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(CustomersAccount.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex bg-white shadow rounded-lg p-4 justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Manage - Customers
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

        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            { title: "Total Account", value: 21, color: "text-blue-600" },
            { title: "Active Account", value: 18, color: "text-green-600" },
            { title: "Delete Account", value: 2, color: "text-purple-600" },
            { title: "Total Sales", value: "$2,500,000", color: "text-red-600" },
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

        {/* Products List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Costomers Account
          </h2>
          {/* Tabs for different order statuses */}
          <div className="flex space-x-4 mb-4">
            {[
              "All Account",
              "Male",
              "Female",
              "Active Accounts",
              "Deleted Accounts",
            ].map((tab, index) => (
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

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {["ID", "Name", "Sex", "Age", "Date", "Email", "Phone Number"].map(
                    (header, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((account) => (
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
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
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
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
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
