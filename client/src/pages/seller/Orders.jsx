import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelOrderByAdmin = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmed) return;

    try {
      const { data } = await axios.put(`/api/order/cancel/seller/${orderId}`);
      if (data.success) {
        toast.success("Order cancelled successfully!");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to cancel order.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-xl font-semibold text-center">Orders List</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-5 justify-between items-start md:items-center p-5 border border-gray-300 rounded-md shadow-sm max-w-5xl mx-auto"
            >
              {/* Product Summary */}
              <div className="flex gap-4 flex-wrap items-start max-w-md">
                <img
                  src={assets.logo}
                  alt="Product"
                  className="w-14 h-14 object-cover rounded-md"
                />
                <div>
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm font-medium">
                      {item.product.name} <span className="text-primary">× {item.quantity}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Address Info */}
              <div className="text-sm text-gray-600">
                <p className="font-medium text-black">{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}, {order.address.city}</p>
                <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                <p>{order.address.phone}</p>
              </div>

              {/* Price */}
              <p className="text-lg font-semibold text-primary">
                {currency}{order.amount}
              </p>

              {/* Payment Info */}
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Method:</strong> {order.paymentType}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Payment:</strong> {order.isPaid ? "Paid" : "Pending"}</p>
                <p><strong>Status:</strong> {order.status}</p>

                {(!order.isPaid && order.status !== "Cancelled") && (
                  <button
                    onClick={() => cancelOrderByAdmin(order._id)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
