import React from 'react';
import { categories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16 font-inter">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="group cursor-pointer p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: category.bgColor }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="w-20 md:w-24 group-hover:scale-110 transition-transform duration-200"
            />
            <p className="mt-3 text-sm md:text-base font-medium text-center text-gray-900 group-hover:text-primary">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
