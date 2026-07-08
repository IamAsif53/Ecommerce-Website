import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./FrontEnd/Routes/Approutes";

import AuthProvider from "./FrontEnd/Context/AuthContext";
import CartProvider from "./FrontEnd/Context/CartContext";
import SettingsProvider from "./FrontEnd/Context/SettingsContext";
import { ChatProvider } from "./FrontEnd/Context/ChatContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <CartProvider>
          <ChatProvider>
            <Toaster position="top-right" />
            <RouterProvider router={router} />
          </ChatProvider>
        </CartProvider>
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>,
);
