import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Header from "../../components/AdminComponents/header";
import Sidebar from "../../components/AdminComponents/Sidebar";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminManageOrders({ adminData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const ordersPerPage = 10;
  
  // States for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditOrder, setCurrentEditOrder] = useState(null);
  
  // States for delete confirmation
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // Get Orders from backend database
  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
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
      : orders.filter((order) => {
          if (filter === "In Transit") return order.status.toLowerCase() === "in transit";
          if (filter === "Shipped") return order.status.toLowerCase() === "shipped";
          if (filter === "Returned") return order.status.toLowerCase() === "returned";
          if (filter === "Cancelled") return order.status.toLowerCase() === "cancelled" || order.status.toLowerCase() === "canceled";
          return false;
        });
      
  const currentOrdersfilter = filterOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalOrdersPages = Math.ceil(filterOrders.length / ordersPerPage);

  // Set current page when a pagination button is clicked
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
  
  // Handle editing an order
  const handleEditOrder = (order) => {
    setCurrentEditOrder({...order});
    setEditModalOpen(true);
  };
  
  const handleUpdateOrder = async (e) => {
    e.preventDefault();
  
    if (!currentEditOrder.customer || !currentEditOrder.status) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      // Ensure all required fields are included and properly formatted
      const orderToUpdate = {
        ...currentEditOrder,
        // Make sure these required fields exist
        from: currentEditOrder.from || currentEditOrder.fromaddress,
        to: currentEditOrder.to || currentEditOrder.toaddress,
        deliveryprice: currentEditOrder.deliveryprice || 0,
        // Convert totalprice to string as required by schema
        totalprice: currentEditOrder.totalprice.toString()
      };
  
      const response = await fetch(`http://localhost:3001/admin/orders/${currentEditOrder.orderid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderToUpdate),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Update the orders in state to reflect the change
        const updatedOrders = orders.map(order => 
          order.orderid === currentEditOrder.orderid ? currentEditOrder : order
        );
        setOrders(updatedOrders);
        setEditModalOpen(false);
        // Optional: Show success message
        alert("Order updated successfully!");
      } else {
        console.error("Failed to update order:", data.message);
        alert(`Failed to update order: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Error connecting to server. Please try again.");
    }
  };
  
  // Open delete confirmation modal for a specific order
  const openDeleteConfirmation = (order) => {
    setOrderToDelete(order);
    setDeleteModalOpen(true);
  };
  
// Handle deleting an order from the table
const handleDeleteSelectedOrder = async () => {
  if (!orderToDelete) return;

  try {
    // Send the delete request to the API
    const response = await fetch(`http://localhost:3001/admin/orders/${orderToDelete.orderid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Remove the order from the state
      const updatedOrders = orders.filter(order => order.orderid !== orderToDelete.orderid);
      setOrders(updatedOrders);
      setDeleteModalOpen(false);
      setOrderToDelete(null);

      // Adjust pagination if the current page becomes empty
      if (updatedOrders.length <= (currentPage - 1) * ordersPerPage && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      const errorData = await response.json();
      console.error("Failed to delete order:", errorData.message);
      alert(`Failed to delete order: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    alert("Error connecting to server. Please try again later.");
  }
};
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="loader"></div>
      </div>
    );
  }

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                {currentOrdersfilter.length > 0 ? (
                  currentOrdersfilter.map((order) => (
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
                            <button 
                              className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                              onClick={() => handleEditOrder(order)}
                              title="Edit Order"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button 
                              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                              onClick={() => openDeleteConfirmation(order)}
                              title="Delete Order"
                            >
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="border border-gray-300 px-4 py-2 text-center">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalOrdersPages > 0 && (
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
          )}
        </div>
         
        {/* Edit Order Modal */}
        {editModalOpen && currentEditOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Order #{currentEditOrder.orderid}</h2>
                <button 
                  onClick={() => setEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleUpdateOrder} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Customer</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded" 
                      value={currentEditOrder.customer}
                      onChange={(e) => setCurrentEditOrder({...currentEditOrder, customer: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Status</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={currentEditOrder.status}
                      onChange={(e) => setCurrentEditOrder({...currentEditOrder, status: e.target.value})}
                    >
                      <option value="in transit">In Transit</option>
                      <option value="shipped">Shipped</option>
                      <option value="returned">Returned</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Order Date</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded" 
                      value={currentEditOrder.ordered}
                      onChange={(e) => setCurrentEditOrder({...currentEditOrder, ordered: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Est. Delivery</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded" 
                      value={currentEditOrder.estDelivery}
                      onChange={(e) => setCurrentEditOrder({...currentEditOrder, estDelivery: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Payment Method</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={currentEditOrder.payment}
                      onChange={(e) => setCurrentEditOrder({...currentEditOrder, payment: e.target.value})}
                    >
                      <option value="payPal">PayPal</option>
                      <option value="credit">Credit Card</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Total Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="w-full p-2 border border-gray-300 rounded" 
                      value={currentEditOrder.totalprice}
                      onChange={(e) => setCurrentEditOrder({...currentEditOrder, totalprice: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Carrier</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded" 
                      value={currentEditOrder.carrier}
                      onChange={(e) => setCurrentEditOrder({...currentEditOrder, carrier: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Tracking Code</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded" 
                      value={currentEditOrder.trackingcode}
                      onChange={(e) => setCurrentEditOrder({...currentEditOrder, trackingcode: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Shipping From</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    value={currentEditOrder.fromaddress}
                    onChange={(e) => setCurrentEditOrder({...currentEditOrder, fromaddress: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Shipping To</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    value={currentEditOrder.toaddress}
                    onChange={(e) => setCurrentEditOrder({...currentEditOrder, toaddress: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Last Location</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    value={currentEditOrder.lastlocation}
                    onChange={(e) => setCurrentEditOrder({...currentEditOrder, lastlocation: e.target.value})}
                  />
                </div>
                
                <h3 className="font-medium text-gray-800">Products</h3>
                {currentEditOrder.productselected.map((product, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 border p-2 rounded">
                    <div>
                      <label className="block text-gray-700 text-sm">Product Name</label>
                      <input 
                        type="text" 
                        className="w-full p-1 border border-gray-300 rounded text-sm" 
                        value={product.name}
                        onChange={(e) => {
                          const updatedProducts = [...currentEditOrder.productselected];
                          updatedProducts[index].name = e.target.value;
                          setCurrentEditOrder({...currentEditOrder, productselected: updatedProducts});
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm">Quantity</label>
                      <input 
                        type="number" 
                        className="w-full p-1 border border-gray-300 rounded text-sm" 
                        value={product.qty}
                        onChange={(e) => {
                          const updatedProducts = [...currentEditOrder.productselected];
                          updatedProducts[index].qty = parseInt(e.target.value);
                          setCurrentEditOrder({...currentEditOrder, productselected: updatedProducts});
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm">Price ($)</label>
                      <input 
                        type="number"
                        step="0.01" 
                        className="w-full p-1 border border-gray-300 rounded text-sm" 
                        value={product.price}
                        onChange={(e) => {
                          const updatedProducts = [...currentEditOrder.productselected];
                          updatedProducts[index].price = parseFloat(e.target.value);
                          setCurrentEditOrder({...currentEditOrder, productselected: updatedProducts});
                        }}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end space-x-2 mt-6">
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 border border-gray-300 rounded-md text-white hover:bg-blue-100"
                  >
                    Update Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {deleteModalOpen && orderToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="text-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-xl font-semibold mt-2">Confirm Delete</h2>
                <p className="text-gray-600 mt-1">
                  Are you sure you want to delete Order #{orderToDelete.orderid} for {orderToDelete.customer}?
                </p>
                <p className="text-gray-500 text-sm mt-2">This action cannot be undone.</p>
              </div>
              
              <div className="flex justify-center space-x-2 mt-4">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setOrderToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={handleDeleteSelectedOrder}
                >
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}