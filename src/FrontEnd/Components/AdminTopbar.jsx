import { useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";

function AdminTopbar({ setSidebarOpen }) {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-[#111214] border-b border-[#2A2F36] px-4 sm:px-6 lg:px-8 py-4 lg:py-5 flex items-center justify-between">
      {/* Left */}

      <div className="flex items-center gap-4">
        {/* Mobile Hamburger */}

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden w-10 h-10 rounded-xl bg-[#181B20] border border-[#2A2F36] flex items-center justify-center text-white hover:bg-[#EF4444] transition"
        >
          <FiMenu size={22} />
        </button>

        <div>
          <p className="text-[10px] sm:text-xs text-[#EF4444] font-semibold uppercase tracking-[3px]">
            Admin Dashboard
          </p>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1">
            Welcome back,
            <span className="text-[#EF4444] ml-2">{user?.name || "Admin"}</span>
            👋
          </h1>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notification */}

        <button className="relative hidden sm:flex w-11 h-11 rounded-xl bg-[#181B20] border border-[#2A2F36] items-center justify-center text-xl text-white hover:bg-[#EF4444] transition-all duration-300">
          🔔
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        {/* Avatar */}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#B91C1C] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-red-500/20">
            {user?.email?.charAt(0).toUpperCase()}
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-white">
              {user?.name || "Administrator"}
            </p>

            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;
