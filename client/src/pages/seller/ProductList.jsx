import React from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post('/api/product/stock', { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-xl font-semibold text-center md:text-left">All Products</h2>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden max-w-5xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center text-gray-500 p-6">No products available.</div>
          ) : (
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Selling Price</th>
                  <th className="px-4 py-3 font-medium text-center">In Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <span className="truncate">{product.name}</span>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{currency}{product.offerPrice}</td>
                    <td className="px-4 py-3 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.inStock}
                          onChange={() => toggleStock(product._id, !product.inStock)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
