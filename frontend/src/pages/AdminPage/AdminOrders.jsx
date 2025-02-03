import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Header from "../../components/AdminComponents/header";
import Sidebar from "../../components/AdminComponents/Sidebar";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminManageOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

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
  {
    id: 11,
    customer: "Chris Evans",
    product: "Smartphone - iPhone 13",
    date: "2025-01-11",
    total: "$999.99",
    payment: "Paid",
    stock: "15/50",
    status: "Completed",
  },
  {
    id: 12,
    customer: "Scarlett Johansson",
    product: "Laptop - Dell XPS 13",
    date: "2025-01-12",
    total: "$1199.00",
    payment: "Pending",
    stock: "10/30",
    status: "Processing",
  },
  {
    id: 13,
    customer: "Robert Downey Jr.",
    product: "Headphones - Bose QC35",
    date: "2025-01-13",
    total: "$299.00",
    payment: "Paid",
    stock: "20/50",
    status: "Completed",
  },
  {
    id: 14,
    customer: "Chris Hemsworth",
    product: "Watch - Garmin Fenix 6",
    date: "2025-01-14",
    total: "$599.00",
    payment: "Unpaid",
    stock: "5/20",
    status: "Pending",
  },
  {
    id: 15,
    customer: "Mark Ruffalo",
    product: "Tablet - Samsung Galaxy Tab S7",
    date: "2025-01-15",
    total: "$649.00",
    payment: "Paid",
    stock: "8/40",
    status: "Shipping",
  },
  {
    id: 16,
    customer: "Jeremy Renner",
    product: "Camera - Nikon Z6",
    date: "2025-01-16",
    total: "$1799.00",
    payment: "Paid",
    stock: "3/15",
    status: "Completed",
  },
  {
    id: 17,
    customer: "Tom Hiddleston",
    product: "Gaming Console - Xbox Series X",
    date: "2025-01-17",
    total: "$499.99",
    payment: "Pending",
    stock: "12/60",
    status: "Processing",
  },
  {
    id: 18,
    customer: "Brie Larson",
    product: 'Smart TV - Samsung QLED 65"',
    date: "2025-01-18",
    total: "$1599.99",
    payment: "Paid",
    stock: "18/50",
    status: "Completed",
  },
  {
    id: 19,
    customer: "Paul Rudd",
    product: "Fitness Tracker - Garmin Vivosmart 4",
    date: "2025-01-19",
    total: "$129.95",
    payment: "Pending",
    stock: "25/100",
    status: "Processing",
  },
  {
    id: 20,
    customer: "Evangeline Lilly",
    product: "Coffee Maker - Keurig K-Elite",
    date: "2025-01-20",
    total: "$169.00",
    payment: "Paid",
    stock: "18/50",
    status: "Completed",
  },
  {
    id: 21,
    customer: "Benedict Cumberbatch",
    product: "Smartphone - Google Pixel 6",
    date: "2025-01-21",
    total: "$699.99",
    payment: "Paid",
    stock: "15/50",
    status: "Completed",
  },
  {
    id: 22,
    customer: "Chadwick Boseman",
    product: "Laptop - HP Spectre x360",
    date: "2025-01-22",
    total: "$1399.00",
    payment: "Pending",
    stock: "10/30",
    status: "Processing",
  },
  {
    id: 23,
    customer: "Zoe Saldana",
    product: "Headphones - Sennheiser HD 450BT",
    date: "2025-01-23",
    total: "$199.00",
    payment: "Paid",
    stock: "20/50",
    status: "Completed",
  },
  {
    id: 24,
    customer: "Dave Bautista",
    product: "Watch - Suunto 9",
    date: "2025-01-24",
    total: "$499.00",
    payment: "Unpaid",
    stock: "5/20",
    status: "Pending",
  },
  {
    id: 25,
    customer: "Vin Diesel",
    product: "Tablet - Microsoft Surface Pro 7",
    date: "2025-01-25",
    total: "$899.00",
    payment: "Paid",
    stock: "8/40",
    status: "Shipping",
  },
  {
    id: 26,
    customer: "Michelle Rodriguez",
    product: "Camera - Sony Alpha a7 III",
    date: "2025-01-26",
    total: "$1999.00",
    payment: "Paid",
    stock: "3/15",
    status: "Completed",
  },
  {
    id: 27,
    customer: "Jordana Brewster",
    product: "Gaming Console - Nintendo Switch",
    date: "2025-01-27",
    total: "$299.99",
    payment: "Pending",
    stock: "12/60",
    status: "Processing",
  },
  {
    id: 28,
    customer: "Tyrese Gibson",
    product: 'Smart TV - Sony Bravia 55"',
    date: "2025-01-28",
    total: "$1299.99",
    payment: "Paid",
    stock: "18/50",
    status: "Completed",
  },
  {
    id: 29,
    customer: "Ludacris",
    product: "Fitness Tracker - Apple Watch SE",
    date: "2025-01-29",
    total: "$279.95",
    payment: "Pending",
    stock: "25/100",
    status: "Processing",
  },
  {
    id: 30,
    customer: "Gal Gadot",
    product: "Coffee Maker - Breville Barista Express",
    date: "2025-01-30",
    total: "$699.00",
    payment: "Paid",
    stock: "18/50",
    status: "Completed",
  }
  ];

  // Calculate the indexes for the current page's orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Set current page when a pagination button is clicked
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons based on total order pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const renderPaginationButtons = () =>
    Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => handlePageChange(i + 1)}
        className={`px-3 py-2 leading-tight border ${
          i + 1 === currentPage
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        {i + 1}
      </button>
    ));

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const textpage = "Orders";

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Header
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          textpage={textpage}
        />

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
                    "ID",
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
                {currentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-100 transition duration-300"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {order.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.customer}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.customer}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.payment === "Paid" && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Paid
                        </span>
                      )}
                      {order.payment === "Pending" && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                      {order.payment === "Unpaid" && (
                        <span className="bg-red-500 text-red-800 px-2 py-1 rounded-full">
                          Unpaid
                        </span>
                      )}
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
              <button
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <span>«</span>
              </button>
              {renderPaginationButtons()}
              <button
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <span>»</span>
              </button>
            </nav>
          </div>
          {/* Product Delete */}
          <div className="flex flex-wrap gap-6 mb-6">
            {/* Delete Product */}
            <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Delete Order
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
                  Delete Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
