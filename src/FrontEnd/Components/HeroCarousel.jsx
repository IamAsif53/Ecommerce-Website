import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../Services/productService";

function HeroCarousel() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const glowColors = [
    "bg-red-500",
    "bg-rose-500",
    "bg-red-600",
    "bg-orange-500",
    "bg-red-400",
  ];

  const [loading, setLoading] = useState(true);

  const [isAnimating, setIsAnimating] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // ===============================
  // Fetch Products
  // ===============================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data.products.slice(0, 5));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ===============================
  // Auto Slide
  // ===============================

  useEffect(() => {
    if (products.length === 0) return;

    if (isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [products, currentSlide, isHovered]);

  // ===============================
  // Loading
  // ===============================

  if (loading || products.length === 0) {
    return null;
  }

  // ===============================
  // Products
  // ===============================

  const currentProduct = products[currentSlide];

  const previousProduct =
    products[currentSlide === 0 ? products.length - 1 : currentSlide - 1];

  const nextProduct =
    products[currentSlide === products.length - 1 ? 0 : currentSlide + 1];

  // ===============================
  // Next
  // ===============================

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));

      setIsAnimating(false);
    }, 250);
  };

  // ===============================
  // Previous
  // ===============================

  const previousSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));

      setIsAnimating(false);
    }, 250);
  };

  return (
    <div
      className="relative flex justify-center items-center h-auto lg:h-[620px] w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow */}

      <div
        className={`absolute w-[240px] h-[240px] lg:w-[480px] lg:h-[480px] rounded-full blur-[140px] opacity-20 transition-all duration-700 ${
          glowColors[currentSlide % glowColors.length]
        }`}
      ></div>
      {/* Left Arrow */}

      <button
        onClick={previousSlide}
        className="absolute left-[-8%] top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-[#181B20] shadow-xl border border-[#2A2F36] hover:bg-[#EF4444] hover:text-white transition-all duration-300 hover:scale-110 text-white"
      >
        ❮
      </button>

      {/* Previous Product */}

      <div
        onClick={previousSlide}
        className={`absolute left-14 cursor-pointer transition-all duration-500 ${
          isAnimating
            ? "opacity-0 -translate-x-12 scale-75"
            : "opacity-60 hover:opacity-100 hover:scale-105"
        }`}
      >
        <div className="w-44 rounded-3xl bg-[#181B20] backdrop-blur-xl border border-[#2A2F36] shadow-xl p-4">
          <div className="h-32 flex items-center justify-center">
            <img
              src={previousProduct.image}
              alt={previousProduct.name}
              className="max-h-28 object-contain"
            />
          </div>

          <h3 className="mt-3 font-semibold text-base line-clamp-1">
            {previousProduct.name}
          </h3>

          <p className="mt-2 text-[#EF4444] font-bold text-lg">
            ${previousProduct.price}
          </p>
        </div>
      </div>

      {/* Main Card */}
      {/* Main Card */}

      <div
        className={`relative z-20 bg-[#181B20] rounded-[32px] shadow-2xl border border-[#2A2F36] overflow-hidden w-full max-w-[340px] sm:max-w-[380px] lg:w-[420px]
  transition-all duration-500
  ${
    isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100 animate-float"
  }`}
      >
        {/* Image */}

        <div className="h-[220px] lg:h-[260px] flex items-center justify-center bg-gradient-to-b from-[#1E2229] to-[#181B20]">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="max-h-[180px] lg:max-h-[220px]object-contain transition duration-500 hover:scale-105"
          />
        </div>

        {/* Content */}

        <div className="p-5 lg:p-8">
          {/* Category */}

          <p className="text-sm uppercase tracking-[3px] text-[#EF4444] font-semibold">
            {currentProduct.category}
          </p>

          {/* Product Name */}

          <h2 className="text-2xl lg:text-[32px] font-bold leading-tight mt-3 text-white">
            {" "}
            {currentProduct.name}
          </h2>

          {/* Rating */}

          <div className="flex items-center gap-2 mt-5">
            <div className="flex text-yellow-400 text-lg">★★★★★</div>

            <span className="text-gray-400 font-medium">4.9</span>
          </div>

          {/* Price */}

          <h3 className="text-3xl lg:text-4xl font-bold text-[#EF4444] mt-6">
            ${currentProduct.price}
          </h3>

          {/* Button */}

          <button
            onClick={() => navigate(`/products/${currentProduct._id}`)}
            className="w-full mt-8 bg-[#EF4444] hover:bg-[#DC2626] text-white py-3 lg:py-4 rounded-2xl font-semibold text-base lg:text-lg transition-all duration-300 hover:shadow-lg"
          >
            View Details →
          </button>
        </div>
      </div>

      {/* Next */}

      {/* Next Product */}

      <div
        onClick={nextSlide}
        className={`absolute right-14 cursor-pointer transition-all duration-500 ${
          isAnimating
            ? "opacity-0 translate-x-12 scale-75"
            : "opacity-60 hover:opacity-100 hover:scale-105"
        }`}
      >
        <div className="w-44 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-xl p-4">
          <div className="h-32 flex items-center justify-center">
            <img
              src={nextProduct.image}
              alt={nextProduct.name}
              className="max-h-28 object-contain"
            />
          </div>

          <h3 className="mt-3 font-semibold text-base line-clamp-1">
            {nextProduct.name}
          </h3>

          <p className="mt-2 text-blue-600 font-bold text-lg">
            ${nextProduct.price}
          </p>
        </div>
      </div>

      {/* Right Arrow */}

      <button
        onClick={nextSlide}
        className="absolute right-[-8%] top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-[#181B20] shadow-xl border border-[#2A2F36] hover:bg-[#EF4444] hover:text-white transition-all duration-300 hover:scale-110 text-white"
      >
        ❯
      </button>
      {/* Pagination */}

      <div className="absolute bottom-2 lg:bottom-6 flex gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-8 h-3 bg-[#EF4444]"
                : "w-3 h-3 bg-[#3B414C] hover:bg-[#EF4444]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
