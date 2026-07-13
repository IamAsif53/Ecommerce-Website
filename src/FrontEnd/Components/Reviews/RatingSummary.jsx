import { FaStar } from "react-icons/fa";

function RatingSummary({ averageRating = 0, totalReviews = 0 }) {
  return (
    <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Overall Rating</h3>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Left */}
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-6xl font-extrabold text-white">
              {averageRating.toFixed(1)}
            </h2>

            <div>
              <div className="flex text-yellow-400 text-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} />
                ))}
              </div>

              <p className="text-gray-400 mt-2">
                Based on {totalReviews} review
                {totalReviews !== 1 && "s"}
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="text-gray-400 text-sm">
          Customer ratings will update automatically as new reviews are
          submitted.
        </div>
      </div>
    </div>
  );
}

export default RatingSummary;
