import React, { useState } from "react";

export default function Cart({
  userId,
  userData,
  selectedProducts,
  totalPrice,
  setSelectedProducts,
  setTotalPrice,
}) {
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (!userId) {
        throw new Error("User ID is missing");
      }

      let response;

      if (newQuantity <= 0) {
        // Delete product from cart if quantity reaches 0
        response = await fetch(
          `http://localhost:3001/cart/delete-product/${userId}/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: newQuantity }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete product");
        }

        const updatedProducts = selectedProducts.filter(
          (product) => product.productId !== productId
        );
        setSelectedProducts(updatedProducts);

        const newTotalPriceF = updatedProducts.reduce(
          (acc, product) => acc + product.totalPrice,
          0.0
        );
        setTotalPrice(newTotalPriceF.toFixed(2));

        console.log("Product deleted from cart");
        return; // Exit the function after deletion
      }

      // Calculate new total price for the product (if quantity remains above 0)
      const newProductTotalPrice =
        newQuantity *
        selectedProducts.find((product) => product.productId === productId)
          .price;

      response = await fetch(
        `http://localhost:3001/cart/update-quantity/${userId}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
            totalPrice: newProductTotalPrice,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product quantity");
      }

      // Optimistic UI update (assuming successful backend update)
      const updatedProducts = selectedProducts.map((product) => {
        if (product.productId === productId) {
          return {
            ...product,
            quantity: newQuantity,
            totalPrice: newProductTotalPrice,
          };
        }
        return product;
      });

      setSelectedProducts(updatedProducts);
      const newTotalPriceF = updatedProducts.reduce(
        (acc, product) => acc + product.totalPrice,
        0.0
      );
      setTotalPrice(newTotalPriceF.toFixed(2));

      console.log("Product quantity updated successfully");
    } catch (error) {
      console.error("Failed to update product quantity:", error);
      // Handle potential error scenarios (e.g., display error message to user)
    }
  };

  const [shippingLocation, setShippingLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleShippingChange = (e) => {
    setShippingLocation(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // save order details to database
  const saveOrderDetails = async () => {
    try {
      if (!userId || !shippingLocation || !paymentMethod) {
        throw new Error("Missing required order details");
      }

      const orderDetails = {
        orderid: Math.floor(Math.random() * 1000000), // Generate a random order ID
        userId: userId,
        customer: `${userData.firstName} ${userData.lastName}`,
        productselected: selectedProducts.map((product) => ({
          name: product.productName,
          qty: product.quantity,
          price: product.price,
        })),
        ordered: new Date(),
        estDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Estimated delivery in 3 days
        from: "Warehouse A", // Example warehouse location
        to: shippingLocation,
        totalprice: (
          Number(totalPrice) +
          (shippingLocation === "us"
            ? 5
            : shippingLocation === "eu"
            ? 10
            : shippingLocation === "asia"
            ? 15
            : 0)
        ).toFixed(2),
        payment: paymentMethod,
        fromaddress: "123 Warehouse St, City, Country", // Example address
        toaddress: `${userData.address[0]?.address || "N/A"}, ${
          userData.address[0]?.city || "N/A"
        }, ${userData.address[0]?.country || "N/A"}`,
        shippingaddress: shippingLocation,
        trackingcode: `TRK${Math.floor(Math.random() * 1000000)}`,
        lastlocation: "Warehouse A", // Example last location before using delivery Company API Data
        carrier: "Carrier X", // Example Data before using delivery Company API Data
        status: "In Transit", // Example Data before using delivery Company API Data
      };

      const response = await fetch("http://localhost:3001/orders/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to save order details");
      }

      console.log("Order details saved successfully");

      // Clear the cart in the database after successful order save
      const clearCartResponse = await fetch(`http://localhost:3001/cart/clear/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!clearCartResponse.ok) {
        throw new Error("Failed to clear the cart in the database");
      }

      // Clear the cart in the UI
      setSelectedProducts([]);
      setTotalPrice("0.00");

      window.location.href = "/Orderstatus";
    } catch (error) {
      console.error("Error saving order details:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Shopping Cart
                </h2>
                <span className="text-lg font-medium text-gray-600">
                  {selectedProducts.length} Items
                </span>
              </div>

              {/* Header for larger screens */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200">
                <div className="col-span-5">
                  <p className="text-sm text-gray-500">Product</p>
                </div>
                <div className="col-span-3 text-center">
                  <p className="text-sm text-gray-500">Quantity</p>
                </div>
                <div className="col-span-4 text-right">
                  <p className="text-sm text-gray-500">Total</p>
                </div>
              </div>

              {/* Cart Items */}
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="py-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Product Info */}
                    <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                      <img
                        src={product.imageSrc}
                        alt={product.productName}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-6 md:col-span-3 mt-2 md:mt-0">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.productId,
                              product.quantity - 1
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-l-md hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeWidth="2"
                              strokeLinecap="round"
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          value={product.quantity}
                          readOnly
                          className="w-16 h-10 text-center border-t border-b border-gray-200 focus:outline-none"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.productId,
                              product.quantity + 1
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-r-md hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeWidth="2"
                              strokeLinecap="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="col-span-6 md:col-span-4 mt-2 md:mt-0">
                      <p className="text-lg font-semibold text-indigo-600 text-right">
                        ${product.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-6">
                {/* Shipping Location */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">
                    Shipping Location
                  </label>
                  <select
                    value={shippingLocation}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Select a location</option>
                    <option value="us">United States ($5.00)</option>
                    <option value="eu">Europe ($10.00)</option>
                    <option value="asia">Asia ($15.00)</option>
                    {/* Display location from userData if available */}
                    {userData.address &&
                      userData.address.length > 0 &&
                      userData.address.map((addr, index) => (
                        <option key={index} value={addr.country}>
                          {`${addr.firstName} ${addr.lastName}, ${addr.address}, ${addr.city}, ${addr.postalCode}, ${addr.phone}, ${addr.country}`}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="credit"
                        checked={paymentMethod === "credit"}
                        onChange={handlePaymentChange}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      Credit Card
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={handlePaymentChange}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      PayPal
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="crypto"
                        checked={paymentMethod === "crypto"}
                        onChange={handlePaymentChange}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      Cryptocurrency
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={handlePaymentChange}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                {/* Summary Calculations */}
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({selectedProducts.length} items)</span>
                    <span>${Number(totalPrice).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Price</span>
                    <span>
                      $
                      {shippingLocation === "us"
                        ? "5.00"
                        : shippingLocation === "eu"
                        ? "10.00"
                        : shippingLocation === "asia"
                        ? "15.00"
                        : shippingLocation === "United States"
                        ? "5.00"
                        : "0.00"}
                    </span>
                  </div>

                  {/* Promo Code */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Promo Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                      />
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-indigo-600">
                        $
                        {(
                          Number(totalPrice) +
                          (shippingLocation === "us"
                            ? 5
                            : shippingLocation === "eu"
                            ? 10
                            : shippingLocation === "asia"
                            ? 15
                            : shippingLocation === "United States"
                            ? 5
                            : 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={saveOrderDetails}
                    disabled={!shippingLocation || !paymentMethod}
                    className={`w-full py-3 rounded-md font-semibold text-white transition-colors ${
                      !shippingLocation || !paymentMethod
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
