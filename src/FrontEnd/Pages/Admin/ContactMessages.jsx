import { useEffect, useState } from "react";

import { FaTimes } from "react-icons/fa";
import {
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
} from "../../Services/contactAdminService";

import toast from "react-hot-toast";

function ContactMessages() {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("All");

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const response = await getAllMessages();

      setMessages(response.messages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markMessageAsRead(id);

      toast.success("Message marked as read.");

      setSelectedMessage(null);

      fetchMessages();
    } catch (error) {
      console.log(error);

      toast.error("Failed to update message.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) return;

    try {
      await deleteMessage(id);

      toast.success("Message deleted successfully.");

      setSelectedMessage(null);

      fetchMessages();
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete message.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name?.toLowerCase().includes(search.toLowerCase()) ||
      message.email?.toLowerCase().includes(search.toLowerCase()) ||
      message.subject?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" ? true : message.status === filter;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="text-white text-center py-20">Loading Messages...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* ================= Header ================= */}

      <div className="mb-10">
        <span className="uppercase tracking-[4px] text-[#EF4444] font-semibold text-sm">
          Admin Panel
        </span>

        <h1 className="text-5xl font-extrabold text-white mt-3">
          Contact Messages
        </h1>

        <p className="text-gray-400 mt-4 max-w-2xl">
          Manage customer feedback, inquiries and support requests.
        </p>
      </div>

      {/* ================= Statistics ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Messages</p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {messages.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#EF4444]/20 flex items-center justify-center text-2xl">
              📩
            </div>
          </div>
        </div>

        {/* Unread */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Unread</p>

              <h2 className="text-4xl font-bold text-red-400 mt-2">
                {
                  messages.filter((message) => message.status === "Unread")
                    .length
                }
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center text-2xl">
              🔴
            </div>
          </div>
        </div>

        {/* Read */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Read</p>

              <h2 className="text-4xl font-bold text-green-400 mt-2">
                {messages.filter((message) => message.status === "Read").length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl">
              🟢
            </div>
          </div>
        </div>
      </div>

      {/* ================= Search & Filter ================= */}

      <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-5">
          {/* Search */}

          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search by name, email or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition"
            />
          </div>

          {/* Filter */}

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#111214] border border-[#2A2F36] rounded-xl px-5 py-3 text-white focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition"
          >
            <option value="All">All Messages</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
          </select>
        </div>

        <div className="mt-5 text-gray-400">
          Showing
          <span className="text-white font-semibold mx-2">
            {filteredMessages.length}
          </span>
          message(s)
        </div>
      </div>

      {/* ================= Messages Table ================= */}

      <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-7xl mb-6">📭</div>

            <h2 className="text-3xl font-bold text-white">No Messages Found</h2>

            <p className="text-gray-400 mt-4">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#111214] border-b border-[#2A2F36]">
                  <th className="text-left p-5 text-gray-300">Customer</th>

                  <th className="text-left p-5 text-gray-300">Subject</th>

                  <th className="text-left p-5 text-gray-300">Email</th>

                  <th className="text-center p-5 text-gray-300">Date</th>

                  <th className="text-center p-5 text-gray-300">Status</th>

                  <th className="text-center p-5 text-gray-300">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredMessages.map((message) => (
                  <tr
                    key={message._id}
                    className="border-b border-[#2A2F36] hover:bg-[#20242B] transition"
                  >
                    {/* Customer */}

                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#B91C1C] flex items-center justify-center text-white font-bold">
                          {message.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h3 className="font-semibold text-white">
                            {message.name}
                          </h3>

                          <p className="text-sm text-gray-400">Customer</p>
                        </div>
                      </div>
                    </td>

                    {/* Subject */}

                    <td className="p-5 text-white font-medium">
                      {message.subject}
                    </td>

                    {/* Email */}

                    <td className="p-5 text-gray-400">{message.email}</td>

                    {/* Date */}

                    <td className="text-center p-5 text-gray-300">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status */}

                    <td className="text-center p-5">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          message.status === "Unread"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {message.status}
                      </span>
                    </td>

                    {/* Action */}

                    <td className="text-center p-5">
                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="px-5 py-2 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= View Message Modal ================= */}

      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-3xl bg-[#181B20] border border-[#2A2F36] rounded-3xl shadow-2xl">
            {/* Header */}

            <div className="flex justify-between items-center p-8 border-b border-[#2A2F36]">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EF4444] to-[#B91C1C] flex items-center justify-center text-white text-2xl font-bold">
                  {selectedMessage.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {selectedMessage.name}
                  </h2>

                  <p className="text-gray-400">{selectedMessage.email}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-[#EF4444] text-2xl transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Body */}

            <div className="p-8 space-y-8">
              <div>
                <p className="text-gray-400 text-sm mb-2">Subject</p>

                <h3 className="text-2xl font-bold text-white">
                  {selectedMessage.subject}
                </h3>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">Message</p>

                <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-6">
                  <p className="text-gray-300 leading-8 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">Received On</p>

                  <h4 className="text-white font-semibold mt-2">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </h4>
                </div>

                <div className="bg-[#111214] border border-[#2A2F36] rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">Current Status</p>

                  <span
                    className={`inline-block mt-2 px-4 py-2 rounded-full font-semibold ${
                      selectedMessage.status === "Unread"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {selectedMessage.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}

            <div className="border-t border-[#2A2F36] p-6 flex justify-end gap-4">
              <button
                onClick={() => handleMarkAsRead(selectedMessage._id)}
                disabled={selectedMessage.status === "Read"}
                className={`px-6 py-3 rounded-xl text-white transition ${
                  selectedMessage.status === "Read"
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {selectedMessage.status === "Read"
                  ? "Already Read"
                  : "Mark as Read"}
              </button>

              <button
                onClick={() => handleDelete(selectedMessage._id)}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
              >
                Delete
              </button>

              <button
                onClick={() => setSelectedMessage(null)}
                className="px-6 py-3 rounded-xl border border-[#2A2F36] text-gray-300 hover:bg-[#20242B] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactMessages;
