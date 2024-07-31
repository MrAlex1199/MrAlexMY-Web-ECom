import React from 'react';

export default function cart({ userId, selectedProducts, totalPrice, setSelectedProducts, setTotalPrice }) {
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (!userId) {
        throw new Error('User ID is missing');
      }

      if (newQuantity <= 0) {
        // Delete product from cart if quantity reaches 0

        const response = await fetch(`http://localhost:3001/cart/delete-product/${userId}/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: newQuantity, }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        const updatedProducts = selectedProducts.filter(product => product.productId !== productId);
        setSelectedProducts(updatedProducts);

        const newTotalPriceF = updatedProducts.reduce((acc, product) => acc + product.totalPrice, 0.00);
        setTotalPrice(newTotalPriceF.toFixed(2));

        console.log('Product deleted from cart');
        return; // Exit the function after deletion
      }

     // Calculate new total price for the product (if quantity remains above 0)
     const newProductTotalPrice = newQuantity * selectedProducts.find(product => product.productId === productId).price;

      const response = await fetch(`http://localhost:3001/cart/update-quantity/${userId}/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity, totalPrice: newProductTotalPrice }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product quantity');
      }

      // Optimistic UI update (assuming successful backend update)
      const updatedProducts = selectedProducts.map((product) => {
        if (product.productId === productId) {
          return { ...product, quantity: newQuantity, totalPrice: newProductTotalPrice };
        }
        return product;
      });

      setSelectedProducts(updatedProducts);
      const newTotalPriceF = updatedProducts.reduce((acc, product) => acc + product.totalPrice, 0.00);
      setTotalPrice(newTotalPriceF.toFixed(2));

      console.log('Product quantity updated successfully');
    } catch (error) {
      console.error('Failed to update product quantity:', error);
      // Handle potential error scenarios (e.g., display error message to user)
    }
  };
  
return (
  <div>
    {/* Products map */}
    <div className="card rounded-lg shadow-md mt-5 mx-10 bg-white py-28">
      <div className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">{selectedProducts.length} Items</h2>
              </div>
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                    </div>
                  </div>
                </div>
              </div>
                  {selectedProducts.map((products) => (
                  <div key={products.id} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200">
                    <div className="w-full md:max-w-[126px]">
                      <img src={products.imageSrc} alt='' className="mx-auto"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                      <div className="md:col-span-2">
                        <div className="flex flex-col max-[500px]:items-center gap-3">
                          <h6 className="font-semibold text-base leading-7 text-black">{products.productName}</h6>
                          <h6 className="font-normal text-base leading-7 text-gray-500">{products.productName}</h6>
                          <h6 className="font-semibold text-base leading-7 text-indigo-600">{products.price.toFixed(2)}</h6>
                        </div>
                      </div>
                      <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                        <div className="flex items-center h-full">
                          <button onClick={() => handleQuantityChange(products.productId, products.quantity - 1)} className="group rounded-l-full px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                              <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                  xmlns="https://www.w3.org/TR/SVG2/" width="22" height="22"
                                  viewBox="0 0 22 22" fill="none">
                                  <path d="M16.5 11H5.5" stroke="currentColor" strokeWidth="1.6"
                                      strokeiinecap="round" />
                                  <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                            strokeiinecap="round" />
                                  <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                      strokeiinecap="round" />
                              </svg>
                          </button>
                          <input type="text" className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                            value={products.quantity} readOnly/>
                          <button onClick={() => handleQuantityChange(products.productId, products.quantity + 1)} className="group rounded-r-full px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                viewBox="0 0 22 22" fill="none">
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="currentColor" strokeWidth="1.6"
                                    strokeiinecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                    strokeWidth="1.6" strokeiinecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                    strokeWidth="1.6" strokeiinecap="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                        <p className="font-bold text-lg leading-8 text-indigo-600 text-center">{products.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}   
              <div className="flex items-center justify-end mt-8">
                <button className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 font-semibold text-lg leading-8 text-indigo-600 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-indigo-300 hover:bg-indigo-50">
                  Add Coupon Code
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                    fill="none">
                    <path
                      d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                      stroke="#4F46E5" strokeWidth="1.6" strokeiinecap="round" />
                    </svg>
                </button>
              </div>
            </div>
            <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary
              </h2>
              <div className="mt-8">
                <div className="flex items-center justify-between pb-6">
                  <p className="font-normal text-lg leading-8 text-black">{selectedProducts.length} Items</p>
                  <p className="font-medium text-lg leading-8 text-black">Total: {totalPrice}$</p>
                </div>
                <form>
                  <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                    Shipping
                  </label>
                  <div className="flex pb-6">
                    <div className="relative w-full">
                      <div className=" absolute left-0 top-0 py-3 px-4">
                        <span className="font-normal text-base text-gray-300">Delivery Price</span>
                      </div>
                      <input type="text"
                      className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      placeholder="$5.00" readOnly/>
                    </div>
                  </div>
                  <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                    Promo Code
                  </label>
                  <div className="flex pb-4 w-full">
                    <div className="relative w-full ">
                      <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                      <input type="text"
                        className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                        placeholder="xxxx xxxx xxxx" />
                    </div>
                  </div>
                  <div className="flex items-center border-b border-gray-200">
                    <button className="rounded-full w-full bg-indigo-600 py-3 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                    Apply
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-8">
                    <p className="font-medium text-xl leading-8 text-black">{selectedProducts.length} Items</p>
                    <p className="font-semibold text-xl leading-8 text-indigo-600">Total: {totalPrice}$</p>
                  </div>
                  <button className="w-full text-center bg-indigo-600 rounded-full py-4 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">
                    Checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>                           
  )
}