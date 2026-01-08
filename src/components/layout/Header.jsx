import React, { useContext, useState } from "react";
import { assets } from "../../assets/images/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../../store/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, search, setSearch } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className="bg-[#2874f0] font-sans sticky top-0 z-50">
      <div className="max-w-[1248px] mx-auto flex items-center justify-between gap-4 py-3 px-4">

        <div className="flex items-center gap-10 flex-1">
          {/* Logo */}
          <Link to="/Home" className="flex flex-col items-center">
            <img src={assets.logo} className="w-16 md:w-20 brightness-200" alt="Logo" />
            <p className="text-[11px] text-white italic -mt-1 flex items-center gap-0.5">Explore <span className="text-yellow-400 font-bold">Plus</span><img src={assets.star_icon} className="w-2.5" alt="" /></p>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-[560px] hidden sm:flex relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-sm text-sm focus:outline-none text-gray-700 shadow-sm placeholder:text-gray-400"
              type="text"
              placeholder="Search for products, brands and more"
            />
            <img className="absolute right-3 top-2.5 w-4 cursor-pointer" src={assets.search_icon} alt="Search" />
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Login Button */}
          {!token ? (
            <button onClick={() => navigate('/login')} className="bg-white text-[#2874f0] px-10 py-1.5 font-bold rounded-sm text-sm hover:bg-gray-100 hidden sm:block">Login</button>
          ) : (
            <div className="group relative cursor-pointer hidden sm:block">
              <p className="text-white font-bold flex items-center gap-1">My Account <img src={assets.dropdown_icon} className="w-2.5 rotate-90 brightness-200" alt="" /></p>
              <div className="group-hover:block hidden absolute left-0 pt-2 w-48 z-50">
                <div className="flex flex-col bg-white text-gray-700 rounded-sm shadow-xl overflow-hidden mt-2">
                  <p onClick={() => navigate('/orders')} className="px-4 py-3 hover:bg-gray-50 border-b flex items-center gap-2 text-sm"><img src={assets.bag_icon} className="w-4" alt="" /> Orders</p>
                  <p onClick={logout} className="px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm"><img src={assets.cross_icon} className="w-4" alt="" /> Logout</p>
                </div>
              </div>
            </div>
          )}

          {/* Other Links */}
          <div className="text-white font-bold text-sm hidden lg:block cursor-pointer">Become a Seller</div>

          <div className="group relative cursor-pointer text-white font-bold text-sm hidden lg:block">
            <p className="flex items-center gap-1">More <img src={assets.dropdown_icon} className="w-2.5 rotate-90 brightness-200" alt="" /></p>
          </div>

          <Link to="/cart" className="flex items-center gap-2 text-white font-bold">
            <div className="relative">
              <img src={assets.cart_icon} className="w-6 brightness-200" alt="Cart" />
              {getCartCount() > 0 && <p className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-600 rounded-full text-[10px] flex items-center justify-center border border-white">{getCartCount()}</p>}
            </div>
            <span className="hidden sm:block">Cart</span>
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-6 cursor-pointer sm:hidden brightness-200"
            alt="Menu"
          />
        </div>

      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 z-50 ${visible ? "w-[70%]" : "w-0"} overflow-hidden shadow-2xl`}>
        <div className="bg-[#2874f0] p-4 text-white flex justify-between items-center">
          <p className="font-semibold flex items-center gap-2"><img src={assets.profile_icon} className="w-6 invert" alt="" /> Login & Signup</p>
          <img onClick={() => setVisible(false)} src={assets.cross_icon} className="w-6 cursor-pointer invert opacity-60" alt="Close" />
        </div>
        <div className="flex flex-col text-gray-700">
          <NavLink to="/Home" onClick={() => setVisible(false)} className="p-4 border-b flex items-center gap-3"><img src={assets.logo} className="w-5 grayscale" alt="" /> Home</NavLink>
          <NavLink to="/Collection" onClick={() => setVisible(false)} className="p-4 border-b flex items-center gap-3"><img src={assets.menu_icon} className="w-5 grayscale" alt="" /> Super Coin Zone</NavLink>
          <NavLink to="/Orders" onClick={() => setVisible(false)} className="p-4 border-b flex items-center gap-3"><img src={assets.bag_icon} className="w-5 grayscale" alt="" /> My Orders</NavLink>
          <NavLink to="/Contact" onClick={() => setVisible(false)} className="p-4 border-b flex items-center gap-3"><img src={assets.support_img} className="w-5 grayscale" alt="" /> Contact Us</NavLink>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
