import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

import { AuthContext } from "../Context/AuthContext";

import { loginUser } from "../services/authService";

import toast from "react-hot-toast";
import { ChatContext } from "../Context/ChatContext";

function Login() {
  //---------------------------------------------------------
  // States
  //---------------------------------------------------------

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  //---------------------------------------------------------
  // Context
  //---------------------------------------------------------

  const { login } = useContext(AuthContext);
  const { refreshChat } = useContext(ChatContext);
  const navigate = useNavigate();

  //---------------------------------------------------------
  // Login
  //---------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      login(data.user, data.token, rememberMe);
      refreshChat();
      toast.success(`Welcome back, ${data.user.name}!`);

      const destination = data.user.role === "admin" ? "/admin" : "/";

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid Email or Password",
      );
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
            Welcome Back
          </p>

          <h1 className="text-6xl font-extrabold mt-5 leading-tight text-white">
            Continue Your
            <br />
            Premium
            <span className="text-[#EF4444]"> Shopping</span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-400 max-w-lg">
            Access your account to manage orders, explore the latest gadgets,
            save your favorites and enjoy a seamless shopping experience.
          </p>

          <div className="mt-12 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                🚚
              </div>

              <span className="text-lg text-gray-300">
                Fast & Secure Delivery
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                🔒
              </div>

              <span className="text-lg text-gray-300">
                Safe & Encrypted Checkout
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                ⭐
              </div>

              <span className="text-lg text-gray-300">
                Premium Products & Brands
              </span>
            </div>
          </div>
        </div>

        {/* Login Card */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-[32px] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-white">Login</h2>

            <p className="text-gray-400 mt-3">Sign in to your Techit account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full h-14 rounded-2xl bg-[#111214] border border-[#2A2F36] pl-14 pr-14 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 transition"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#EF4444] transition"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#EF4444]"
                />

                <span className="text-gray-400">Remember Me</span>
              </label>

              <button
                type="button"
                className="text-[#EF4444] hover:text-red-400 font-medium transition"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-14 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed text-white"
                  : "bg-[#EF4444] hover:bg-red-600 text-white hover:shadow-xl hover:scale-[1.02]"
              }`}
            >
              {loading ? "Signing In..." : "Login"}
            </button>

            {/* Divider */}

            <div className="relative py-2">
              <div className="border-t border-[#2A2F36]"></div>

              <span className="absolute left-1/2 -translate-x-1/2 -top-1 bg-[#181B20] px-4 text-sm text-gray-500">
                OR
              </span>
            </div>

            {/* Register */}

            <div className="text-center">
              <p className="text-gray-400">
                Don't have an account?
                <Link
                  to="/register"
                  className="ml-2 font-semibold text-[#EF4444] hover:text-red-400 transition"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>

          {/* Bottom */}

          <div className="mt-10 pt-6 border-t border-[#2A2F36]">
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <span>🚚 Fast Delivery</span>

              <span>🔒 Secure Payment</span>

              <span>⭐ Premium Products</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
