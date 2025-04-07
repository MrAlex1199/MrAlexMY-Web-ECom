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
    totalAmount: "$99.99",
    itemsOrdered: [
      { name: "Product 1", price: "$49.99" },
      { name: "Product 2", price: "$29.99" },
      { name: "Product 3", price: "$19.99" },
    ],
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
    totalAmount: "$149.99",
    itemsOrdered: [
      { name: "Product A", price: "$79.99" },
      { name: "Product B", price: "$49.99" },
      { name: "Product C", price: "$19.99" },
    ],
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
    totalAmount: "$199.99",
    itemsOrdered: [
      { name: "Product X", price: "$99.99" },
      { name: "Product Y", price: "$79.99" },
      { name: "Product Z", price: "$29.99" },
    ],
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
    totalAmount: "$89.99",
    itemsOrdered: [
      { name: "Product M", price: "$39.99" },
      { name: "Product N", price: "$29.99" },
      { name: "Product O", price: "$19.99" },
    ],
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
    totalAmount: "$129.99",
    itemsOrdered: [
      { name: "Product P", price: "$69.99" },
      { name: "Product Q", price: "$39.99" },
      { name: "Product R", price: "$19.99" },
    ],
    status: "ReturnedOrder",
    trackingNumber: "UVW654321789",
    carrier: "UPS",
  },
];

export default function Orderstatus() {
  const [filter, setFilter] = useState("All");

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
          onClick={() => setFilter("All")}
          className={`px-5 py-2.5 rounded-lg transition duration-200 ${
            filter === "All"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          All Orders
        </button>
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
          Cancelled Orders
        </button>
        <button
          onClick={() => setFilter("ReturnedOrder")}
          className={`px-5 py-2.5 rounded-lg transition duration-200 ${
            filter === "ReturnedOrder"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          Returned Orders
        </button>
      </div>

      {/* Order Cards */}
      <div className="max-w-4xl mx-auto space-y-8">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Order #{order.orderId}
              </h2>
              <span className="text-sm text-gray-500">Order Date {order.orderDate} | Estimated Delivery {order.estimatedDelivery}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Shipped"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.shippingCurrentLocation} | {order.status}
              </span>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500">Shipping Address</p>
                <p className="text-gray-900">{order.shippingAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="text-gray-900">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Items Ordered</p>
              <ul className="space-y-2">
                {order.itemsOrdered.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-gray-900"
                  >
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-semibold text-gray-900">
                Total: {order.totalAmount}
              </p>
            </div>

            {/* Tracking Info */}
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">Tracking Number</p>
              <p className="text-gray-900">{order.trackingNumber}</p>
              <p className="text-sm text-gray-500 mt-2">Carrier</p>
              <p className="text-gray-900">{order.carrier}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <NavLink
                to="/trackorder"
                className="w-full sm:w-auto bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition duration-200 text-center"
              >
                Track Order
              </NavLink>
              <NavLink
                to="/trackorder"
                className="w-full sm:w-auto bg-gray-100 text-gray-900 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition duration-200 text-center"
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
