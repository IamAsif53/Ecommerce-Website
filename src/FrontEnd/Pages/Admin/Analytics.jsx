import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/analyticsService";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">Loading Analytics...</h2>
      </div>
    );
  }

  const {
    stats,
    monthlyRevenue,
    monthlyOrders,
    categoryRevenue,
    topProducts,
    recentSales,
    lowStockProducts,
  } = analytics;

  const orderStatusData = [
    {
      name: "Pending",
      value: stats.pendingOrders,
    },
    {
      name: "Processing",
      value: stats.processingOrders,
    },
    {
      name: "Delivered",
      value: stats.deliveredOrders,
    },
  ];

  const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];
  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      {" "}
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">
          Analytics <span className="text-[#EF4444]">Dashboard</span>
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Monitor revenue, sales performance and business insights.
        </p>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Revenue */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 hover:border-[#EF4444] hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
          <p className="text-gray-400 text-sm uppercase tracking-wide">
            Total Revenue
          </p>

          <h2 className="text-4xl font-bold text-[#EF4444] mt-3">
            ${stats.totalRevenue.toLocaleString()}
          </h2>

          <p className="text-sm text-green-400 mt-4">↑ Business Growth</p>
        </div>

        {/* Orders */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
          <p className="text-gray-400 text-sm uppercase tracking-wide">
            Total Orders
          </p>

          <h2 className="text-4xl font-bold text-blue-400 mt-3">
            {stats.totalOrders}
          </h2>

          <p className="text-sm text-blue-400 mt-4">Customer Purchases</p>
        </div>

        {/* Customers */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 hover:border-purple-400 hover:shadow-lg transition-all duration-300">
          <p className="text-gray-400 text-sm uppercase tracking-wide">
            Customers
          </p>

          <h2 className="text-4xl font-bold text-purple-400 mt-3">
            {stats.totalCustomers}
          </h2>

          <p className="text-sm text-purple-400 mt-4">Registered Users</p>
        </div>

        {/* Products */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 hover:border-orange-400 hover:shadow-lg transition-all duration-300">
          <p className="text-gray-400 text-sm uppercase tracking-wide">
            Products
          </p>

          <h2 className="text-4xl font-bold text-orange-400 mt-3">
            {stats.totalProducts}
          </h2>

          <p className="text-sm text-orange-400 mt-4">Available Inventory</p>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
        {/* Revenue Chart */}

        <div className="xl:col-span-2 bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Monthly Revenue</h2>

              <p className="text-gray-400">Revenue generated over the year</p>
            </div>

            <div className="bg-[#EF4444]/15 text-[#EF4444] px-4 py-2 rounded-xl font-semibold border border-[#EF4444]/30">
              ${stats.totalRevenue.toLocaleString()}
            </div>
          </div>

          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid stroke="#2A2F36" strokeDasharray="3 3" />

                <XAxis
                  dataKey="month"
                  stroke="#9CA3AF"
                  tick={{ fill: "#9CA3AF" }}
                />

                <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#181B20",
                    border: "1px solid #2A2F36",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#EF4444"
                  strokeWidth={4}
                  dot={{ r: 5, fill: "#EF4444" }}
                  activeDot={{ r: 8, fill: "#EF4444" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Order Status</h2>

          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={4}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#181B20",
                    border: "1px solid #2A2F36",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{
                    color: "#D1D5DB",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* ================= Second Analytics Row ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
        {/* Monthly Orders */}

        <div className="xl:col-span-2 bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Monthly Orders</h2>

              <p className="text-gray-400">Orders received this year</p>
            </div>
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyOrders}>
                <CartesianGrid stroke="#2A2F36" strokeDasharray="3 3" />

                <XAxis
                  dataKey="month"
                  stroke="#9CA3AF"
                  tick={{ fill: "#9CA3AF" }}
                />

                <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#181B20",
                    border: "1px solid #2A2F36",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Bar dataKey="orders" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue By Category */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Revenue By Category
          </h2>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryRevenue}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={90}
                  label
                >
                  {categoryRevenue.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#181B20",
                    border: "1px solid #2A2F36",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    color: "#D1D5DB",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* ================= Top Selling Products ================= */}
      <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 mt-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Top Selling Products
            </h2>

            <p className="text-gray-400">
              Products generating the highest sales
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#111214] border-b border-[#2A2F36] text-white">
                <th className="text-left p-4">Product</th>

                <th className="text-left p-4">Category</th>

                <th className="text-center p-4">Sold</th>

                <th className="text-right p-4">Revenue</th>
              </tr>
            </thead>

            <tbody>
              {topProducts.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b border-[#2A2F36] hover:bg-[#22262D] transition-all duration-300"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover border border-[#2A2F36]"
                      />

                      <span className="font-semibold text-white">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-gray-400">{product.category}</td>

                  <td className="text-center p-4 font-bold text-blue-400">
                    {product.sold}
                  </td>

                  <td className="text-right p-4 font-bold text-[#EF4444]">
                    ${product.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ================= Recent Sales ================= */}
      <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 mt-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Recent Sales</h2>

            <p className="text-gray-400">Latest customer purchases</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#111214] border-b border-[#2A2F36] text-white">
                <th className="text-left p-4">Customer</th>

                <th className="text-left p-4">Date</th>

                <th className="text-center p-4">Payment</th>

                <th className="text-right p-4">Total</th>
              </tr>
            </thead>

            <tbody>
              {recentSales.map((sale) => (
                <tr
                  key={sale._id}
                  className="border-b border-[#2A2F36] hover:bg-[#22262D] transition-all duration-300"
                >
                  <td className="p-4">
                    <div>
                      <h3 className="font-semibold text-white">
                        {sale.customerName}
                      </h3>

                      <p className="text-sm text-gray-400">{sale.user}</p>
                    </div>
                  </td>

                  <td className="p-4 text-gray-300">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>

                  <td className="text-center p-4 text-gray-300">
                    {sale.paymentMethod}
                  </td>

                  <td className="text-right p-4 font-bold text-[#EF4444]">
                    ${sale.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ================= Bottom Row ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">
        {/* Low Stock */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Low Stock Products
          </h2>

          {lowStockProducts.length === 0 ? (
            <div className="py-10 text-center text-green-400 font-semibold">
              🎉 All products are well stocked.
            </div>
          ) : (
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 bg-[#111214] border border-[#2A2F36] rounded-2xl p-4 hover:border-[#EF4444] transition-all duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl border border-[#2A2F36] object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{product.name}</h3>

                    <p className="text-gray-400 text-sm">{product.category}</p>
                  </div>

                  <div>
                    <span
                      className={`font-bold ${
                        product.stock === 0 ? "text-red-400" : "text-yellow-400"
                      }`}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : `${product.stock} Left`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Business Summary */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8">
            Business Summary
          </h2>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Revenue</span>

              <span className="font-bold text-[#EF4444] text-lg">
                ${stats.totalRevenue.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Orders</span>

              <span className="font-bold text-white">{stats.totalOrders}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Customers</span>

              <span className="font-bold text-white">
                {stats.totalCustomers}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Products</span>

              <span className="font-bold text-white">
                {stats.totalProducts}
              </span>
            </div>

            <hr className="border-[#2A2F36]" />

            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-300">Delivered Orders</span>

              <span className="font-bold text-green-400">
                {stats.deliveredOrders}
              </span>
            </div>

            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-300">Pending Orders</span>

              <span className="font-bold text-yellow-400">
                {stats.pendingOrders}
              </span>
            </div>

            <div className="pt-6 mt-6 border-t border-[#2A2F36]">
              <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 text-center">
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                  Business Health
                </p>

                <h3 className="text-3xl font-bold text-[#EF4444] mt-2">
                  Excellent
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
