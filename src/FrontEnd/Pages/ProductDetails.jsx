import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ReviewSection from "../Components/Reviews/ReviewSection";

import {
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndoAlt,
  FaTag,
  FaBoxOpen,
  FaFire,
} from "react-icons/fa";

import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

import { getProductById, getProducts } from "../Services/productService";
import Breadcrumb from "../Components/Breadcrumb";
import ProductCard from "../Components/ProductCard";
function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);

        const currentProduct = productData.product;

        setProduct(currentProduct);

        const allProducts = await getProducts();

        const related = allProducts.products
          .filter(
            (item) =>
              item.category === currentProduct.category &&
              item._id !== currentProduct._id,
          )
          .slice(0, 4);

        setRelatedProducts(related);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to your cart.");

      navigate("/login");

      return;
    }

    addToCart(product);

    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">Product Not Found</h2>
      </div>
    );
  }

  //--------------------------------------------------
  // Badge
  //--------------------------------------------------

  const inStock = Number(product.stock) > 0;

  const lowStock = Number(product.stock) <= 5;

  const createdDate = new Date(product.createdAt);

  const days = Math.floor(
    (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  let badge = "";
  let badgeColor = "";

  if (!inStock) {
    badge = "Out of Stock";
    badgeColor = "bg-red-500";
  } else if (lowStock) {
    badge = "Limited Stock";
    badgeColor = "bg-orange-500";
  } else if (product.sold >= 20) {
    badge = "Best Seller";
    badgeColor = "bg-purple-600";
  } else if (days <= 30) {
    badge = "New Arrival";
    badgeColor = "bg-green-600";
  } else if (product.featured) {
    badge = "Featured";
    badgeColor = "bg-sky-600";
  } else {
    badge = "Premium";
    badgeColor = "bg-blue-600";
  }

  const oldPrice =
    product.discount > 0
      ? (Number(product.price) / (1 - product.discount / 100)).toFixed(0)
      : null;

  return (
    <div className="min-h-screen bg-[#111214] py-8 lg:py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumb productName={product.name} />
        {/* Hero Section */}
        <div className="mt-8 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-start">
          {/* Left : Product Image */}

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5 shadow-lg">
            <div className="relative bg-[#111214] rounded-xl flex justify-center items-center h-[340px] sm:h-[380px] lg:h-[430px] overflow-hidden">
              {/* Badge */}

              <span
                className={`absolute top-4 left-4 ${badgeColor} text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow`}
              >
                {badge}
              </span>

              {/* Discount */}

              {product.discount > 0 && (
                <span className="absolute top-4 right-4 bg-[#EF4444] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow">
                  {product.discount}% OFF
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="max-h-[260px] sm:max-h-[320px] lg:max-h-[360px] object-contain transition duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Right : Product Information */}

          <div>
            {/* Category */}

            <div className="inline-flex items-center gap-2 bg-[#181B20] border border-[#2A2F36] text-[#EF4444] px-3 py-1.5 rounded-full">
              <FaTag />

              <span className="font-semibold text-sm">{product.category}</span>
            </div>

            {/* Name */}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-5 leading-tight">
              {product.name}
            </h1>

            {/* Price */}

            <div className="flex flex-wrap items-end gap-4 mt-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#EF4444]">
                ${product.price}
              </h2>

              {oldPrice && (
                <span className="text-xl text-gray-500 line-through mb-1">
                  ${oldPrice}
                </span>
              )}
            </div>

            {/* Description */}

            <p className="mt-5 text-gray-300 leading-7 text-base">
              {product.description}
            </p>

            {/* Quick Information */}

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-[#181B20] border border-[#2A2F36] rounded-xl p-4">
                <p className="text-xs text-gray-400">Brand</p>

                <h3 className="text-lg font-bold text-white mt-1">
                  {product.brand || "Unknown"}
                </h3>
              </div>

              <div className="bg-[#181B20] border border-[#2A2F36] rounded-xl p-4">
                <p className="text-xs text-gray-400">Availability</p>

                <h3
                  className={`text-lg font-bold mt-1 ${
                    !inStock
                      ? "text-red-500"
                      : lowStock
                        ? "text-orange-400"
                        : "text-green-400"
                  }`}
                >
                  {!inStock
                    ? "Out of Stock"
                    : lowStock
                      ? `${product.stock} Left`
                      : "In Stock"}
                </h3>
              </div>

              <div className="bg-[#181B20] border border-[#2A2F36] rounded-xl p-4">
                <p className="text-xs text-gray-400">Sold</p>

                <h3 className="text-lg font-bold text-white mt-1">
                  {product.sold}
                </h3>
              </div>

              <div className="bg-[#181B20] border border-[#2A2F36] rounded-xl p-4">
                <p className="text-xs text-gray-400">Category</p>

                <h3 className="text-lg font-bold text-white mt-1">
                  {product.category}
                </h3>
              </div>
            </div>

            {/* Action Buttons */}

            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                  !inStock
                    ? "bg-[#2A2F36] text-gray-500 cursor-not-allowed"
                    : "bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-lg shadow-red-500/20"
                }`}
              >
                <FaShoppingCart />

                {inStock ? "Add To Cart" : "Out of Stock"}
              </button>

              <Link
                to="/checkout"
                className={`flex items-center justify-center py-3 rounded-xl text-base font-semibold border transition-all duration-300 ${
                  !inStock
                    ? "pointer-events-none opacity-50 border-[#2A2F36]"
                    : "border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                }`}
              >
                Buy Now
              </Link>
            </div>

            {/* Trust Information */}

            <div className="mt-6 bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5">
              <h3 className="text-xl font-bold text-white mb-5">
                Why Buy From TechIT?
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">
                    <FaTruck className="text-[#EF4444]" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      Free Delivery
                    </h4>

                    <p className="text-gray-400 text-xs">
                      Free shipping on eligible orders.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center">
                    <FaShieldAlt className="text-green-400" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      Secure Payment
                    </h4>

                    <p className="text-gray-400 text-xs">
                      100% secure encrypted checkout.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/15 flex items-center justify-center">
                    <FaUndoAlt className="text-orange-400" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      Easy Return
                    </h4>

                    <p className="text-gray-400 text-xs">
                      Hassle-free return within 7 days.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">
                    <FaFire className="text-[#EF4444]" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      Genuine Products
                    </h4>

                    <p className="text-gray-400 text-xs">
                      Original products sourced directly from trusted brands.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ================================= */}
        {/* Description & Specifications */}
        {/* ================================= */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mt-10">
          {/* Description */}

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-white">
                Product Description
              </h2>

              <span className="text-xs uppercase tracking-[3px] text-[#EF4444] font-semibold">
                Details
              </span>
            </div>

            <p className="text-gray-300 text-[15px] leading-7">
              {product.description}
            </p>
          </div>

          {/* Specifications */}

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-white">Specifications</h2>

              <span className="text-xs uppercase tracking-[3px] text-[#EF4444] font-semibold">
                Product
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Brand</span>

                <span className="font-semibold text-white">
                  {product.brand || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Category</span>

                <span className="font-semibold text-white">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Price</span>

                <span className="font-semibold text-[#EF4444]">
                  ${product.price}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Discount</span>

                <span className="font-semibold text-white">
                  {product.discount}%
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Sold</span>

                <span className="font-semibold text-white">{product.sold}</span>
              </div>

              <div className="flex justify-between items-center border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Stock</span>

                <span
                  className={`font-semibold ${
                    !inStock
                      ? "text-red-500"
                      : lowStock
                        ? "text-orange-400"
                        : "text-green-400"
                  }`}
                >
                  {!inStock ? "Out of Stock" : `${product.stock} Available`}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>

                <span
                  className={`font-semibold ${
                    product.featured ? "text-[#EF4444]" : "text-gray-300"
                  }`}
                >
                  {product.featured ? "★ Featured Product" : "Regular Product"}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* ================================= */}
        {/* Customer Reviews */}
        {/* ================================= */}
        <section className="mt-12 lg:mt-14">
          <div className="mb-6">
            <span className="uppercase tracking-[3px] text-[#EF4444] text-xs font-semibold">
              Customer Experience
            </span>

            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Ratings & Reviews
            </h2>

            <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-2xl">
              Read genuine customer feedback and share your own experience with
              this product.
            </p>
          </div>

          <ReviewSection product={product} />
        </section>
        {/* ================================= */}
        {/* Related Products */}
        {/* ================================= */}
        <section className="mt-14 lg:mt-16">
          {/* Section Header */}

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="uppercase tracking-[3px] text-[#EF4444] text-xs font-semibold">
                Explore More
              </span>

              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Related Products
              </h2>

              <p className="mt-2 text-sm sm:text-base text-gray-400">
                Discover similar products from the same category.
              </p>
            </div>
          </div>

          {/* Products */}

          {relatedProducts.length === 0 ? (
            <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl py-12 px-6 text-center">
              <div className="text-5xl mb-4">📦</div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                No Related Products
              </h3>

              <p className="text-gray-400 mt-3 text-sm sm:text-base">
                We couldn't find similar products right now.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
