import { FaStar } from "react-icons/fa";

function ReviewCard({ review }) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-[#EF4444]/40">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-[#EF4444] flex items-center justify-center text-white font-bold text-lg">
            {review.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h4 className="font-semibold text-white">
              {review.user?.name || "Anonymous"}
            </h4>

            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex text-yellow-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={
                star <= review.rating ? "text-yellow-400" : "text-gray-600"
              }
            />
          ))}
        </div>
      </div>

      {/* Comment */}

      <p className="mt-5 text-gray-300 leading-7">{review.comment}</p>
    </div>
  );
}

export default ReviewCard;
