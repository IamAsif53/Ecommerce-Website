import React from "react";

function ReviewSection({ product }) {
  return (
    <section className="mt-16">
      <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8">
        {/* Header */}
        <div className="mb-8">
          <span className="uppercase tracking-[4px] text-[#EF4444] font-semibold text-sm">
            Customer Feedback
          </span>

          <h2 className="text-4xl font-extrabold text-white mt-3">
            Ratings & Reviews
          </h2>

          <p className="text-gray-400 mt-3">
            Share your experience with this product and help other customers
            make better purchasing decisions.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-white">Overall Rating</h3>

          <p className="text-gray-400 mt-2">
            Average rating and total reviews will appear here.
          </p>
        </div>

        {/* Review Form */}
        <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-white">Write a Review</h3>

          <p className="text-gray-400 mt-2">Review form will appear here.</p>
        </div>

        {/* Recent Reviews */}
        <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Recent Reviews</h3>

          <p className="text-gray-400">
            Latest customer reviews will appear here.
          </p>

          <div className="mt-6">
            <button className="px-6 py-3 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] transition text-white font-semibold">
              View All Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
