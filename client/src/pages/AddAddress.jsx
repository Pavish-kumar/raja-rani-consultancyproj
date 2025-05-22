import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm transition-all"
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', { address });
      data.success ? (toast.success(data.message), navigate('/cart')) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) navigate('/cart');
  }, []);

  return (
    <div className="flex flex-col items-center px-4 mt-12 pb-20">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
        Add Your <span className="text-pink-500">Delivery Address</span>
      </h2>

      <div className="flex flex-col-reverse md:flex-row items-center w-full max-w-5xl gap-8">
        <div className="w-full bg-white shadow-xl rounded-2xl p-8">
          <form onSubmit={onSubmitHandler} className="space-y-5 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField name="firstName" type="text" placeholder="First Name" handleChange={handleChange} address={address} />
              <InputField name="lastName" type="text" placeholder="Last Name" handleChange={handleChange} address={address} />
            </div>
            <InputField name="email" type="email" placeholder="Email Address" handleChange={handleChange} address={address} />
            <InputField name="street" type="text" placeholder="Street Address" handleChange={handleChange} address={address} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField name="city" type="text" placeholder="City" handleChange={handleChange} address={address} />
              <InputField name="state" type="text" placeholder="State" handleChange={handleChange} address={address} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField name="zipcode" type="number" placeholder="Zip Code" handleChange={handleChange} address={address} />
              <InputField name="country" type="text" placeholder="Country" handleChange={handleChange} address={address} />
            </div>
            <InputField name="phone" type="text" placeholder="Phone Number" handleChange={handleChange} address={address} />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 rounded-xl font-semibold tracking-wide hover:opacity-90 shadow-md transition-all"
            >
              Save Address
            </button>
          </form>
        </div>

        <img
          src={assets.add_address_image}
          alt="Bakery delivery"
          className="w-64 md:w-80 object-cover rounded-xl shadow-md"
        />
      </div>
    </div>
  );
};

export default AddAddress;
