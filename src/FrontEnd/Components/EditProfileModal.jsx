import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { updateProfile } from "../services/authService";
import toast from "react-hot-toast";
import axios from "axios";
function EditProfileModal({ isOpen, onClose, user }) {
  const { setUser } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        country: user.country || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let avatarUrl = user?.avatar || "";

      // Upload new avatar if selected
      if (imageFile) {
        const uploadData = new FormData();

        uploadData.append("image", imageFile);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload",
          uploadData,
        );

        avatarUrl = uploadRes.data.imageUrl;
      }

      const data = await updateProfile({
        ...formData,
        avatar: avatarUrl,
      });

      setUser(data.user);

      if (localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (sessionStorage.getItem("user")) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success("Profile updated successfully");

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl shadow-2xl w-full max-w-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Edit Profile</h2>

          <button
            onClick={onClose}
            className="text-3xl text-gray-400 hover:text-[#EF4444] transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="flex flex-col items-center mb-6">
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : user?.avatar || "https://via.placeholder.com/120"
                }
                alt="Avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-[#EF4444]"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="mt-4 w-full text-sm text-gray-300
              file:mr-4 file:px-4 file:py-2
              file:rounded-xl file:border-0
              file:bg-[#EF4444] file:text-white
              hover:file:bg-red-600"
              />
            </div>

            <label className="block mb-2 font-medium text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#EF4444] outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#EF4444] outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#EF4444] outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Address
            </label>

            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#EF4444] outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-[#2A2F36] text-gray-300 hover:bg-[#2A2F36] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#EF4444] text-white hover:bg-red-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
