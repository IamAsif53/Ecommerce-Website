import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Products from "../Pages/Products";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import AdminLayout from "../Layouts/AdminLayout";

import Dashboard from "../Pages/Admin/Dashboard";
import AdminProducts from "../Pages/Admin/Products";
import AdminOrders from "../Pages/Admin/Orders";
import Analytics from "../Pages/Admin/Analytics";
import Settings from "../Pages/Admin/Settings";

import PrivateRoute from "../Routes/PrivateRoute";
import AdminRoute from "../Routes/AdminRoute";
import Checkout from "../Pages/Checkout";
import MyOrders from "../Pages/MyOrders";
import OrderSuccess from "../Pages/OrderSuccess";
import Profile from "../Pages/Profile";
import Contact from "../Pages/Contact";
import ContactMessages from "../Pages/Admin/ContactMessages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "contact-messages",
            element: <ContactMessages />,
          },
        ],
      },

      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "order-success",
        element: (
          <PrivateRoute>
            <OrderSuccess />
          </PrivateRoute>
        ),
      },

      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
