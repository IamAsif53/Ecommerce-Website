import { Outlet } from "react-router-dom";

import Sidebar from "../Components/Sidebar";
import AdminTopbar from "../Components/AdminTopbar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#0F1114]">
      {/* Sidebar */}

      <Sidebar />

      {/* Right Section */}

      <div className="flex-1 flex flex-col bg-[#0F1114]">
        {/* Topbar */}

        <AdminTopbar />

        {/* Page Content */}

        <main className="flex-1 p-8 overflow-y-auto bg-[#0F1114] text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
