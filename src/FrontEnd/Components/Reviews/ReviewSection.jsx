import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RatingSummary from "./RatingSummary";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

import {
  getProductReviews,
  getReviewSummary,
} from "../../Services/reviewService";

function ReviewSection({ product }) {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [summary, setSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
  });

  if (!product) return null;

  // ============================
  // Fetch Reviews
  // ============================

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);

      const data = await getProductReviews(product._id, 3);

      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  // ============================
  // Fetch Rating Summary
  // ============================

  const fetchSummary = async () => {
    try {
      const data = await getReviewSummary(product._id);

      setSummary({
        averageRating: data.averageRating,
        totalReviews: data.totalReviews,
      });
    } catch (error) {
      console.error("Error fetching review summary:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchSummary();
  }, [product._id]);

  // ============================
  // After Review Submission
  // ============================

  const handleReviewAdded = () => {
    fetchReviews();
    fetchSummary();
  };

  return (
    <section className="mt-12 lg:mt-16">
      <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8">
        {/* Header */}

        <div className="mb-8">
          <span className="uppercase tracking-[2px] sm:tracking-[3px] lg:tracking-[4px] text-[#EF4444] font-semibold text-xs sm:text-sm">
            Customer Feedback
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Ratings & Reviews
          </h2>

          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-7 text-gray-400">
            Share your experience with this product and help other customers
            make better purchasing decisions.
          </p>
        </div>

        {/* Rating Summary */}

        <div className="mb-8">
          <RatingSummary
            averageRating={summary.averageRating}
            totalReviews={summary.totalReviews}
          />
        </div>

        {/* Review Form */}

        <div className="mb-8">
          <ReviewForm
            productId={product._id}
            onReviewAdded={handleReviewAdded}
          />
        </div>

        {/* Recent Reviews */}

        <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 sm:p-6 lg:p-8">
          <h3 className="mb-6 text-xl sm:text-2xl font-bold text-white">
            Recent Reviews
          </h3>

          <ReviewList reviews={reviews} loading={loadingReviews} />

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate(`/products/${product._id}/reviews`)}
              className="w-full sm:w-auto rounded-xl bg-[#EF4444] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#DC2626] hover:scale-105"
            >
              View All Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
