import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return product && (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[230px] cursor-pointer"
    >
      <div className="flex justify-center items-center px-3 pt-3">
        <img
          src={product.image[0]}
          alt={product.name}
          className="transition-transform duration-200 group-hover:scale-105 h-36 object-contain"
        />
      </div>
      <div className="p-3 text-gray-700 text-sm space-y-1">
        <p className="text-xs uppercase tracking-wide text-gray-400">{product.category}</p>
        <p className="font-semibold truncate text-base text-gray-800">{product.name}</p>
        <div className="flex items-center gap-1 text-xs">
          {Array(5).fill('').map((_, i) => (
            <img
              key={i}
              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
              alt="star"
              className="w-4"
            />
          ))}
          <span className="text-gray-400">(4)</span>
        </div>
        <div className="flex justify-between items-end pt-2">
          <p className="text-primary font-semibold text-base">
            {currency}{product.offerPrice}{" "}
            <span className="text-xs text-gray-400 line-through">{currency}{product.price}</span>
          </p>
          <div onClick={(e) => e.stopPropagation()} className="text-primary">
            {!cartItems[product._id] ? (
              <button
                onClick={() => addToCart(product._id)}
                className="flex items-center gap-1 bg-primary/10 border border-primary/40 text-xs px-3 py-1 rounded hover:bg-primary/20"
              >
                <img src={assets.cart_icon} alt="cart" className="w-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center bg-primary/20 rounded px-2 py-1 text-xs gap-2">
                <button onClick={() => removeFromCart(product._id)} className="px-2 font-medium">−</button>
                <span className="w-4 text-center">{cartItems[product._id]}</span>
                <button onClick={() => addToCart(product._id)} className="px-2 font-medium">+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
