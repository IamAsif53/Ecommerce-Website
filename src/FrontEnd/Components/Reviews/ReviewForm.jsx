import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import { addReview } from "../../Services/reviewService";
import { AuthContext } from "../../Context/AuthContext";

function ReviewForm({ productId, onReviewAdded }) {
  const { user } = useContext(AuthContext);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to write a review.");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (comment.trim().length < 5) {
      toast.error("Comment must be at least 5 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await addReview({
        product: productId,
        rating,
        comment,
      });

      toast.success(response.message);

      setRating(0);
      setHover(0);
      setComment("");

      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 sm:p-6 lg:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
        Write a Review
      </h3>

      {!user ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm sm:text-base">
            Please login to write a review.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}

          <div>
            <label className="block text-white font-medium mb-3">
              Your Rating
            </label>

            <div className="flex flex-wrap gap-2 text-3xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform duration-200 hover:scale-110"
                >
                  <FaStar
                    className={
                      star <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}

          <div>
            <label className="block text-white font-medium mb-3">
              Your Review
            </label>

            <textarea
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others what you think about this product..."
              className="w-full bg-[#181B20] border border-[#2A2F36] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] resize-none"
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#EF4444] hover:bg-[#DC2626] text-white"
            }`}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;
