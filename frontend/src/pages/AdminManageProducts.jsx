import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminManageProducts({
  isAdmin,
  setIsAdmin,
  setAdminData,
}) {
  const [file, setFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState([]);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      Papa.parse(selectedFile, {
        header: true, // Parse as JSON
        skipEmptyLines: true,
        complete: (results) => {
          setCsvPreview(results.data.slice(0, 5)); // Show only the first 5 rows
        },
      });
    }
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

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
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

        <div className="flex flex-wrap gap-6 mb-6">
          {/* Add Product Form */}
          <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Add New Product
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Base Price</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter base price"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Discount (%)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter discount percentage"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Stock</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product stock"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={(e) => {
                    const files = e.target.files;
                    const previewContainer =
                      document.getElementById("image-previews");

                    // Clear existing previews
                    previewContainer.innerHTML = "";

                    Array.from(files).forEach((file) => {
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const img = document.createElement("img");
                          img.src = reader.result;
                          img.className =
                            "w-24 h-24 object-cover rounded-lg border border-gray-200 m-2";
                          previewContainer.appendChild(img);
                        };
                        reader.readAsDataURL(file);
                      }
                    });
                  }}
                />
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Add Product
              </button>
            </form>
          </div>

          {/* Image Preview */}
          <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Product Media
            </h2>
            <div
              className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300"
              id="image-previews"
            >
              <p className="text-gray-500">No images selected yet.</p>
            </div>
            <button
              type="button"
              className="mt-4 w-full bg-gray-200 text-blue-500 py-2 px-4 rounded hover:bg-gray-300"
            >
              Add More Images
            </button>
          </div>
        </div>

        {/* Upload CSV */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Upload Products CSV file
            </h2>
            <input
              type="file"
              accept=".csv"
              className="p-2 border border-gray-300 rounded-lg mb-4 py-2 px-4"
              onChange={handleFileChange}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={handleUpload}
            >
              Upload CSV
            </button>
          </div>
        </div>

        {/* CSV Preview */}
        {csvPreview && csvPreview.length > 0 ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              CSV Preview (First 5 Rows)
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(csvPreview[0]).map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvPreview.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(row).map((key, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-200 px-4 py-2 text-sm text-gray-600"
                      >
                        {row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-gray-500 text-sm mt-2">
              Showing the first 5 rows of the CSV file.
            </p>
          </div>
        ) : (
          <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6 mb-6">
            <p className="text-gray-500 text-sm mt-2">
              No CSV data available. Please select a file.
            </p>
          </div>
        )}

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
        </div>
      </div>
    </div>
  );
}
