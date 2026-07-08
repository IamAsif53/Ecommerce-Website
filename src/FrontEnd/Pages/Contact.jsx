import { useState } from "react";
import toast from "react-hot-toast";

import { sendContactMessage } from "../Services/contactService";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await sendContactMessage(formData);

      toast.success("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111214] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}

        <div className="text-center mb-16">
          <span className="uppercase tracking-[4px] text-[#EF4444] font-semibold">
            Contact Us
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-4">
            We'd Love To Hear From You
          </h1>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            Have a question, suggestion, or feedback? Send us a message and
            we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Main Section */}

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left */}

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-[#EF4444] font-semibold">Email</p>
                  <p className="text-gray-300 mt-1">support@techit.com</p>
                </div>

                <div>
                  <p className="text-[#EF4444] font-semibold">Phone</p>
                  <p className="text-gray-300 mt-1">+880 1234-567890</p>
                </div>

                <div>
                  <p className="text-[#EF4444] font-semibold">Address</p>
                  <p className="text-gray-300 mt-1">Chattogram, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Business Hours</h2>

              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="lg:col-span-3 bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition"
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition"
                  />
                </div>
              </div>

              {/* Subject */}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition"
                />
              </div>

              {/* Message */}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>

                <textarea
                  rows={7}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                  className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white placeholder-gray-500 resize-none focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition"
                />
              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-[#EF4444] hover:bg-red-600 hover:shadow-lg hover:scale-[1.01]"
                }`}
              >
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
