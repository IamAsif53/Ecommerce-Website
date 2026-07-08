import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Sidebar() {
  const { user } = useContext(AuthContext);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "🏠",
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: "📦",
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: "🛒",
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: "📊",
    },
    {
      name: "Contact",
      path: "/admin/contact-messages",
      icon: "📩",
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-[#111214] border-r border-[#2A2F36] text-white flex flex-col">
      {/* Logo */}

      {/* Navigation */}

      <div className="px-7 pt-7">
        <p className="text-xs uppercase tracking-[3px] text-gray-500 mb-4">
          Navigation
        </p>
      </div>

      <nav className="flex-1 px-5">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-[#EF4444] text-white shadow-lg shadow-red-500/20"
                      : "text-gray-300 hover:bg-[#181B20] hover:text-[#EF4444]"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>

                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Card */}

      <div className="border-t border-[#2A2F36] p-5">
        <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#B91C1C] flex items-center justify-center text-lg font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <div className="overflow-hidden">
              <h3 className="font-semibold text-white truncate">
                {user?.name || "Administrator"}
              </h3>

              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="mt-4 border-t border-[#2A2F36] pt-3">
            <p className="text-xs text-gray-500">Logged in as</p>

            <p className="text-sm font-semibold text-[#EF4444]">
              {user?.role === "admin" ? "Administrator" : "User"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
