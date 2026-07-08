import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";

function FeaturedCategories() {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getProducts();

        const grouped = {};

        data.products.forEach((product) => {
          const category = product.category;

          if (!grouped[category]) {
            grouped[category] = {
              name: category,
              count: 0,
            };
          }

          grouped[category].count++;
        });

        setCategories(Object.values(grouped));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const getIcon = (category) => {
    switch (category.toLowerCase()) {
      case "mobile":
      case "smartphone":
      case "phones":
        return "📱";

      case "laptop":
        return "💻";

      case "earbud":
      case "audio":
      case "headphone":
        return "🎧";

      case "watch":
      case "smartwatch":
        return "⌚";

      case "tablet":
        return "📲";

      default:
        return "🛍️";
    }
  };

  return (
    <section className="bg-[#0F1114] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#181B20] border border-[#2A2F36] text-[#EF4444] text-sm font-semibold">
            📂 Browse Categories
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mt-6">
            Featured <span className="text-[#EF4444]">Categories</span>
          </h2>

          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Find your favorite technology products by category and discover the
            latest innovations.
          </p>
        </div>

        {/* Categories */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => navigate(`/products?category=${category.name}`)}
              className="group cursor-pointer bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#EF4444] hover:shadow-lg hover:shadow-red-500/10"
            >
              {/* Icon */}

              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#B91C1C] flex items-center justify-center text-5xl shadow-lg shadow-red-500/20 transition-all duration-300 group-hover:scale-110">
                {getIcon(category.name)}
              </div>

              {/* Category */}

              <h3 className="text-2xl font-bold text-center text-white mt-8 group-hover:text-[#EF4444] transition-colors duration-300">
                {category.name}
              </h3>

              {/* Product Count */}

              <p className="text-gray-400 text-center mt-3">
                {category.count} Products
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
