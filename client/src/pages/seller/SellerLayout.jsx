import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/seller/logout');
      if (data.success) {
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-3 bg-white shadow-sm">
        <Link to='/' className="flex items-center gap-2">
          <img className="h-12 md:h-14" src={assets.logo} alt="Logo" />
          <h1 className="text-palegreen text-2xl md:text-3xl font-bold whitespace-nowrap">
            Raja Rani Bakers
          </h1>
        </Link>
        <div className="flex items-center gap-5 text-sm md:text-base text-gray-600">
          <p className="hidden sm:block">Hi! Admin</p>
          <button
            onClick={logout}
            className="border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="bg-white border-r border-gray-200 h-full md:w-64 w-20 py-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 transition text-gray-700 hover:bg-gray-100 ${
                  isActive
                    ? "bg-primary/10 border-r-4 border-primary text-primary font-semibold"
                    : "border-transparent"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <span className="hidden md:inline">{item.name}</span>
            </NavLink>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
