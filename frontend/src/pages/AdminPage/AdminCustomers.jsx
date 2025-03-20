import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sidebar from "../../components/AdminComponents/Sidebar";
import Header from "../../components/AdminComponents/header";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminManageCustomrs({ adminData }) {
  // Sample data for orders list
  const CustomersAccount = [
    {
      id: 1,
      name: "John Cena",
      sex: "Male",
      age: "25",
      email: "johncena@gmail.com",
      phone: "0877654321",
      registered: "2022-01-01",
      shipdetails: {
        address: "123 Main St",
        city: "Los Angeles",
        postalCode: "90001",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "1234 5678 9012 3456",
        expiryDate: "01/23",
        cvv: "123",
      },
    },
    {
      id: 2,
      name: "Emma Watson",
      sex: "Female",
      age: "28",
      email: "emmawatson@yahoo.com",
      phone: "0988765432",
      registered: "2022-02-15",
      shipdetails: {
        address: "456 Oak Ave",
        city: "New York",
        postalCode: "10001",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "9876 5432 1098 7654",
        expiryDate: "03/24",
        cvv: "456",
      },
    },
    {
      id: 3,
      name: "Michael Chen",
      sex: "Male",
      age: "32",
      email: "michaelchen@outlook.com",
      phone: "0766543210",
      registered: "2022-03-10",
      shipdetails: {
        address: "789 Pine Rd",
        city: "Chicago",
        postalCode: "60601",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "4567 8901 2345 6789",
        expiryDate: "05/25",
        cvv: "789",
      },
    },
    {
      id: 4,
      name: "Sophie Turner",
      sex: "Female",
      age: "27",
      email: "sophieturner@gmail.com",
      phone: "0655432109",
      registered: "2022-04-20",
      shipdetails: {
        address: "321 Elm St",
        city: "Seattle",
        postalCode: "98101",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "2345 6789 0123 4567",
        expiryDate: "07/23",
        cvv: "234",
      },
    },
    {
      id: 5,
      name: "Liam Patel",
      sex: "Male",
      age: "30",
      email: "liampatel@hotmail.com",
      phone: "0544321098",
      registered: "2022-05-05",
      shipdetails: {
        address: "654 Birch Ln",
        city: "Houston",
        postalCode: "77001",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "8901 2345 6789 0123",
        expiryDate: "09/24",
        cvv: "567",
      },
    },
    {
      id: 6,
      name: "Olivia Smith",
      sex: "Female",
      age: "23",
      email: "oliviasmith@gmail.com",
      phone: "0433210987",
      registered: "2022-06-12",
      shipdetails: {
        address: "987 Cedar Dr",
        city: "Miami",
        postalCode: "33101",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "5678 9012 3456 7890",
        expiryDate: "11/23",
        cvv: "890",
      },
    },
    {
      id: 7,
      name: "Noah Kim",
      sex: "Male",
      age: "29",
      email: "noahkim@yahoo.com",
      phone: "0322109876",
      registered: "2022-07-25",
      shipdetails: {
        address: "147 Spruce Way",
        city: "Boston",
        postalCode: "02108",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "3456 7890 1234 5678",
        expiryDate: "02/25",
        cvv: "321",
      },
    },
    {
      id: 8,
      name: "Isabella Lopez",
      sex: "Female",
      age: "26",
      email: "isabellalopez@outlook.com",
      phone: "0211098765",
      registered: "2022-08-30",
      shipdetails: {
        address: "258 Maple St",
        city: "Denver",
        postalCode: "80201",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "6789 0123 4567 8901",
        expiryDate: "04/24",
        cvv: "654",
      },
    },
    {
      id: 9,
      name: "Ethan Brown",
      sex: "Male",
      age: "31",
      email: "ethanbrown@gmail.com",
      phone: "0109987654",
      registered: "2022-09-15",
      shipdetails: {
        address: "369 Willow Ave",
        city: "Phoenix",
        postalCode: "85001",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "0123 4567 8901 2345",
        expiryDate: "06/25",
        cvv: "987",
      },
    },
    {
      id: 10,
      name: "Ava Johnson",
      sex: "Female",
      age: "24",
      email: "avajohnson@yahoo.com",
      phone: "0998876543",
      registered: "2022-10-01",
      shipdetails: {
        address: "741 Ash Rd",
        city: "San Francisco",
        postalCode: "94101",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "7890 1234 5678 9012",
        expiryDate: "08/23",
        cvv: "123",
      },
    },
    {
      id: 11,
      name: "James Lee",
      sex: "Male",
      age: "33",
      email: "jameslee@hotmail.com",
      phone: "0887765432",
      registered: "2022-11-10",
      shipdetails: {
        address: "852 Poplar Ln",
        city: "Portland",
        postalCode: "97201",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "2345 6789 0123 4567",
        expiryDate: "10/24",
        cvv: "456",
      },
    },
    {
      id: 12,
      name: "Mia Davis",
      sex: "Female",
      age: "22",
      email: "miadavis@gmail.com",
      phone: "0776654321",
      registered: "2022-12-20",
      shipdetails: {
        address: "963 Cherry St",
        city: "Austin",
        postalCode: "73301",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "5678 9012 3456 7890",
        expiryDate: "12/23",
        cvv: "789",
      },
    },
    {
      id: 13,
      name: "Alexander Nguyen",
      sex: "Male",
      age: "28",
      email: "alexnguyen@outlook.com",
      phone: "0665543210",
      registered: "2023-01-15",
      shipdetails: {
        address: "159 Sycamore Dr",
        city: "San Diego",
        postalCode: "92101",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "8901 2345 6789 0123",
        expiryDate: "02/25",
        cvv: "234",
      },
    },
    {
      id: 14,
      name: "Charlotte Wilson",
      sex: "Female",
      age: "29",
      email: "charlottewilson@yahoo.com",
      phone: "0554432109",
      registered: "2023-02-28",
      shipdetails: {
        address: "753 Magnolia Ave",
        city: "Atlanta",
        postalCode: "30301",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "3456 7890 1234 5678",
        expiryDate: "04/24",
        cvv: "567",
      },
    },
    {
      id: 15,
      name: "Daniel Garcia",
      sex: "Male",
      age: "27",
      email: "danielgarcia@gmail.com",
      phone: "0443321098",
      registered: "2023-03-10",
      shipdetails: {
        address: "246 Linden St",
        city: "Dallas",
        postalCode: "75201",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "6789 0123 4567 8901",
        expiryDate: "06/25",
        cvv: "890",
      },
    },
    {
      id: 16,
      name: "Amelia Martinez",
      sex: "Female",
      age: "25",
      email: "ameliamartinez@hotmail.com",
      phone: "0332210987",
      registered: "2023-04-05",
      shipdetails: {
        address: "357 Hazel Rd",
        city: "Philadelphia",
        postalCode: "19101",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "0123 4567 8901 2345",
        expiryDate: "08/23",
        cvv: "321",
      },
    },
    {
      id: 17,
      name: "William Taylor",
      sex: "Male",
      age: "34",
      email: "williamtaylor@yahoo.com",
      phone: "0221109876",
      registered: "2023-05-20",
      shipdetails: {
        address: "468 Walnut Dr",
        city: "Las Vegas",
        postalCode: "89101",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "7890 1234 5678 9012",
        expiryDate: "10/24",
        cvv: "654",
      },
    },
    {
      id: 18,
      name: "Evelyn Anderson",
      sex: "Female",
      age: "26",
      email: "evelynanderson@outlook.com",
      phone: "0110098765",
      registered: "2023-06-15",
      shipdetails: {
        address: "579 Chestnut St",
        city: "Orlando",
        postalCode: "32801",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "2345 6789 0123 4567",
        expiryDate: "12/23",
        cvv: "987",
      },
    },
    {
      id: 19,
      name: "Henry White",
      sex: "Male",
      age: "30",
      email: "henrywhite@gmail.com",
      phone: "0999987654",
      registered: "2023-07-01",
      shipdetails: {
        address: "681 Laurel Ave",
        city: "Minneapolis",
        postalCode: "55401",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "5678 9012 3456 7890",
        expiryDate: "02/25",
        cvv: "123",
      },
    },
    {
      id: 20,
      name: "Sophia Clark",
      sex: "Female",
      age: "23",
      email: "sophiaclark@yahoo.com",
      phone: "0888876543",
      registered: "2023-08-10",
      shipdetails: {
        address: "792 Redwood Ln",
        city: "Charlotte",
        postalCode: "28201",
        country: "USA",
      },
      paymentdetails: {
        cardNumber: "8901 2345 6789 0123",
        expiryDate: "04/24",
        cvv: "456",
      },
    },
  ];

  // พรุ้งนี้เราจะใช้ข้อมูลจริงจากฐานข้อมูล

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Filter logic
  const [filter, setFilter] = useState("All");
  const filteredItems =
    filter === "All"
      ? CustomersAccount
      : CustomersAccount.filter((account) => account.sex === filter);
  const currentFilteredItems = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalFilteredPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Header
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          textpage="Customers Account"
          AdminData={adminData}
        />

        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            { title: "Total Account", value: 21, color: "text-blue-600" },
            { title: "Active Account", value: 18, color: "text-green-600" },
            { title: "Delete Account", value: 2, color: "text-purple-600" },
            { title: "Male Account", value: 11, color: "text-blue-600" },
            { title: "Female Account", value: 10, color: "text-pink-600" },
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

        {/* Customers Acocout */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Customers Account
          </h2>
          {/* Tabs for different order statuses */}
          <div className="flex space-x-4 mb-4">
            {["All", "Male", "Female"].map((tab, index) => (
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
                    "Address",
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
                    <td className="border border-gray-300 px-4 py-2">
                      {account.shipdetails.address} {account.shipdetails.city}{" "}
                      {account.shipdetails.postalCode}{" "}
                      {account.shipdetails.country}
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
              {Array.from(
                { length: totalFilteredPages },
                (_, index) => index + 1
              ).map((page) => (
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
              ))}
              <button
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() =>
                  handlePageChange(
                    Math.min(totalFilteredPages, currentPage + 1)
                  )
                }
                disabled={currentPage === totalFilteredPages}
              >
                <span>»</span>
              </button>
            </nav>
          </div>
        </div>
        {/* Delete Account */}
        <div className="flex flex-wrap gap-6 my-6">
          <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Delete Account
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Account ID</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product ID"
                />
              </div>
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
