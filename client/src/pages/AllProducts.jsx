import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Our <span className="text-pink-500">Bakery Delights</span>
        </h2>
        <p className="mt-2 text-gray-500 text-sm">Freshly baked, just for you</p>
        <div className="w-24 h-1 bg-pink-400 mx-auto mt-3 rounded-full" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 w-full max-w-screen-xl">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <div
              key={index}
              className="transition-transform transform hover:scale-105 hover:shadow-lg rounded-xl duration-300 ease-in-out"
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>

      {/* Fallback */}
      {filteredProducts.filter(p => p.inStock).length === 0 && (
        <div className="text-gray-500 text-sm mt-10">No matching products found.</div>
      )}
    </div>
  );
};

export default AllProducts;
