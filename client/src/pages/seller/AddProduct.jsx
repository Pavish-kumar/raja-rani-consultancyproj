import React, { useState } from 'react';
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { axios } = useAppContext();

  const handleImageChange = (e, index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = e.target.files[0];
    setFiles(updatedFiles);
  };

  const removeImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        name,
        description: description.split('\n'),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append('productData', JSON.stringify(productData));
      files.forEach((file) => formData.append('images', file));

      const { data } = await axios.post('/api/product/add', formData);

      if (data.success) {
        toast.success(data.message);
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setOfferPrice('');
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll p-4 md:p-10">
      <form onSubmit={onSubmitHandler} className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-center">Add New Product</h2>

        {/* Product Images */}
        <div>
          <p className="text-sm font-medium mb-2">Product Images (Max 4)</p>
          <div className="flex flex-wrap gap-4">
            {Array(4)
              .fill('')
              .map((_, index) => (
                <label key={index} className="relative w-24 h-24 border rounded overflow-hidden cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <img
                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                    alt="upload"
                    className="w-full h-full object-cover"
                  />
                  {files[index] && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-0.5 text-xs font-bold text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-primary"
            placeholder="e.g. Chocolate Cake"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border rounded resize-none focus:outline-none focus:ring focus:border-primary"
            placeholder="Enter product details..."
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-primary"
            required
          >
            <option value="">Select Category</option>
            {categories.map((item, i) => (
              <option key={i} value={item.path}>{item.path}</option>
            ))}
          </select>
        </div>

        {/* Price & Offer Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium">Price</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-primary"
              placeholder="0"
              required
            />
          </div>
          <div>
            <label htmlFor="offerPrice" className="block text-sm font-medium">Offer Price</label>
            <input
              id="offerPrice"
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-primary"
              placeholder="0"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'ADD'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
