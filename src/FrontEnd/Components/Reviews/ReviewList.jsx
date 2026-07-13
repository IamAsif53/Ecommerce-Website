import ReviewCard from "./ReviewCard";

function ReviewList({ reviews, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-400 text-sm sm:text-base">Loading reviews...</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-6 sm:p-8 text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-white">
          No Reviews Yet
        </h3>

        <p className="mt-3 text-sm sm:text-base text-gray-400">
          Be the first customer to review this product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
}

export default ReviewList;
