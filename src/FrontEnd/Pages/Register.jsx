import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";

import toast from "react-hot-toast";

import { registerUser } from "../services/authService";

function Register() {
  //---------------------------------------------------------
  // States
  //---------------------------------------------------------

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  //---------------------------------------------------------
  // Password Strength
  //---------------------------------------------------------

  const getStrength = () => {
    if (password.length < 6)
      return {
        text: "Weak",
        color: "bg-red-500",
      };

    if (password.length < 10)
      return {
        text: "Medium",
        color: "bg-yellow-500",
      };

    return {
      text: "Strong",
      color: "bg-green-500",
    };
  };

  const strength = getStrength();

  //---------------------------------------------------------
  // Register
  //---------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name,
        email,
        password,
      });

      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111214] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side */}

        <div className="hidden lg:block">
          <p className="uppercase tracking-[5px] text-[#EF4444] font-bold">
            Join Techit
          </p>

          <h1 className="text-6xl font-extrabold mt-5 leading-tight text-white">
            Create Your
            <br />
            Premium
            <span className="text-[#EF4444]"> Account</span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-400 max-w-lg">
            Register once and unlock a modern shopping experience with premium
            gadgets, secure checkout, order tracking and exclusive deals.
          </p>

          <div className="mt-12 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                🛍️
              </div>

              <span className="text-lg text-gray-300">
                Thousands of Premium Products
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                🔒
              </div>

              <span className="text-lg text-gray-300">
                Secure Account Protection
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                🚚
              </div>

              <span className="text-lg text-gray-300">
                Fast Delivery & Easy Returns
              </span>
            </div>
          </div>
        </div>

        {/* Register Card */}

        <div className="bg-[#181B20] rounded-[32px] border border-[#2A2F36] shadow-2xl p-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-white">
              Create Account
            </h2>

            <p className="text-gray-400 mt-3">
              Join Techit and start shopping today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-14 rounded-2xl bg-[#111214] border border-[#2A2F36] pl-14 pr-5 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 transition"
                  required
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 rounded-2xl bg-[#111214] border border-[#2A2F36] pl-14 pr-5 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 rounded-2xl bg-[#111214] border border-[#2A2F36] pl-14 pr-14 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 transition"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#EF4444] transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Strength */}

              <div className="mt-3">
                <div className="w-full h-2 rounded-full bg-[#2A2F36] overflow-hidden">
                  <div
                    className={`${strength.color} h-full transition-all duration-500 ${
                      strength.text === "Weak"
                        ? "w-1/3"
                        : strength.text === "Medium"
                          ? "w-2/3"
                          : "w-full"
                    }`}
                  />
                </div>

                <p className="mt-2 text-sm text-gray-400">
                  Password Strength :
                  <span className="font-semibold ml-2 text-white">
                    {strength.text}
                  </span>
                </p>
              </div>
            </div>

            {/* Confirm Password */}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full h-14 rounded-2xl bg-[#111214] border pl-14 pr-14 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-[#2A2F36] focus:border-[#EF4444] focus:ring-red-500/20"
                  }`}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#EF4444] transition"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-400 text-sm mt-2">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Register Button */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-14 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed text-gray-300"
                  : "bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white hover:shadow-xl hover:shadow-red-500/20 hover:scale-[1.02]"
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Divider */}

            <div className="relative py-2">
              <div className="border-t border-[#2A2F36]"></div>

              <span className="absolute left-1/2 -translate-x-1/2 -top-1 bg-[#181B20] px-4 text-sm text-gray-500">
                OR
              </span>
            </div>

            {/* Login Link */}

            <div className="text-center">
              <p className="text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-2 font-semibold text-[#EF4444] hover:text-red-400 transition"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>

          {/* Footer */}

          <div className="mt-10 pt-6 border-t border-[#2A2F36]">
            <div className="flex justify-center gap-8 text-sm text-gray-500 flex-wrap">
              <span>🔒 Secure Registration</span>

              <span>⚡ Fast Access</span>

              <span>🛍️ Premium Shopping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
