import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../Components/Sidebar";
import AdminTopbar from "../Components/AdminTopbar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0F1114] overflow-hidden">
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <div
        className={`
          fixed lg:static
          inset-y-0 left-0
          z-50
          transform
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Right */}

      <div className="flex flex-col flex-1 min-w-0">
        <AdminTopbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#0F1114] text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
