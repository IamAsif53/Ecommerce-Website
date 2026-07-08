import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import EditProfileModal from "../Components/EditProfileModal";
import ChangePassword from "../Components/ChangePassword";
function Profile() {
  const { user } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#111214] py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}

        {/* User Info */}

        <div className="flex-1 w-full">
          {/* Name & Email */}

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8">
              {/* Left Side */}

              <div className="flex flex-col md:flex-row items-center gap-6">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.name}
                    className="w-36 h-36 rounded-full object-cover border-4 border-[#EF4444] shadow-lg"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-full border-4 border-[#EF4444] shadow-lg bg-[#181B20] flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}

                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-bold text-white">
                    {user?.name}
                  </h1>

                  <p className="text-gray-400 text-lg mt-2">{user?.email}</p>

                  <div className="mt-5">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-[#EF4444] font-semibold">
                      {user?.role === "admin"
                        ? "👑 Administrator"
                        : "👤 Customer"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side */}

              <button
                onClick={() => setShowEditModal(true)}
                className="px-8 py-3 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:scale-105"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Divider */}

          <div className="border-t border-[#2A2F36] my-8"></div>

          {/* Information */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}

            <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5">
              <p className="text-sm text-gray-500">📞 Phone</p>

              <h3 className="font-semibold text-lg text-white mt-2">
                {user?.phone || "Not Added"}
              </h3>
            </div>

            {/* Country */}

            <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5">
              <p className="text-sm text-gray-500">🌍 Country</p>

              <h3 className="font-semibold text-lg text-white mt-2">
                {user?.country || "Bangladesh"}
              </h3>
            </div>

            {/* Address */}

            <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5 md:col-span-2">
              <p className="text-sm text-gray-500">📍 Shipping Address</p>

              <h3 className="font-semibold text-lg text-white mt-2">
                {user?.address || "No Address Added"}
              </h3>
            </div>

            {/* Member Since */}

            <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5">
              <p className="text-sm text-gray-500">📅 Member Since</p>

              <h3 className="font-semibold text-lg text-white mt-2">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Recently Joined"}
              </h3>
            </div>

            {/* Status */}

            <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5">
              <p className="text-sm text-gray-500">⚡ Account Status</p>

              <h3 className="font-semibold text-green-400 text-lg mt-2">
                Active
              </h3>
            </div>
          </div>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">
            <div className="text-4xl">📦</div>

            <h3 className="text-3xl font-bold text-white mt-5">0</h3>

            <p className="text-gray-400 mt-2">Orders</p>
          </div>

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">
            <div className="text-4xl">❤️</div>

            <h3 className="text-3xl font-bold text-white mt-5">0</h3>

            <p className="text-gray-400 mt-2">Wishlist</p>
          </div>

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">
            <div className="text-4xl">💰</div>

            <h3 className="text-3xl font-bold text-[#EF4444] mt-5">$0</h3>

            <p className="text-gray-400 mt-2">Total Spending</p>
          </div>

          <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">
            <div className="text-4xl">⭐</div>

            <h3 className="text-3xl font-bold text-white mt-5">0</h3>

            <p className="text-gray-400 mt-2">Reviews</p>
          </div>
        </div>

        <ChangePassword />

        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          user={user}
        />
      </div>
    </div>
  );
}

export default Profile;
