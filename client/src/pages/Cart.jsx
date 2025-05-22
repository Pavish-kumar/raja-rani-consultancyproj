import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    const tempArray = Object.keys(cartItems).map((key) => {
      const product = products.find((item) => item._id === key);
      return { ...product, quantity: cartItems[key] };
    });
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    if (!selectedAddress) {
      return toast.error("Please select an address");
    }

    try {
      const orderData = {
        userId: user._id,
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress._id,
      };

      const { data } = await axios.post(
        paymentOption === "COD" ? "/api/order/cod" : "/api/order/stripe",
        orderData
      );

      if (data.success) {
        if (paymentOption === "COD") {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          window.location.replace(data.url);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);

  useEffect(() => {
    if (user) getUserAddress();
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row gap-10 mt-16 px-4 md:px-12">
      {/* Cart Items */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Your <span className="text-pink-500">Cart</span>{" "}
          <span className="text-base text-gray-500">({getCartCount()} items)</span>
        </h1>

        <div className="space-y-4">
          {cartArray.map((product, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white shadow-md rounded-xl transition hover:shadow-lg"
            >
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold text-lg text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-500">Weight: {product.weight || "N/A"}</p>
                <div className="mt-2 flex justify-center sm:justify-start items-center gap-2">
                  <span className="text-sm">Qty:</span>
                  <select
                    className="border border-gray-300 rounded px-2 py-1"
                    value={cartItems[product._id]}
                    onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-lg font-bold text-gray-800">
                  {currency}{product.offerPrice * product.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="text-red-500 text-sm mt-2 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="w-full md:w-[360px] bg-white shadow-lg rounded-xl p-6 sticky top-20 h-fit">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
        <hr />

        {/* Address */}
        <div className="mt-4">
          <p className="font-medium text-gray-700 mb-1">Delivery Address</p>
          {selectedAddress ? (
            <p className="text-sm text-gray-600">
              {`${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`}
            </p>
          ) : (
            <p className="text-sm text-gray-500">No address selected</p>
          )}
          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-pink-500 underline mt-2 text-sm"
          >
            Change Address
          </button>

          {showAddress && (
            <div className="mt-3 border border-gray-200 rounded-md p-3 bg-gray-50 space-y-2 max-h-40 overflow-y-auto">
              {addresses.map((address, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded-md text-sm"
                >
                  {address.street}, {address.city}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="text-green-600 mt-1 cursor-pointer text-sm"
              >
                + Add New Address
              </p>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="mt-6 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{currency}{(getCartAmount() * 1.02).toFixed(2)}</span>
        </div>

        <button
          onClick={placeOrder}
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-md transition text-center font-semibold"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
