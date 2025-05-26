import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";
import Sidebar from "../../components/AdminComponents/Sidebar";
import Header from "../../components/AdminComponents/header";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminManageProducts({ adminData }) {
  const [file, setFile] = useState(null);
  const [newProductFile, setNewProductFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState([]);
  const [newProductCsvPreview, setNewProductCsvPreview] = useState([]);

  // Fetch products from the database
  const [products, setProducts] = useState([]);
  // console.log("Products: ", products);

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

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filter logic
  const [filter, setFilter] = useState("All Products");
  const filteredItems =
    filter === "All Products"
      ? products
      : filter === "In Stock"
      ? products.filter((product) => product.stock_remaining > 0)
      : products.filter((product) => product.stock_remaining === 0);
  const currentFilteredItems = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalFilteredPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Upload Products CSV
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

  // Upload New Products CSV
  const handleNewProductFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setNewProductFile(selectedFile);

    if (selectedFile) {
      Papa.parse(selectedFile, {
        header: true, // Parse as JSON
        skipEmptyLines: true,
        complete: (results) => {
          setNewProductCsvPreview(results.data.slice(0, 5)); // Show only the first 5 rows
        },
      });
    }
  };

  const handleUploadNewProduct = async () => {
    if (!newProductFile) {
      alert("Please select a file!");
      return;
    }
    const formData = new FormData();
    formData.append("file", newProductFile);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/upload-csv-new-products",
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

  // ในใช้งานจริงต้องใช้งานร่วม API ภายนอกสำหรับการเก็บรูปภาพสินค้า และ ส่งเป็น URL ไปยังฐานข้อมูล
  // ในที่นี้จะใช้ FileReader เพื่อแสดงตัวอย่างรูปภาพที่อัพโหลด
  const [images, setImages] = useState([]);
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({ file, preview: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then((result) => {
      setImages((prev) => [...prev, ...result]);
    });
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Header
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          textpage="Products"
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
              <div className="mb-4">
                <label className="block text-gray-700">Breadcrumbs</label>
                <input

                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product breadcrumbs"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Colors</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product colors (comma separated)"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Highlights</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product highlights (comma separated)"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Details</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product details"
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
                  onChange={handleImageUpload}
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
            <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No images selected yet.</p>
              )}
            </div>
            <button
              type="button"
              className="mt-4 w-full bg-gray-200 text-blue-500 py-2 px-4 rounded hover:bg-gray-300"
              onClick={() => setImages([])}
            >
              Delete All Images
            </button>
          </div>
        </div>

        {/* Add New Product from CSV */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Add Featured Product CSV
            </h2>
            <input
              type="file"
              accept=".csv"
              className="p-2 border border-gray-300 rounded-lg mb-4 py-2 px-4"
              onChange={handleNewProductFileChange}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={handleUploadNewProduct}
            >
              Upload
            </button>
          </div>
        </div>

        {/* New Product CSV Preview */}
        {newProductCsvPreview && newProductCsvPreview.length > 0 ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Featured Product CSV Preview (First 5 Rows)
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(newProductCsvPreview[0]).map((header, index) => (
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
                {newProductCsvPreview.map((row, rowIndex) => (
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
              Upload
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

        {/* Products List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Products List
          </h2>
          {/* Tabs for different order statuses */}
          <div className="flex space-x-4 mb-4">
            {["All Products", "In Stock", "Sold Out"].map((tab, index) => (
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
                    "Stock",
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
                {currentFilteredItems.map((product, index) => (
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
                      {product.stock_remaining}
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
      </div>
    </div>
  );
}
