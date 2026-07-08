import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getProducts } from "../Services/productService";
import ProductCard from "./ProductCard";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        // Latest 6 Products
        setProducts(data.products.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-[#0F1114] py-24">
      {" "}
      <div className="max-w-7xl mx-auto px-6">
        <div className="w-24 h-1 bg-[#EF4444] rounded-full mx-auto mb-12"></div>
        {/* Heading */}

        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#181B20] border border-[#2A2F36] text-[#EF4444] text-sm font-semibold">
            🔥 Trending Now
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mt-6">
            Featured <span className="text-[#EF4444]">Products</span>
          </h2>

          <p className="text-gray-400 mt-5 text-lg max-w-2xl mx-auto leading-8">
            Discover premium gadgets carefully selected for performance,
            innovation and reliability.
          </p>
        </div>

        {/* Product Grid */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {" "}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Bottom Button */}

        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-4 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold transition-all duration-300 shadow-lg shadow-red-500/20 hover:-translate-y-1"
          >
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
