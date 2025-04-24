import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Orderstatus({ userId }) {
  const [filter, setFilter] = useState("In Transit");
  const [orderStatusInfo, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/orders/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const filteredOrders = orderStatusInfo.filter((order) => {
    if (filter === "All") return true;
    return order.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (!orderStatusInfo.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 card rounded-lg shadow-md my-5 mx-10 bg-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Order Status
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Track your orders in real-time
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap justify-center gap-4 px-4">
        <button
          onClick={() => setFilter("In Transit")}
          className={`px-5 py-2.5 rounded-lg transition duration-200 ${
            filter === "In Transit"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          In Transit
        </button>
        <button
          onClick={() => setFilter("Shipped")}
          className={`px-5 py-2.5 rounded-lg transition duration-200 ${
            filter === "Shipped"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          Shipped
        </button>
        <button
          onClick={() => setFilter("CancelledOrder")}
          className={`px-5 py-2.5 rounded-lg transition duration-200 ${
            filter === "CancelledOrder"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          Cancelled
        </button>
        <button
          onClick={() => setFilter("ReturnedOrder")}
          className={`px-5 py-2.5 rounded-lg transition duration-200 ${
            filter === "ReturnedOrder"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          Returned
        </button>
        <button
          onClick={() => setFilter("All")}
          className={`px-5 py-2.5 rounded-lg transition duration-200 ${
            filter === "All"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          All Orders
        </button>
      </div>

      {/* Order Cards */}
      <div className="max-w-4xl mx-auto space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
          >
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">
                  Order #{order.orderid}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize whitespace-nowrap ${
                    order.status === "Shipped"
                      ? "bg-green-200 text-green-700"
                      : order.status === "In Transit"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "CancelledOrder"
                      ? "bg-red-200 text-red-700"
                      : order.status === "ReturnedOrder"
                      ? "bg-red-200 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Ordered: {new Date(order.ordered).toLocaleDateString()}</p>
                <p>Est. Delivery: {new Date(order.estDelivery).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Shipping & Payment */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Shipping To
                  </p>
                  <p className="text-gray-800 text-sm">
                    {order.shippingaddress}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Payment</p>
                  <p className="text-gray-800 text-sm">{order.payment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">From</p>
                  <p className="text-gray-800 text-sm">{order.from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">To</p>
                  <p className="text-gray-800 text-sm">{order.to}</p>
                </div>
              </div>

              {/* Items */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 md:col-span-2">
                <p className="text-sm text-gray-500 font-medium mb-2">Items</p>
                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                  {order.productselected.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <p className="text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <span className="text-gray-800 font-medium">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="text-sm text-gray-600">
                    Delivery Fee: ${order.deliveryprice}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    ${order.totalprice}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tracking</p>
                  <p className="text-gray-800 font-medium">
                    {order.trackingcode}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carrier</p>
                  <p className="text-gray-800 font-medium">{order.carrier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Update</p>
                  <p className="text-gray-800 font-medium">
                    {order.lastlocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {order.status === "Shipped" ||
              order.status === "CancelledOrder" ||
              order.status === "ReturnedOrder" ? (
                <NavLink
                  to="/buyagain"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 text-center text-sm font-medium"
                >
                  Buy Again
                </NavLink>
              ) : (
                <NavLink
                  to="/trackorder"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 text-center text-sm font-medium"
                >
                  Track Order
                </NavLink>
              )}
              <NavLink
                to="/trackorder"
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-200 text-center text-sm font-medium"
              >
                Contact Driver
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}