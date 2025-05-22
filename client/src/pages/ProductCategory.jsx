import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();
  const searchCategory = categories.find((item) => item.path.toLowerCase() === category);

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="mt-16 px-4 md:px-8">
      {/* Category Header */}
      {searchCategory ? (
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-pink-600 tracking-wide">
            {searchCategory.text}
          </h2>
          <div className="w-20 h-1 mx-auto mt-2 bg-pink-300 rounded-full"></div>
        </div>
      ) : (
        <p className="text-center text-2xl text-red-500">Category not found</p>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <img
            src="/assets/empty-category.svg"
            alt="No Products"
            className="w-40 mb-4 opacity-80"
          />
          <p className="text-2xl font-semibold text-gray-600">
            No treats in this category yet!
          </p>
          <p className="text-gray-500 mt-2">
            Try exploring other delightful options 🍰
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
