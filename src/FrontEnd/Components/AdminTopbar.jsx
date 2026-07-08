import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function AdminTopbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-[#111214] border-b border-[#2A2F36] px-8 py-5 flex items-center justify-between">
      {/* Left */}

      <div>
        <p className="text-sm text-[#EF4444] font-semibold uppercase tracking-widest">
          Admin Dashboard
        </p>

        <h1 className="text-3xl font-bold text-white mt-2">
          Welcome back,
          <span className="text-[#EF4444] ml-2">{user?.name || "Admin"}</span>
          👋
        </h1>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">
        {/* Notification */}

        <button className="relative w-11 h-11 rounded-xl bg-[#181B20] border border-[#2A2F36] flex items-center justify-center text-xl text-white hover:bg-[#EF4444] transition-all duration-300">
          🔔
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        {/* Admin Avatar */}

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#B91C1C] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-red-500/20">
            {user?.email?.charAt(0).toUpperCase()}
          </div>

          <div>
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
