import React from "react";
import RatingSummary from "./RatingSummary";
import ReviewForm from "./ReviewForm";
function ReviewSection({ product }) {
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

          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-7 max-w-3xl">
            Share your experience with this product and help other customers
            make better purchasing decisions.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="mb-8">
          <RatingSummary
            averageRating={product?.rating || 0}
            totalReviews={product?.numReviews || 0}
          />
        </div>

        {/* Review Form */}
        <div className="mb-8">
          <ReviewForm productId={product._id} />
        </div>

        {/* Recent Reviews */}
        <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 sm:p-6 lg:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Recent Reviews
          </h3>

          <p className="text-sm sm:text-base text-gray-400">
            Latest customer reviews will appear here.
          </p>

          <div className="mt-6 flex justify-start">
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] transition-all duration-300 text-white font-semibold">
              View All Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
