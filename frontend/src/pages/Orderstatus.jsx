import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Orderstatusinfo = [
  {
    id: 1,
    orderId: "123456789",
    orderDate: "2023-10-01",
    estimatedDelivery: "2023-10-05",
    shippingMethod: "Standard Shipping",
    shippingCurrentLocation: "Key West, Florida",
    shippingAddress: "123 Main St, City, Country",
    paymentMethod: "Credit Card",
    itemsOrdered: [
      { name: "Samsung Galaxy s24", price: "$999.99", quantity: 1 },
      { name: "Apple Watch Series 8", price: "$399.99", quantity: 1 },
      { name: "Sony WH-1000XM5", price: "$349.99", quantity: 1 },
    ],
    totalAmount: "$1749.97",
    status: "Shipped",
    trackingNumber: "ABC123456789",
    carrier: "FedEx",
  },
  {
    id: 2,
    orderId: "987654321",
    orderDate: "2023-09-28",
    estimatedDelivery: "2023-10-02",
    shippingMethod: "Express Shipping",
    shippingCurrentLocation: "Miami, Florida",
    shippingAddress: "456 Elm St, City, Country",
    paymentMethod: "PayPal",
    itemsOrdered: [
      { name: "Dell Inspiron 15", price: "$799.99", quantity: 1 },
      { name: "Logitech MX Master 3", price: "$99.99", quantity: 1 },
      { name: "Razer BlackWidow V3", price: "$129.99", quantity: 1 },
    ],
    totalAmount: "$1029.97",
    status: "In Transit",
    trackingNumber: "XYZ987654321",
    carrier: "UPS",
  },
  {
    id: 3,
    orderId: "456789123",
    orderDate: "2023-09-25",
    estimatedDelivery: "2023-09-30",
    shippingMethod: "Overnight Shipping",
    shippingCurrentLocation: "Orlando, Florida",
    shippingAddress: "789 Oak St, City, Country",
    paymentMethod: "Debit Card",
    itemsOrdered: [
      { name: "Intel Core i9 14000ks", price: "$999.99", quantity: 1 },
      { name: "NVIDIA RTX 3080", price: "$699.99", quantity: 1 },
      { name: "ASUS ROG Strix Motherboard", price: "$299.99", quantity: 1 },
      { name: "Corsair Vengeance RAM", price: "$199.99", quantity: 2 },
      { name: "Samsung Galaxy Tab S8", price: "$799.99", quantity: 1 },
    ],
    totalAmount: "$2199.97",
    status: "Shipped",
    trackingNumber: "LMN456789123",
    carrier: "DHL",
  },
  {
    id: 4,
    orderId: "321654987",
    orderDate: "2023-09-20",
    estimatedDelivery: "2023-09-25",
    shippingMethod: "Standard Shipping",
    shippingCurrentLocation: "Tampa, Florida",
    shippingAddress: "321 Pine St, City, Country",
    paymentMethod: "Credit Card",
    itemsOrdered: [
      { name: "Macbook Pro 2023", price: "$1999.99", quantity: 1 },
      { name: "Apple AirPods Pro", price: "$249.99", quantity: 1 },
      { name: "Bose QuietComfort 35 II", price: "$299.99", quantity: 1 },
      { name: "Dell UltraSharp Monitor", price: "$499.99", quantity: 1 },
    ],
    totalAmount: "$4799.97",
    status: "CancelledOrder",
    trackingNumber: "RST321654987",
    carrier: "FedEx",
  },
  {
    id: 5,
    orderId: "654321789",
    orderDate: "2023-09-15",
    estimatedDelivery: "2023-09-20",
    shippingMethod: "Express Shipping",
    shippingCurrentLocation: "Jacksonville, Florida",
    shippingAddress: "654 Cedar St, City, Country",
    paymentMethod: "PayPal",
    itemsOrdered: [
      { name: "Iphone 14", price: "$999.99", quantity: 1 },
      { name: "Apple Watch SE", price: "$249.99", quantity: 1 },
      { name: "AirPods Max", price: "$549.99", quantity: 1 },
    ],
    totalAmount: "$2399.97",
    status: "ReturnedOrder",
    trackingNumber: "UVW654321789",
    carrier: "UPS",
  },
];

export default function Orderstatus() {
  const [filter, setFilter] = useState("In Transit");

  const filteredOrders = Orderstatusinfo.filter((order) => {
    if (filter === "All") return true;
    return order.status === filter;
  });

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
            key={order.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
          >
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">
                  Order #{order.orderId}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize whitespace-nowrap ${
                    order.status === "Shipped"
                      ? "bg-green-200 text-green-700"
                      : order.status === "In Transit"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                      ? "bg-red-200 text-red-700"
                      : order.status === "CancelledOrder"
                      ? "bg-red-200 text-red-700"
                      : order.status === "ReturnedOrder"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Ordered: {order.orderDate}</p>
                <p>Est. Delivery: {order.estimatedDelivery}</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Shipping & Payment */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Shipping To
                  </p>
                  <p className="text-gray-800 text-sm">
                    {order.shippingAddress}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Payment</p>
                  <p className="text-gray-800 text-sm">{order.paymentMethod}</p>
                </div>
              </div>

              {/* Items */}
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 font-medium mb-2">Items</p>
                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                  {order.itemsOrdered.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <p className="text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-gray-800 font-medium">
                        $
                        {(
                          parseFloat(item.price.replace("$", "")) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="text-lg font-semibold text-gray-900">
                    $
                    {order.itemsOrdered
                      .reduce(
                        (total, item) =>
                          total +
                          parseFloat(item.price.replace("$", "")) *
                            item.quantity,
                        0
                      )
                      .toFixed(2)}
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
                    {order.trackingNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carrier</p>
                  <p className="text-gray-800 font-medium">{order.carrier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Update</p>
                  <p className="text-gray-800 font-medium">
                    {order.shippingCurrentLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {order.status === "shipped" ||
              order.status === "cancelledorder" ||
              order.status === "returnedorder" ? (
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
