import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import productsData from "../ProductsData/productsdata.csv";

const productsPerPage = 8;

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Parse the CSV data
    Papa.parse(productsData, {
      download: true,
      header: true,
      complete: (result) => {
        setProducts(result.data);
      },
    });
  }, []);

  // Calculate the indexes for the current page's products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Set current page when a pagination button is clicked
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons based on total product pages
  const totalPages = Math.ceil(products.length / productsPerPage);
  const renderPaginationButtons = () =>
    Array.from({ length: totalPages }, (_, i) => (
      <li key={i}>
        <button
          onClick={() => paginate(i + 1)}
          className={`${
            i + 1 === currentPage ? "text-gray-900" : "text-gray-500"
          } inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium`}
        >
          {i + 1}
        </button>
      </li>
    ));

  return (
    <div className="card rounded-lg shadow-md mt-1 mx-10 bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Header */}
        <div className="text-center text-2xl p-10 font-bold">
          <p>ALL PRODUCTS</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
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

        {/* Pagination */}
        <nav className="mt-8" aria-label="Pagination">
          <ul className="flex justify-center">{renderPaginationButtons()}</ul>
        </nav>
      </div>
    </div>
  );
}

          
