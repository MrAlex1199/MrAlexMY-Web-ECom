import React from "react";
import { Link } from 'react-router-dom';
import { products } from "../ProductsData/HomeProduct";

export default function home() {
  return (
    <div>
        <div className="bg-center bg-[url('../components/bg/bg2.jpg')] bg-gray-700 bg-blend-multiply">
          <div className="px-4 mx-auto max-w-screen-2xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Built for the Mission. Ready for Anything.</h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            With a focus on durability, functionality, and performance, our military clothing and equipment is designed to meet the demanding needs of today's warfighter.</p>
          </div>
        </div>
        <div className="flex flex-col -mt-10 ">
          <div className="card rounded-lg shadow-md mx-10 bg-white ">
            <div className="container mx-auto ">
              <div className="flex flex-wrap justify-center ">
                <div className="w-full md:w-1/2 lg:w-1/3 p-4 ">
                  <div className="card rounded-lg ">
                    <div className="px-4 py-4">
                      <p className="text-3xl text-center ">Massive Selection. Mission-Ready Gear.</p>
                      <p className="text-1xl text-center">100+ Ready Gear.</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                  <div className="card rounded-lg">
                    <div className="px-4 py-4">
                      <p className="text-3xl text-center">Your One-Stop Shop for Military Clothing and Equipment.</p>
                      <p className="text-1xl text-center">100+ Clothing and Equipment.</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                  <div className="card rounded-lg">
                    <div className="px-4 py-4">
                      <p className="text-3xl text-center">Everything You Need to Get the Job Done.</p>
                      <p className="text-1xl text-center">Everything You Need to Get the Job Done.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-2xl font-bold">
                <p>FEATURED PRODUCTS</p>
              </div>
              <div className="flex flex-wrap justify-center mx-auto">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {products.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`}  className="group">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

