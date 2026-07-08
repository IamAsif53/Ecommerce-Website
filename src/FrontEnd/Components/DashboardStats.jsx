function DashboardStats({ stats }) {
  const cards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: "💰",
      accent: "text-[#EF4444]",
      gradient: "from-[#EF4444] to-[#B91C1C]",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: "📦",
      accent: "text-blue-400",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: "👥",
      accent: "text-purple-400",
      gradient: "from-purple-500 to-purple-700",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: "🛍️",
      accent: "text-orange-400",
      gradient: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <>
      {/* Main Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 hover:border-[#EF4444] hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wide">
                  {card.title}
                </p>

                <h2 className={`text-4xl font-bold mt-3 ${card.accent}`}>
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-3xl shadow-lg`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Status */}

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-[#181B20] border border-yellow-500/30 rounded-3xl p-6 hover:border-yellow-400 transition-all duration-300">
          <p className="text-yellow-400 font-semibold uppercase tracking-wide">
            Pending Orders
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.pendingOrders}
          </h2>
        </div>

        <div className="bg-[#181B20] border border-blue-500/30 rounded-3xl p-6 hover:border-blue-400 transition-all duration-300">
          <p className="text-blue-400 font-semibold uppercase tracking-wide">
            Processing
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.processingOrders}
          </h2>
        </div>

        <div className="bg-[#181B20] border border-green-500/30 rounded-3xl p-6 hover:border-green-400 transition-all duration-300">
          <p className="text-green-400 font-semibold uppercase tracking-wide">
            Delivered
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.deliveredOrders}
          </h2>
        </div>
      </div>
    </>
  );
}

export default DashboardStats;
