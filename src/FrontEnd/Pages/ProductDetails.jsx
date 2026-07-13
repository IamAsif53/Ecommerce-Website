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
    <div className="min-h-screen bg-[#111214] py-12 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb productName={product.name} />

        {/* Hero Section */}

        <div className="mt-8 grid lg:grid-cols-2 gap-14 items-start">
          {/* Left : Product Image */}

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 shadow-xl">
            <div className="relative bg-[#111214] rounded-2xl flex justify-center items-center h-[520px] overflow-hidden">
              {/* Badge */}

              <span
                className={`absolute top-6 left-6 ${badgeColor} text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg`}
              >
                {badge}
              </span>

              {/* Discount */}

              {product.discount > 0 && (
                <span className="absolute top-6 right-6 bg-[#EF4444] text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  {product.discount}% OFF
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="max-h-[430px] object-contain transition duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right : Product Information */}

          <div>
            {/* Category */}

            <div className="inline-flex items-center gap-2 bg-[#181B20] border border-[#2A2F36] text-[#EF4444] px-4 py-2 rounded-full">
              <FaTag />

              <span className="font-semibold">{product.category}</span>
            </div>

            {/* Name */}

            <h1 className="text-5xl font-extrabold text-white mt-6 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}

            <div className="flex items-center gap-3 mt-6">
              <div className="flex text-yellow-400 text-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} />
                ))}
              </div>

              <span className="font-semibold text-white">
                {Number(product.rating).toFixed(1)}
              </span>

              <span className="text-gray-400">
                ({product.numReviews} Reviews)
              </span>
            </div>

            {/* Price */}

            <div className="flex items-end gap-5 mt-8">
              <h2 className="text-5xl font-extrabold text-[#EF4444]">
                ${product.price}
              </h2>

              {oldPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  ${oldPrice}
                </span>
              )}
            </div>

            {/* Description */}

            <p className="mt-8 text-gray-300 leading-8 text-lg">
              {product.description}
            </p>

            {/* Quick Information */}

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5">
                <p className="text-sm text-gray-400">Brand</p>

                <h3 className="text-xl font-bold text-white mt-2">
                  {product.brand || "Unknown"}
                </h3>
              </div>

              <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5">
                <p className="text-sm text-gray-400">Availability</p>

                <h3
                  className={`text-xl font-bold mt-2 ${
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

              <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5">
                <p className="text-sm text-gray-400">Sold</p>

                <h3 className="text-xl font-bold text-white mt-2">
                  {product.sold}
                </h3>
              </div>

              <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5">
                <p className="text-sm text-gray-400">Category</p>

                <h3 className="text-xl font-bold text-white mt-2">
                  {product.category}
                </h3>
              </div>
            </div>

            {/* Action Buttons */}

            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex items-center justify-center gap-3 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                  !inStock
                    ? "bg-[#2A2F36] text-gray-500 cursor-not-allowed"
                    : "bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
                }`}
              >
                <FaShoppingCart />

                {inStock ? "Add To Cart" : "Out of Stock"}
              </button>

              <Link
                to="/checkout"
                className={`flex items-center justify-center py-4 rounded-2xl text-lg font-semibold border transition-all duration-300 ${
                  !inStock
                    ? "pointer-events-none opacity-50 border-[#2A2F36]"
                    : "border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                }`}
              >
                Buy Now
              </Link>
            </div>

            {/* Trust Information */}

            <div className="mt-10 bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Why Buy From TechIT?
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center">
                    <FaTruck className="text-[#EF4444] text-xl" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">Free Delivery</h4>

                    <p className="text-gray-400 text-sm">
                      Free shipping on eligible orders.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center">
                    <FaShieldAlt className="text-green-400 text-xl" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">Secure Payment</h4>

                    <p className="text-gray-400 text-sm">
                      100% secure encrypted checkout.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/15 flex items-center justify-center">
                    <FaUndoAlt className="text-orange-400 text-xl" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">Easy Return</h4>

                    <p className="text-gray-400 text-sm">
                      Hassle-free return within 7 days.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center">
                    <FaFire className="text-[#EF4444] text-xl" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">
                      Genuine Products
                    </h4>

                    <p className="text-gray-400 text-sm">
                      Original products sourced directly from trusted brands.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Specifications */}

        <div className="grid lg:grid-cols-3 gap-8 mt-14">
          {/* Description */}

          <div className="lg:col-span-2 bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Product Description
            </h2>

            <p className="text-gray-300 leading-8 text-lg">
              {product.description}
            </p>
          </div>

          {/* Specifications */}

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Specifications
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Brand</span>

                <span className="font-semibold text-white">
                  {product.brand || "N/A"}
                </span>
              </div>

              <div className="flex justify-between border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Category</span>

                <span className="font-semibold text-white">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-between border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Price</span>

                <span className="font-semibold text-[#EF4444]">
                  ${product.price}
                </span>
              </div>

              <div className="flex justify-between border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Discount</span>

                <span className="font-semibold text-white">
                  {product.discount}%
                </span>
              </div>

              <div className="flex justify-between border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Rating</span>

                <span className="font-semibold text-yellow-400">
                  ⭐ {Number(product.rating).toFixed(1)}
                </span>
              </div>

              <div className="flex justify-between border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Reviews</span>

                <span className="font-semibold text-white">
                  {product.numReviews}
                </span>
              </div>

              <div className="flex justify-between border-b border-[#2A2F36] pb-3">
                <span className="text-gray-400">Sold</span>

                <span className="font-semibold text-white">{product.sold}</span>
              </div>

              <div className="flex justify-between border-b border-[#2A2F36] pb-3">
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

              <div className="flex justify-between">
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

        {/* Reviews Section */}
        <ReviewSection product={product} />

        {/* ================================= */}

        {/* Related Products */}

        {/* ================================= */}

        <div className="mt-20">
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="uppercase tracking-[4px] text-[#EF4444] font-semibold text-sm">
                More Products
              </span>

              <h2 className="text-4xl font-extrabold text-white mt-3">
                You May Also Like
              </h2>

              <p className="text-gray-400 mt-3">
                More products from the same category
              </p>
            </div>
          </div>

          {relatedProducts.length === 0 ? (
            <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl py-16 text-center">
              <div className="text-6xl mb-4">📦</div>

              <h3 className="text-2xl font-bold text-white">
                No Related Products
              </h3>

              <p className="text-gray-400 mt-3">
                We couldn't find similar products right now.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
