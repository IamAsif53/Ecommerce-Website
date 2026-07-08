import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";

import { FaShoppingCart, FaEye, FaStar, FaTruck, FaBolt } from "react-icons/fa";

import {
  MdVerified,
  MdHeadphones,
  MdPhoneIphone,
  MdLaptopMac,
  MdWatch,
} from "react-icons/md";

import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart.");

      navigate("/login");

      return;
    }

    addToCart(product);
  };

  //-------------------------------------------------------
  // Dynamic Feature Chips
  //-------------------------------------------------------

  const getFeatures = () => {
    const category = product.category.toLowerCase();

    if (category.includes("mobile")) {
      return ["5G", "AMOLED", "Fast Charge"];
    }

    if (category.includes("laptop")) {
      return ["SSD", "16GB RAM", "Intel"];
    }

    if (category.includes("earbud") || category.includes("audio")) {
      return ["ANC", "40H", "IPX5"];
    }

    if (category.includes("watch")) {
      return ["GPS", "AMOLED", "Heart Rate"];
    }

    return ["Premium", "Latest", "Original"];
  };

  //-------------------------------------------------------
  // Dynamic Icon
  //-------------------------------------------------------

  const getIcon = () => {
    const category = product.category.toLowerCase();

    if (category.includes("earbud") || category.includes("audio")) {
      return <MdHeadphones className="text-blue-600 text-xl" />;
    }

    if (category.includes("mobile")) {
      return <MdPhoneIphone className="text-blue-600 text-xl" />;
    }

    if (category.includes("laptop")) {
      return <MdLaptopMac className="text-blue-600 text-xl" />;
    }

    if (category.includes("watch")) {
      return <MdWatch className="text-blue-600 text-xl" />;
    }

    return <MdVerified className="text-blue-600 text-xl" />;
  };

  //-------------------------------------------------------

  const features = getFeatures();

  const oldPrice = Math.round(product.price * 1.2);

  const discount = Math.round(((oldPrice - product.price) / oldPrice) * 100);

  const inStock = Number(product.stock) > 0;

  const lowStock = Number(product.stock) <= 5 && Number(product.stock) > 0;

  //-------------------------------------------------------
  // Product Badge
  //-------------------------------------------------------

  const LOW_STOCK_LIMIT = 5;
  const BEST_SELLER_LIMIT = 20;
  const NEW_PRODUCT_DAYS = 30;

  const createdDate = new Date(product.createdAt);

  const daysSinceCreated = Math.floor(
    (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  let badge = "";
  let badgeColor = "";

  if (!inStock) {
    badge = "❌ Out of Stock";
    badgeColor = "bg-red-500";
  } else if (Number(product.stock) <= LOW_STOCK_LIMIT) {
    badge = "⚡ Limited Stock";
    badgeColor = "bg-orange-500";
  } else if (Number(product.sold) >= BEST_SELLER_LIMIT) {
    badge = "🔥 Best Seller";
    badgeColor = "bg-purple-600";
  } else if (daysSinceCreated <= NEW_PRODUCT_DAYS) {
    badge = "🟢 New Arrival";
    badgeColor = "bg-green-600";
  } else if (product.featured) {
    badge = "💎 Featured";
    badgeColor = "bg-sky-600";
  } else {
    badge = "✨ Premium";
    badgeColor = "bg-[#EF4444]";
  }

  return (
    <div className="group bg-[#181B20] rounded-3xl overflow-hidden border border-[#2A2F36] shadow-lg hover:shadow-red-500/10 hover:-translate-y-2 transition-all duration-500">
      {" "}
      {/* Image */}
      <div className="relative bg-gradient-to-br from-[#1D2128] via-[#181B20] to-[#15181D] h-60 flex items-center justify-center overflow-hidden">
        {/* Badge */}

        <div
          className={`absolute top-4 left-4 ${badgeColor} text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow`}
        >
          {badge}
        </div>

        {/* Details Icon */}

        <Link
          to={`/products/${product._id}`}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#22262D] border border-[#2A2F36] text-white flex items-center justify-center hover:bg-[#EF4444] transition-all duration-300"
        >
          <FaEye />
        </Link>

        {/* Product Image */}

        <img
          src={product.image}
          alt={product.name}
          className="max-h-48 object-contain transition duration-500 group-hover:scale-110"
        />
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Category */}

        <div className="flex items-center gap-2 mb-2">
          {getIcon()}

          <span className="uppercase tracking-[2px] text-xs font-bold text-[#EF4444]">
            {product.category}
          </span>
        </div>

        {/* Product Name */}

        <h2 className="text-2xl font-bold text-white line-clamp-2 min-h-[60px]">
          {product.name}
        </h2>

        {/* Price + Stock */}

        <div className="flex justify-between items-end mt-5">
          <div>
            <h3 className="text-3xl font-extrabold text-[#EF4444]">
              ${product.price}
            </h3>

            <p
              className={`mt-2 text-sm font-semibold ${
                !inStock
                  ? "text-red-600"
                  : lowStock
                    ? "text-orange-500"
                    : "text-green-600"
              }`}
            >
              {!inStock
                ? "Out of Stock"
                : lowStock
                  ? `${product.stock} Left`
                  : "In Stock"}
            </p>
          </div>

          {lowStock && inStock && (
            <span className="bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full font-semibold">
              Hurry!
            </span>
          )}
        </div>

        {/* Divider */}

        <div className="border-t border-[#2A2F36] my-6"></div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
              !inStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#EF4444] text-white hover:bg-[#DC2626]"
            }`}
          >
            <FaShoppingCart />
            {inStock ? "Add To Cart" : "Unavailable"}
          </button>

          <Link
            to={`/products/${product._id}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2A2F36] hover:border-[#EF4444] hover:text-[#EF4444] transition-all duration-300 font-semibold text-gray-300"
          >
            Details
            <FaBolt className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
