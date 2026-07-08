import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { changePassword } from "../services/authService";
import { getPasswordStrength } from "../utils/passwordStrength";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordInfo = getPasswordStrength(formData.newPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const data = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success(data.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">🔒 Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-gray-300">
            Current Password
          </label>

          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#EF4444] outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EF4444]"
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-300">
            New Password
          </label>

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#EF4444] outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EF4444]"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="mt-3">
            <div className="w-full h-2 bg-[#2A2F36] rounded-full overflow-hidden">
              <div
                className={`h-full ${passwordInfo.color}`}
                style={{
                  width: `${passwordInfo.score * 20}%`,
                }}
              ></div>
            </div>

            <p className="mt-2 text-sm font-medium text-gray-300">
              Password Strength:
              <span className="ml-2 font-semibold text-white">
                {passwordInfo.strength}
              </span>
            </p>

            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <p
                className={
                  passwordInfo.checks.length
                    ? "text-green-400"
                    : "text-gray-500"
                }
              >
                {passwordInfo.checks.length ? "✔" : "✖"} 8+ Characters
              </p>

              <p
                className={
                  passwordInfo.checks.uppercase
                    ? "text-green-400"
                    : "text-gray-500"
                }
              >
                {passwordInfo.checks.uppercase ? "✔" : "✖"} Uppercase
              </p>

              <p
                className={
                  passwordInfo.checks.lowercase
                    ? "text-green-400"
                    : "text-gray-500"
                }
              >
                {passwordInfo.checks.lowercase ? "✔" : "✖"} Lowercase
              </p>

              <p
                className={
                  passwordInfo.checks.number
                    ? "text-green-400"
                    : "text-gray-500"
                }
              >
                {passwordInfo.checks.number ? "✔" : "✖"} Number
              </p>

              <p
                className={
                  passwordInfo.checks.special
                    ? "text-green-400"
                    : "text-gray-500"
                }
              >
                {passwordInfo.checks.special ? "✔" : "✖"} Special Character
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-300">
            Confirm New Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#EF4444] outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EF4444]"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-3 rounded-xl text-white font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#EF4444] hover:bg-red-600"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
