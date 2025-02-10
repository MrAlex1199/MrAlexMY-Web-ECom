import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sidebar from "../../components/AdminComponents/Sidebar";
import Header from "../../components/AdminComponents/header";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminPromotions() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Fetch products from the database
  const [products, setProducts] = useState([]);
  console.log("Products: ", products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  // Calculate the indexes for the current page's products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Set current page when a pagination button is clicked
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons based on total product pages
  const totalPages = Math.ceil(products.length / productsPerPage);
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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Header
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          textpage="Promotions"
        />

        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            { title: "Total Products", value: 21, color: "text-blue-600" },
            { title: "Active Discount", value: 18, color: "text-green-600" },
            { title: "Remove Discount", value: 2, color: "text-purple-600" },
            {
              title: "SoldOut Products",
              value: "30",
              color: "text-red-600",
            },
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

        {/* Add Promotions */}
        <div className="flex flex-wrap gap-6 mb-6">
          {/* Apply Promotions */}
          <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Apply Promotions
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
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Apply Promotion
              </button>
            </form>
          </div>
          {/* Delete Promotions */}
          <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Remove Promotions
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
                Remove Promotion
              </button>
            </form>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Products Promotions List
          </h2>
          {/* Tabs for different order statuses */}
          <div className="flex space-x-4 mb-4">
            {[
              "All Products Promotions",
              "Ative Pronotions",
              "Rrmove Promotions",
              "Sold out Products",
              "Deleted Products",
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
                  {[
                    "",
                    "ID",
                    "Name",
                    "Price",
                    "Breadcrumbs",
                    "Colors",
                    "Description",
                    "Highlights",
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
                {currentProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-100 transition duration-300"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-purple-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.breadcrumbs}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.colors.map((color) => color.name).join(", ")}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.highlights.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
