import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user');
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const { data } = await axios.put(`/api/order/cancel/user/${orderId}`, {
        userId: user._id,
      });
      if (data.success) {
        toast.success("Order Cancelled");
        fetchMyOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16 px-4 md:px-8">
      <h2 className="text-3xl font-bold mb-10 text-pink-600 text-center">My Orders</h2>

      {myOrders.length > 0 ? (
        myOrders.map((order, index) => (
          <div key={index} className="bg-white border border-pink-100 shadow-md rounded-3xl p-6 mb-8">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="text-sm text-gray-600"><span className="font-semibold">Order ID:</span> {order._id}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">Payment:</span> {order.paymentType}</p>
              <p className="font-semibold text-green-600 text-sm">Total: {currency}{order.amount}</p>
            </div>

            {/* Items */}
            <div className="divide-y divide-pink-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-4">
                  <img src={item.product.image[0]} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">Category: {item.product.category}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">Amount:</p>
                    <p className="text-pink-600">{currency}{item.product.offerPrice * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 text-sm">
              <p className={`font-semibold ${order.status === "Cancelled" ? "text-red-500" : "text-green-600"}`}>
                Status: {order.status}
              </p>
              <p className="text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Cancel Button */}
            {!order.isPaid && order.status !== "Cancelled" && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="px-4 py-2 bg-red-400 text-white rounded-full hover:bg-red-500 transition"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center mt-20 text-gray-400">
          <p className="text-xl">No Orders Found</p>
          <p className="mt-2 text-sm">You haven't placed any orders yet. Go enjoy some sweets!</p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
