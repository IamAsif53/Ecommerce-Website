import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ChatWidget from "../Components/Chatbot/ChatWidget";
function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0F1114] text-white">
      <Navbar />

      <main className="w-full">
        <Outlet />
      </main>
      <ChatWidget />
    </div>
  );
}

export default MainLayout;
