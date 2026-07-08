import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";

import { getUserOrders } from "../Services/orderService";

function MyOrders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold">Loading Orders...</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#111214] flex items-center justify-center px-6">
        <div className="max-w-2xl w-full bg-[#181B20] border border-[#2A2F36] rounded-[32px] shadow-2xl p-12 text-center">
          <div className="w-28 h-28 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-6xl">
            📦
          </div>

          <h1 className="text-5xl font-extrabold text-white mt-8">
            No Orders Yet
          </h1>

          <p className="text-gray-400 text-lg mt-5 max-w-md mx-auto leading-8">
            You haven't placed any orders yet. Browse our premium collection and
            make your first purchase today.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white font-semibold text-lg hover:shadow-xl hover:shadow-red-500/20 hover:scale-[1.02] transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111214] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <span className="uppercase tracking-[4px] text-[#EF4444] font-semibold text-sm">
            Order History
          </span>

          <h1 className="text-5xl font-extrabold text-white mt-3">My Orders</h1>

          <p className="text-gray-400 mt-4">
            Track and manage all your previous orders.
          </p>
        </div>

        <div className="space-y-8">
          {orders.map((order) => {
            const orderNumber = "ORD-" + order._id.slice(-6).toUpperCase();

            return (
              <div
                key={order._id}
                className="bg-[#181B20] border border-[#2A2F36] rounded-3xl shadow-xl overflow-hidden"
              >
                {/* Header */}

                <div className="bg-[#111214] border-b border-[#2A2F36] p-6 flex flex-col md:flex-row justify-between gap-5">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {orderNumber}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      Ordered on{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-500/20 text-green-400"
                          : order.status === "Processing"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Customer */}

                <div className="grid md:grid-cols-2 gap-6 p-6 border-b border-[#2A2F36]">
                  <div>
                    <h3 className="font-bold mb-3 text-lg text-white">
                      Customer Details
                    </h3>

                    <p className="text-gray-300">
                      <strong className="text-white">Name:</strong>{" "}
                      {order.customerName}
                    </p>

                    <p className="text-gray-300">
                      <strong className="text-white">Email:</strong>{" "}
                      {user.email}
                    </p>

                    <p className="text-gray-300">
                      <strong className="text-white">Phone:</strong>{" "}
                      {order.phone}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3 text-lg text-white">
                      Shipping Address
                    </h3>

                    <p className="text-gray-300">{order.address}</p>

                    <p className="text-gray-300">
                      {order.city}, {order.postalCode}
                    </p>

                    <p className="text-gray-300">{order.country}</p>

                    <p className="mt-4 text-gray-300">
                      <strong className="text-white">Payment:</strong>{" "}
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Products */}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-5">
                    Ordered Products
                  </h3>

                  <div className="space-y-5">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row gap-5 bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 hover:border-[#EF4444] transition-all duration-300"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-xl border border-[#2A2F36]"
                        />

                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white">
                            {item.name}
                          </h4>

                          <div className="grid sm:grid-cols-3 gap-5 mt-5">
                            <div>
                              <p className="text-sm text-gray-400">Price</p>

                              <p className="font-semibold text-white mt-1">
                                ${item.price}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-400">Quantity</p>

                              <p className="font-semibold text-white mt-1">
                                {item.quantity}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-400">Subtotal</p>

                              <p className="font-semibold text-[#EF4444] mt-1">
                                ${item.price * item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}

                <div className="bg-[#111214] border-t border-[#2A2F36] p-6 flex flex-col md:flex-row justify-between items-center gap-5">
                  <div>
                    <p className="text-gray-300">
                      Thank you for shopping with Techit ❤️
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      Estimated Delivery: 3 - 5 Business Days
                    </p>
                  </div>

                  <div className="text-right">
                    <h3 className="text-3xl font-bold text-[#EF4444]">
                      ${order.totalPrice}
                    </h3>

                    <p className="text-gray-400">Total Paid</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
