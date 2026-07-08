import { useEffect, useState } from "react";

import { getDashboardData } from "../../Services/dashboardService";

import DashboardStats from "../../Components/DashboardStats";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardData();

      setDashboardData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">Loading Dashboard...</h2>
      </div>
    );
  }

  const { stats, recentOrders, lowStockProducts, topSellingProducts } =
    dashboardData;

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      <DashboardStats stats={stats} />

      {/* Recent Orders */}

      <div className="mt-10 bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Recent Orders</h2>

          <span className="px-4 py-2 rounded-full bg-[#111214] border border-[#2A2F36] text-[#EF4444] font-semibold">
            Latest {Math.min(5, recentOrders.length)} Orders
          </span>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold text-white">No Orders Yet</h3>

            <p className="text-gray-400 mt-2">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-[#EF4444] transition-all duration-300"
              >
                <div>
                  <h3 className="font-bold text-lg text-white">
                    {order.customerName}
                  </h3>

                  <p className="text-gray-400">{order.user}</p>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-gray-400">Total</p>

                  <h3 className="font-bold text-[#EF4444] text-xl">
                    ${order.totalPrice}
                  </h3>
                </div>

                <div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
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
            ))}
          </div>
        )}
      </div>

      {/* Low Stock Products */}

      <div className="mt-10 bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6">
          Low Stock Products
        </h2>

        {lowStockProducts.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold text-green-400">
              🎉 All products have sufficient stock.
            </h3>
          </div>
        ) : (
          <div className="space-y-4">
            {lowStockProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-5 bg-[#111214] border border-[#2A2F36] rounded-2xl p-4 hover:border-[#EF4444] transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover border border-[#2A2F36]"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">
                    {product.name}
                  </h3>

                  <p className="text-gray-400">{product.category}</p>
                </div>

                <div>
                  <span
                    className={`font-bold ${
                      Number(product.stock) === 0
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {Number(product.stock) === 0
                      ? "Out of Stock"
                      : `${product.stock} Left`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
