import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Header from "../../components/AdminComponents/header";
import Sidebar from "../../components/AdminComponents/Sidebar";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminManageOrders({ adminData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  const ordersPerPage = 10;

  console.log("Orders:", orders);

  // Sample data for orders list
  // const orders = [
  //   {
  //     orderid: 1,
  //     customer: "John Doe",
  //     productselected: [
  //       { name: "Smartphone - Samsung Galaxy S21", qty: 1, price: 799.99 },
  //       { name: "Smartphone - iPhone 13", qty: 1, price: 999.99 },
  //       { name: "Smartphone - Google Pixel 6", qty: 1, price: 699.99 },
  //       { name: "Smartphone - OnePlus 9", qty: 1, price: 599.99 },
  //     ],
  //     ordered: "2025-01-01",
  //     estDelivery: "2025-01-05",
  //     from: "Best Buy",
  //     to: "Alex dakota",
  //     totalprice: "$2999.96",
  //     payment: "payPal",
  //     fromaddress: "456 Elm St, Townsville, CA 12345",
  //     toaddress: "789 Oak St, Villagetown, CA 12345",
  //     shippingaddress: "123 Main St, Cityville, CA 12345",
  //     trackingcode: "ABC123456",
  //     lastlocation: "Los Angeles, CA",
  //     carrier: "FedEx",
  //     status: "Shipped",
  //   },
  //   {
  //     orderid: 2,
  //     customer: "Jane Smith",
  //     productselected: [
  //       { name: "Smartphone - Samsung Galaxy S21", qty: 1, price: 799.99 },
  //       { name: "Smartphone - iPhone 13", qty: 1, price: 999.99 },
  //       { name: "Smartphone - Google Pixel 6", qty: 1, price: 699.99 },
  //       { name: "Smartphone - OnePlus 9", qty: 1, price: 599.99 },
  //     ],
  //     ordered: "2025-01-02",
  //     estDelivery: "2025-01-06",
  //     from: "Best Buy",
  //     to: "John Doe",
  //     totalprice: "$2999.96",
  //     payment: "creditCard",
  //     fromaddress: "456 Elm St, Townsville, CA 12345",
  //     toaddress: "789 Oak St, Villagetown, CA 12345",
  //     shippingaddress: "123 Main St, Cityville, CA 12345",
  //     trackingcode: "DEF654321",
  //     lastlocation: "New York, NY",
  //     carrier: "UPS",
  //     status: "in Transit",
  //   },
  //   {
  //     orderid: 3,
  //     customer: "Mary Johnson",
  //     productselected: [
  //       { name: "Smartphone - Samsung Galaxy S21", qty: 1, price: 799.99 },
  //       { name: "Smartphone - iPhone 13", qty: 1, price: 999.99 },
  //       { name: "Smartphone - Google Pixel 6", qty: 1, price: 699.99 },
  //       { name: "Smartphone - OnePlus 9", qty: 1, price: 599.99 },
  //     ],
  //     ordered: "2025-01-02",
  //     estDelivery: "2025-01-06",
  //     from: "Best Buy",
  //     to: "John Doe",
  //     totalprice: "$2999.96",
  //     payment: "creditCard",
  //     fromaddress: "456 Elm St, Townsville, CA 12345",
  //     toaddress: "789 Oak St, Villagetown, CA 12345",
  //     shippingaddress: "123 Main St, Cityville, CA 12345",
  //     trackingcode: "DEF654321",
  //     lastlocation: "New York, NY",
  //     carrier: "UPS",
  //     status: "canceled",
  //   },
  //   {
  //     orderid: 4,
  //     customer: "william Brown",
  //     productselected: [
  //       { name: "Smartphone - Samsung Galaxy S21", qty: 1, price: 799.99 },
  //       { name: "Smartphone - iPhone 13", qty: 1, price: 999.99 },
  //       { name: "Smartphone - Google Pixel 6", qty: 1, price: 699.99 },
  //       { name: "Smartphone - OnePlus 9", qty: 1, price: 599.99 },
  //     ],
  //     ordered: "2025-01-02",
  //     estDelivery: "2025-01-06",
  //     from: "Best Buy",
  //     to: "John Doe",
  //     totalprice: "$2999.96",
  //     payment: "creditCard",
  //     fromaddress: "456 Elm St, Townsville, CA 12345",
  //     toaddress: "789 Oak St, Villagetown, CA 12345",
  //     shippingaddress: "123 Main St, Cityville, CA 12345",
  //     trackingcode: "DEF654321",
  //     lastlocation: "New York, NY",
  //     carrier: "UPS",
  //     status: "returned",
  //   },
  // ];

  // Get Orders from backend database
  useEffect(() => {
    // setLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        // setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Calculate the indexes for the current page's orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  // Filter orders based on the selected tab
  const [filter, setFilter] = useState("All Orders");
  const filterOrders =
    filter === "All Orders"
      ? orders
      : filter === "In Transit"
      ? orders.filter((order) => order.status.toLowerCase() === "in transit")
      : filter === "Shipped"
      ? orders.filter((order) => order.status.toLowerCase() === "shipped")
      : filter === "Returned"
      ? orders.filter((order) => order.status.toLowerCase() === "returned")
      : orders.filter((order) => order.status.toLowerCase() === "canceled");
      
  const currentOrdersfilter = filterOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalOrdersPages = Math.ceil(filterOrders.length / ordersPerPage);

  // Set current page when a pagination button is clicked
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const textpage = "Orders";
  
  // State for expanded product rows
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Helper function to extract product names and create a concise display
  const formatProductList = (products) => {
    return products.map(product => {
      // Extract just the model name without the "Smartphone - " prefix
      const modelName = product.name.replace("Smartphone - ", "");
      return modelName;
    }).join(", ");
  };

  // Toggle expanded product view
  const toggleProductView = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-100">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }
  // if (orders.length === 0) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-100">
  //       <p className="text-gray-500">No orders found.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Header
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          textpage={textpage}
          AdminData={adminData}
        />

        {/* Orders List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Orders List
          </h2>
          {/* Tabs for different order statuses */}
          <div className="flex space-x-4 mb-4">
            {[
              "All Orders",
              "In Transit",
              "Shipped",
              "Returned",
              "Cancelled",
            ].map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg ${
                  tab === filter
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
                    "Customer",
                    "Products",
                    "Order Date",
                    "Est. Delivery",
                    "Payment",
                    "Total Price",
                    "Carrier",
                    "Status",
                    "Actions"
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
                {currentOrdersfilter.map((order) => (
                  <React.Fragment key={order.orderid}>
                    <tr className="hover:bg-gray-100 transition duration-300">
                      <td className="border border-gray-300 px-4 py-2">
                        {order.orderid}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.customer}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex items-center">
                          <span className="mr-2">{formatProductList(order.productselected)}</span>
                          <button 
                            onClick={() => toggleProductView(order.orderid)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            {expandedOrder === order.orderid ? 
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                              </svg>
                              : 
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            }
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.ordered}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.estDelivery}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.payment === "payPal" && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            PayPal
                          </span>
                        )}
                        {order.payment === "credit" && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Credit Card
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.totalprice}$
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.carrier}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.status.toLowerCase() === "shipped" && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Shipped
                          </span>
                        )}
                        {order.status.toLowerCase() === "in transit" && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            In Transit
                          </span>
                        )}
                        {order.status.toLowerCase() === "canceled" && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            Canceled
                          </span>
                        )}
                        {order.status.toLowerCase() === "returned" && (
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            Returned
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          <button className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button className="bg-red-500 text-white p-1 rounded hover:bg-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedOrder === order.orderid && (
                      <tr>
                        <td colSpan="10" className="border border-gray-300 bg-gray-50 px-4 py-2">
                          <div className="p-2">
                            <h4 className="font-medium text-gray-800 mb-2">Product Details:</h4>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-gray-200">
                                  <th className="py-1 px-2 text-left">Product</th>
                                  <th className="py-1 px-2 text-left">Quantity</th>
                                  <th className="py-1 px-2 text-left">Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.productselected.map((product, index) => (
                                  <tr key={index} className="border-b border-gray-200">
                                    <td className="py-1 px-2">{product.name}</td>
                                    <td className="py-1 px-2">{product.qty}</td>
                                    <td className="py-1 px-2">${product.price.toFixed(2)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="mt-2">
                              <p><span className="font-medium">Shipping From:</span> {order.fromaddress}</p>
                              <p><span className="font-medium">Shipping To:</span> {order.toaddress}</p>
                              <p><span className="font-medium">Tracking Code:</span> {order.trackingcode}</p>
                              <p><span className="font-medium">Last Location:</span> {order.lastlocation}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
                { length: totalOrdersPages },
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
                  handlePageChange(Math.min(totalOrdersPages, currentPage + 1))
                }
                disabled={currentPage === totalOrdersPages}
              >
                <span>»</span>
              </button>
            </nav>
          </div>
        </div>
        {/* Delete Order Section */}
        <div className="flex flex-wrap gap-6 my-6">
          {/* Delete Order */}
          <div className="flex-1 min-w-[300px] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Delete Order
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Order ID</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter order ID"
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
  );
}