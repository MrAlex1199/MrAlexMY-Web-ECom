import React from "react";

export default function cart({
  userId,
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

      if (newQuantity <= 0) {
        // Delete product from cart if quantity reaches 0

        const response = await fetch(
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

      const response = await fetch(
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
                          handleQuantityChange(product.productId, product.quantity - 1)
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
                          handleQuantityChange(product.productId, product.quantity + 1)
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

            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({selectedProducts.length} items)</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>$5.00</span>
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
                  <span className="text-indigo-600">${totalPrice}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}