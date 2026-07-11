import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { SettingsContext } from "../Context/SettingsContext";
import { ChatContext } from "../Context/ChatContext";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { refreshChat } = useContext(ChatContext);
  const { cartItems } = useContext(CartContext);
  const { settings } = useContext(SettingsContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-[#111214]/95 backdrop-blur-xl border-b border-[#2A2F36] shadow-lg">
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#B91C1C] flex items-center justify-center shadow-lg shadow-red-500/30 transition-transform duration-300 group-hover:rotate-6">
              <span className="text-white font-bold text-lg">T</span>
            </div>

            <div>
              <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight">
                <span className="text-white">
                  {settings?.storeName || "Tech IT"}
                </span>
              </h1>

              <p className="hidden md:block text-[11px] text-gray-200 -mt-1 tracking-widest uppercase">
                Premium Store
              </p>
            </div>
          </Link>

          {/* Navigation */}

          <div className="hidden md:flex items-center gap-2 bg-[#181B20] rounded-xl p-2 border border-[#2A2F36]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 lg:px-5 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#22262D] text-[#EF4444] border-b-2 border-[#EF4444]"
                    : "text-gray-300 hover:bg-[#22262D] hover:text-[#EF4444]"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-3 lg:px-5 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#22262D] text-[#EF4444] border-b-2 border-[#EF4444]"
                    : "text-gray-300 hover:bg-[#22262D] hover:text-[#EF4444]"
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 lg:px-5 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#22262D] text-[#EF4444] border-b-2 border-[#EF4444]"
                    : "text-gray-300 hover:bg-[#22262D] hover:text-[#EF4444]"
                }`
              }
            >
              Contact
            </NavLink>
            {user && (
              <NavLink
                to="/my-orders"
                className={({ isActive }) =>
                  `px-3 lg:px-5 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#22262D] text-[#EF4444] border-b-2 border-[#EF4444]"
                      : "text-gray-300 hover:bg-[#22262D] hover:text-[#EF4444]"
                  }`
                }
              >
                My Orders
              </NavLink>
            )}
          </div>
          {/* Right Side */}

          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#181B20] border border-[#2A2F36] text-gray-300 flex items-center justify-center transition-all duration-300 hover:bg-[#EF4444] hover:text-white hover:border-[#EF4444]">
                <FiShoppingCart className="text-lg md:text-xl md:text-2xl" />
              </div>

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#EF4444] text-white text-xs font-bold min-w-[22px] h-[22px] rounded-full flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden w-10 h-10 rounded-xl bg-[#181B20] border border-[#2A2F36] flex items-center justify-center text-white"
            >
              {mobileMenu ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                {/* Profile */}
                <Link to="/profile" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden bg-[#181B20] border-2 border-[#EF4444] flex items-center justify-center transition-all duration-300 group-hover:border-[#DC2626]">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="hidden lg:block">
                    <p className="font-semibold text-white group-hover:text-[#EF4444] transition-colors">
                      {user?.name}
                    </p>

                    <p className="text-sm text-gray-400">View Profile</p>
                  </div>
                </Link>

                {/* Admin */}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="px-4 lg:px-5 py-2 rounded-xl bg-[#181B20] border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all duration-300 whitespace-nowrap"
                  >
                    Admin Panel
                  </Link>
                )}

                {/* Logout */}
                <button
                  onClick={() => {
                    logout();
                    refreshChat();
                  }}
                  className="px-4 lg:px-5 py-2 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-medium transition-all duration-300 shadow-lg shadow-red-500/20 whitespace-nowrap"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-[#EF4444] transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-medium transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ================= Mobile Menu ================= */}
      {mobileMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#111214]/98 backdrop-blur-2xl border-t border-[#2A2F36] shadow-2xl animate-in slide-in-from-top duration-300">
          {/* User Info */}
          {user && (
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[#2A2F36]">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#EF4444] bg-[#181B20] flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation */}

          <div className="py-2">
            <NavLink
              to="/"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `flex items-center px-6 py-4 transition ${
                  isActive
                    ? "bg-[#EF4444]/10 text-[#EF4444] border-l-4 border-[#EF4444]"
                    : "text-gray-300 hover:bg-[#181B20]"
                }`
              }
            >
              🏠
              <span className="ml-4 font-medium">Home</span>
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `flex items-center px-6 py-4 transition ${
                  isActive
                    ? "bg-[#EF4444]/10 text-[#EF4444] border-l-4 border-[#EF4444]"
                    : "text-gray-300 hover:bg-[#181B20]"
                }`
              }
            >
              🛍️
              <span className="ml-4 font-medium">Products</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `flex items-center px-6 py-4 transition ${
                  isActive
                    ? "bg-[#EF4444]/10 text-[#EF4444] border-l-4 border-[#EF4444]"
                    : "text-gray-300 hover:bg-[#181B20]"
                }`
              }
            >
              📞
              <span className="ml-4 font-medium">Contact</span>
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-4 transition ${
                      isActive
                        ? "bg-[#EF4444]/10 text-[#EF4444] border-l-4 border-[#EF4444]"
                        : "text-gray-300 hover:bg-[#181B20]"
                    }`
                  }
                >
                  👤
                  <span className="ml-4 font-medium">Profile</span>
                </NavLink>

                <NavLink
                  to="/my-orders"
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-4 transition ${
                      isActive
                        ? "bg-[#EF4444]/10 text-[#EF4444] border-l-4 border-[#EF4444]"
                        : "text-gray-300 hover:bg-[#181B20]"
                    }`
                  }
                >
                  📦
                  <span className="ml-4 font-medium">My Orders</span>
                </NavLink>

                {user.role === "admin" && (
                  <NavLink
                    to="/admin"
                    onClick={() => setMobileMenu(false)}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-4 transition ${
                        isActive
                          ? "bg-[#EF4444]/10 text-[#EF4444] border-l-4 border-[#EF4444]"
                          : "text-gray-300 hover:bg-[#181B20]"
                      }`
                    }
                  >
                    ⚙️
                    <span className="ml-4 font-medium">Admin Panel</span>
                  </NavLink>
                )}
              </>
            )}

            {!user && (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center px-6 py-4 text-gray-300 hover:bg-[#181B20] transition"
                >
                  🔑
                  <span className="ml-4 font-medium">Login</span>
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center px-6 py-4 text-gray-300 hover:bg-[#181B20] transition"
                >
                  ✨<span className="ml-4 font-medium">Register</span>
                </NavLink>
              </>
            )}
          </div>

          {/* Bottom Button */}

          {user && (
            <div className="p-5 border-t border-[#2A2F36]">
              <button
                onClick={() => {
                  logout();
                  refreshChat();
                  setMobileMenu(false);
                }}
                className="w-full py-3 rounded-xl bg-[#EF4444] hover:bg-red-600 transition text-white font-semibold shadow-lg shadow-red-500/20"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
