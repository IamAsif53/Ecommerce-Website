import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import ReviewCard from "./ReviewCard";
import {
  getProductReviews,
  getReviewSummary,
} from "../../Services/reviewService";
function ProductReviews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const [reviewData, summaryData] = await Promise.all([
        getProductReviews(id),
        getReviewSummary(id),
      ]);

      setReviews(reviewData.reviews);

      setSummary({
        averageRating: summaryData.averageRating,
        totalReviews: summaryData.totalReviews,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#EF4444] hover:text-[#DC2626] transition mb-8"
      >
        <FaArrowLeft />

        <span>Back to Product</span>
      </button>

      {/* Header */}

      <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 sm:p-8 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Customer Reviews
        </h1>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-6">
          <div>
            <h2 className="text-6xl font-extrabold text-white">
              {summary.averageRating.toFixed(1)}
            </h2>
          </div>

          <div>
            <p className="text-xl text-white font-semibold">
              {summary.totalReviews} Review
              {summary.totalReviews !== 1 && "s"}
            </p>

            <p className="text-gray-400 mt-2">
              Latest customer experiences with this product.
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}

      {reviews.length === 0 ? (
        <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-10 text-center">
          <h2 className="text-2xl text-white font-semibold">No Reviews Yet</h2>

          <p className="text-gray-400 mt-3">
            Be the first customer to review this product.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductReviews;
