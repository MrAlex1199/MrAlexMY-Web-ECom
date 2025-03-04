import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/loader.css";

const productsPerPage = 8;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1); // Add currentPage state
  const [products, setProducts] = useState([]); // Change products state to an empty array
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/new-products");
        const data = await response.json();
        console.log("Home page products:", data); // Debug log
        setProducts(data);
        setLoading(false); // Set loading to false after products are fetched
      } catch (error) {
        console.error("Error fetching products: ", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div>
      <div className="bg-center bg-[url('../components/bg/bg2.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-2xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Built for the Mission. Ready for Anything.
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            With a focus on durability, functionality, and performance, our
            military clothing and equipment is designed to meet the demanding
            needs of today's warfighter.
          </p>
        </div>
      </div>
      <div className="flex flex-col -mt-10 ">
        <div className="card rounded-lg shadow-md mx-10 bg-white ">
          <div className="container mx-auto ">
            <div className="bg-white py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg/8 font-semibold text-gray-900">
                  Trusted by the world’s most innovative teams
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                  <img
                    alt="Transistor"
                    src="https://tailwindui.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
                    width={158}
                    height={48}
                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                  />
                  <img
                    alt="Reform"
                    src="https://tailwindui.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
                    width={158}
                    height={48}
                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                  />
                  <img
                    alt="Tuple"
                    src="https://tailwindui.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
                    width={158}
                    height={48}
                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                  />
                  <img
                    alt="SavvyCal"
                    src="https://tailwindui.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
                    width={158}
                    height={48}
                    className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                  />
                  <img
                    alt="Statamic"
                    src="https://tailwindui.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
                    width={158}
                    height={48}
                    className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                  />
                </div>
              </div>
            </div>
            <div className="text-center text-2xl font-bold">
              <p>FEATURED PRODUCTS</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                <div className="my-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {currentProducts.map((product) => {
                    const hasDiscount = product.discount > 0;
                    const originalPrice = product.price;
                    const discountedPrice = hasDiscount
                      ? originalPrice * (1 - product.discount / 100)
                      : originalPrice;

                    return (
                      <Link
                        key={product._id}
                        to={`/product/${product._id}?type=new-products`}
                        className="group"
                      >
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">
                          {product.name}
                        </h3>
                        <div className="mt-1 text-lg font-medium text-gray-900">
                          {hasDiscount ? (
                            <>
                              <span className="line-through text-gray-500 mr-2">
                                ${originalPrice.toFixed(2)}
                              </span>
                              <span className="text-red-600">
                                ${discountedPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                ({product.discount}% off)
                              </span>
                            </>
                          ) : (
                            <span>${originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
                {/* Pagination */}
                <nav className="my-8" aria-label="Pagination">
                  <ul className="flex justify-center">
                    {renderPaginationButtons()}
                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
