import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user, setUser, setShowUserLogin, navigate,
    setSearchQuery, searchQuery, getCartCount, axios
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout');
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="bg-[#f6f8fa] font-inter border-b border-gray-200 shadow-sm sticky top-0 z-50 transition-all">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-3">

        {/* Logo */}
        <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
          <img className="h-12" src={assets.logo} alt="logo" />
          <h1 className="text-palegreen text-2xl sm:text-3xl font-bold">Raja Rani Bakers</h1>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6 text-gray-700 text-[15px] font-medium">
          <NavLink to="/" className="hover:text-primary hover:underline">Home</NavLink>
          <NavLink to="/products" className="hover:text-primary hover:underline">All Product</NavLink>
          <NavLink to="/" className="hover:text-primary hover:underline">Contact</NavLink>

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-3 rounded-full bg-white">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1.5 text-sm w-40 bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </div>

          {/* Cart */}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>

          {/* Auth Button */}
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="px-5 py-2 text-sm bg-primary hover:bg-orange-500 text-white rounded-full shadow-sm transition"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img src={assets.profile_icon} className="w-9" alt="profile" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-32 rounded-md text-sm z-40">
                <li onClick={() => navigate("my-orders")} className="px-4 py-2 hover:bg-primary/10 cursor-pointer">My Orders</li>
                <li onClick={logout} className="px-4 py-2 hover:bg-primary/10 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex items-center gap-4">
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            <img src={open ? assets.cancel : assets.menu_icon} alt="menu" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="flex flex-col sm:hidden bg-white border-t shadow-md px-6 py-4 gap-3 text-sm font-medium text-gray-700">
          <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-primary">Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className="hover:text-primary">All Product</NavLink>
          {user && <NavLink to="/my-orders" onClick={() => setOpen(false)} className="hover:text-primary">My Orders</NavLink>}
          <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-primary">Contact</NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="mt-2 w-full bg-primary hover:bg-orange-500 text-white py-2 rounded-full text-sm transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="mt-2 w-full bg-primary hover:bg-orange-500 text-white py-2 rounded-full text-sm transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
