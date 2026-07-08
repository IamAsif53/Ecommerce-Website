import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

import { getOrders, updateOrderStatus } from "../../Services/orderService";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const fetchOrders = async () => {
    try {
      const data = await getOrders();

      setOrders(data.orders);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);

      toast.success("Order Updated");

      fetchOrders();
    } catch (error) {
      console.log(error);

      toast.error("Failed to update order");
    }
  };
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const filteredOrders = orders.filter((order) => {
    const keyword = search.trim().toLowerCase();

    const customerName = (order.customerName || "").toLowerCase();
    const email = (order.user || "").toLowerCase();
    const orderId = (order._id || "").toLowerCase();

    return (
      customerName.includes(keyword) ||
      email.includes(keyword) ||
      orderId.includes(keyword)
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">
          Order <span className="text-[#EF4444]">Management</span>
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          View and manage customer orders.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
          {/* Total */}

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl shadow-md p-6 border-l-4 border-blue-600">
            <p className="text-gray-400 text-sm">Total Orders</p>

            <h2 className="text-4xl font-bold mt-3">{totalOrders}</h2>
          </div>

          {/* Pending */}

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl shadow-md p-6 border-l-4 border-yellow-500">
            <p className="text-gray-400 text-sm">Pending</p>

            <h2 className="text-4xl font-bold mt-3 text-yellow-400">
              {pendingOrders}
            </h2>
          </div>

          {/* Processing */}

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl shadow-md p-6 border-l-4 border-[#EF4444]">
            <p className="text-gray-400 text-sm">Processing</p>

            <h2 className="text-4xl font-bold mt-3 text-blue-400">
              {processingOrders}
            </h2>
          </div>

          {/* Delivered */}

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl shadow-md p-6 border-l-4 border-green-500">
            <p className="text-gray-400 text-sm">Delivered</p>

            <h2 className="text-4xl font-bold mt-3 text-green-400">
              {deliveredOrders}
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl shadow-lg p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-8">
          <div className="relative w-full lg:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#111214] border border-[#2A2F36] rounded-xl text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-300"
            />
          </div>

          <div className="text-gray-400 font-medium">
            Total Orders :
            <span className="ml-2 font-bold text-[#EF4444]">
              {filteredOrders.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#111214] border-b border-[#2A2F36] text-white">
                <th className="px-6 py-4 text-left">Order ID</th>

                <th className="px-6 py-4 text-left">Customer</th>

                <th className="px-6 py-4 text-left">Date</th>

                <th className="px-6 py-4 text-left">Total</th>

                <th className="px-6 py-4 text-left">Payment</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-[#2A2F36] hover:bg-[#22262D] transition-all duration-300"
                >
                  <td className="px-6 py-5 font-semibold text-white">
                    ORD-{order._id.slice(-6).toUpperCase()}
                  </td>

                  <td className="px-6 py-5">
                    <div className="font-semibold text-white">
                      {order.customerName}
                    </div>

                    <div className="text-sm text-gray-400">{order.user}</div>
                  </td>

                  <td className="px-6 py-5 text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5 font-bold text-[#EF4444]">
                    ${order.totalPrice}
                  </td>

                  <td className="px-6 py-5 text-gray-300">
                    {order.paymentMethod}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : order.status === "Processing"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-4 py-2 rounded-xl transition-all duration-300"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}

            <div className="flex justify-between items-center border-b border-[#2A2F36] p-6">
              <div>
                <h2 className="text-3xl font-bold text-white">Order Details</h2>

                <p className="text-[#EF4444] mt-2 font-medium">
                  ORD-{selectedOrder._id.slice(-6).toUpperCase()}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-3xl text-gray-400 hover:text-[#EF4444] transition"
              >
                ×
              </button>
            </div>

            {/* Body */}

            <div className="p-6 grid lg:grid-cols-2 gap-8">
              {/* Customer */}

              <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-5">
                  👤 Customer Information
                </h3>

                <div className="space-y-4">
                  <p className="text-gray-300">
                    <span className="block text-gray-500 text-sm mb-1">
                      Name
                    </span>
                    {selectedOrder.customerName}
                  </p>

                  <p className="text-gray-300">
                    <span className="block text-gray-500 text-sm mb-1">
                      Email
                    </span>
                    {selectedOrder.user}
                  </p>

                  <p className="text-gray-300">
                    <span className="block text-gray-500 text-sm mb-1">
                      Phone
                    </span>
                    {selectedOrder.phone}
                  </p>
                </div>
              </div>

              {/* Shipping */}

              <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-5">
                  📍 Shipping Address
                </h3>

                <div className="space-y-3 text-gray-300">
                  <p>{selectedOrder.address}</p>

                  <p>{selectedOrder.city}</p>

                  <p>{selectedOrder.postalCode}</p>

                  <p>{selectedOrder.country}</p>
                </div>
              </div>
            </div>

            {/* Products */}

            <div className="px-6">
              <h3 className="text-2xl font-bold text-white mb-5">
                Ordered Products
              </h3>

              <div className="space-y-4">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#111214] border border-[#2A2F36] rounded-2xl p-4 hover:border-[#EF4444] transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#2A2F36]"
                      />

                      <div>
                        <h4 className="font-semibold text-white">
                          {item.name}
                        </h4>

                        <p className="text-sm text-gray-400">
                          ${item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-xl font-bold text-[#EF4444]">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}

            <div className="border-t border-[#2A2F36] mt-8 p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-gray-400">Payment Method</p>

                <h3 className="text-xl font-semibold text-white">
                  {selectedOrder.paymentMethod}
                </h3>
              </div>

              <div>
                <p className="text-gray-400">Order Total</p>

                <h2 className="text-4xl font-bold text-[#EF4444]">
                  ${selectedOrder.totalPrice}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      status: e.target.value,
                    })
                  }
                  className="bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white focus:border-[#EF4444] outline-none transition"
                >
                  <option className="bg-[#111214]">Pending</option>
                  <option className="bg-[#111214]">Processing</option>
                  <option className="bg-[#111214]">Delivered</option>
                </select>

                <button
                  onClick={async () => {
                    await handleStatusChange(
                      selectedOrder._id,
                      selectedOrder.status,
                    );

                    setSelectedOrder(null);
                  }}
                  className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
