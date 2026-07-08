function ProductStats({ products }) {
  const totalProducts = products.length;

  const inStock = products.filter(
    (product) => Number(product.stock) > 5,
  ).length;

  const lowStock = products.filter(
    (product) => Number(product.stock) > 0 && Number(product.stock) <= 5,
  ).length;

  const outOfStock = products.filter(
    (product) => Number(product.stock) === 0,
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      color: "from-[#EF4444] to-[#B91C1C]",
      icon: "📦",
    },
    {
      title: "In Stock",
      value: inStock,
      color: "from-green-500 to-green-700",
      icon: "✅",
    },
    {
      title: "Low Stock",
      value: lowStock,
      color: "from-yellow-500 to-orange-500",
      icon: "⚠️",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      color: "from-red-500 to-red-700",
      icon: "❌",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#EF4444] hover:shadow-lg hover:shadow-red-500/10"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wide">
                {stat.title}
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {stat.value}
              </h2>
            </div>

            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl shadow-lg`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductStats;
