import React, { useState, useEffect } from 'react';


export default function Cart( { userId } ) {
const [selectedProducts, setSelectedProducts] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);

useEffect(() => {
  const fetchSelectedProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/cart/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch selected products');
      }
      const data = await response.json();
      setSelectedProducts(data.selectedProducts);

      const totalPrice = data.selectedProducts.reduce((acc, product) => acc + product.totalPrice, 0);
        setTotalPrice(totalPrice.toFixed(2));
    } catch (error) {
      console.error(error);
    }
  };

  fetchSelectedProducts();
}, [userId]);

return (
  <div>
    {/* Products map */}
    <div className="card rounded-lg shadow-md mt-5 mx-10 bg-white">
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
                  <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200">
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
                          <button className="group rounded-l-full px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                              <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                  xmlns="https://www.w3.org/TR/SVG2/" width="22" height="22"
                                  viewBox="0 0 22 22" fill="none">
                                  <path d="M16.5 11H5.5" stroke="currentColor" stroke-width="1.6"
                                      stroke-linecap="round" />
                                  <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                                            stroke-linecap="round" />
                                  <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                      stroke-linecap="round" />
                              </svg>
                          </button>
                          <input type="text" className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                            placeholder={products.quantity}/>
                          <button className="group rounded-r-full px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                viewBox="0 0 22 22" fill="none">
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="currentColor" stroke-width="1.6"
                                    stroke-linecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                    stroke-width="1.6" stroke-linecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                    stroke-width="1.6" stroke-linecap="round" />
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
                      stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" />
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
                        <span className="font-normal text-base text-gray-300">Second Delivery</span>
                      </div>
                      <input type="text"
                      className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      placeholder="$5.00"/>
                      <button id="dropdown-button" data-target="dropdown-delivery"
                      className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                      type="button">
                      <svg className="ml-2 my-auto" width="12" height="7" viewBox="0 0 12 7"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                      d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                      stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round">
                      </path>
                      </svg>
                      </button>
                      <div id="dropdown-delivery" aria-labelledby="dropdown-delivery"
                        className="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10 bg-white right-0">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                          <li>
                              <a href="/"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Shopping</a>
                          </li>
                          <li>
                              <a href="/"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Images</a>
                          </li>
                          <li>
                              <a href="/"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">News</a>
                          </li>
                          <li>
                              <a href="/"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Finance</a>
                          </li>
                        </ul>
                      </div>
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
                      <button id="dropdown-button" data-target="dropdown"
                        className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                        type="button"><svg className="ml-2 my-auto" width="12" height="7" viewBox="0 0 12 7"
                          fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                            stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round">
                          </path>
                        </svg>
                      </button>
                      <div id="dropdown"
                        className="absolute top-10 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdown-button">
                            <li>
                              <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Shopping</a>
                            </li>
                            <li>
                              <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Images</a>
                            </li>
                            <li>
                              <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">News</a>
                            </li>
                            <li>
                              <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Finance</a>
                            </li>
                          </ul>
                      </div>
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