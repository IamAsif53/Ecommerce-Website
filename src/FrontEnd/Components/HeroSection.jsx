import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import HeroCarousel from "./HeroCarousel";
function HeroSection() {
  const [products, setProducts] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        // Take only the first 5 products
        setProducts(data.products.slice(0, 5));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  if (loading) {
    return null;
  }

  const currentProduct = products[currentSlide];
  return (
    <section className="relative overflow-hidden bg-[#0F1114]">
      {/* Background Glow */}

      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-red-500/10 rounded-full blur-[140px]"></div>

      <div className="absolute top-20 right-0 w-[380px] h-[380px] bg-red-600/10 rounded-full blur-[140px]"></div>

      <div className="absolute bottom-0 left-1/2 w-[320px] h-[320px] bg-red-500/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 items-center gap-20">
          {/* Left */}

          <div>
            <span className="inline-flex items-center gap-2 bg-[#1B1D22] border border-[#2A2F36] text-[#EF4444] px-5 py-2 rounded-full text-sm font-semibold">
              🔥 Premium Tech Marketplace
            </span>

            <h1 className="text-6xl font-black leading-tight mt-8 text-white">
              Upgrade Your
              <br />
              <span className="text-[#EF4444]">Digital Experience</span>
            </h1>

            <p className="text-gray-400 text-xl mt-8 leading-9 max-w-xl">
              Discover premium smartphones, laptops, gaming gear and accessories
              carefully selected for performance, innovation and everyday life.
            </p>

            <div className="flex gap-5 mt-10">
              <Link
                to="/products"
                className="px-8 py-4 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-red-500/20"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="px-8 py-4 rounded-xl border border-[#2A2F36] bg-[#1B1D22] text-gray-300 hover:border-[#EF4444] hover:text-[#EF4444] transition-all duration-300 hover:-translate-y-1"
              >
                Explore Products
              </Link>
            </div>

            <div className="flex gap-10 mt-14">
              <div>
                <h3 className="text-3xl font-bold text-white">500+</h3>
                <p className="text-gray-500 mt-1">Premium Products</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">5K+</h3>
                <p className="text-gray-500 mt-1">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">24/7</h3>
                <p className="text-gray-500 mt-1">Customer Support</p>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="flex justify-center">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
