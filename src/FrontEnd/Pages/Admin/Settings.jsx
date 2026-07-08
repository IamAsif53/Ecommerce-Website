import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { SettingsContext } from "../../Context/SettingsContext";

import { getSettings, updateSettings } from "../../services/settingsService";

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: "",
    storeEmail: "",
    phone: "",

    freeShipping: true,
    shippingFee: 0,
    taxRate: 0,

    notifications: {
      email: true,
      newOrders: true,
      lowStock: true,
      newUsers: true,
    },
  });
  const [loading, setLoading] = useState(true);
  const { fetchSettings } = useContext(SettingsContext);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);

      const data = await getSettings();

      setSettings(data.settings);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name.startsWith("notifications.")) {
      const key = name.split(".")[1];

      setSettings((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [key]: checked,
        },
      }));

      return;
    }

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const data = await updateSettings(settings);

      setSettings(data.settings);

      await fetchSettings();

      toast.success("Settings Updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">Loading Settings...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Store <span className="text-[#EF4444]">Settings</span>
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Configure your store preferences and business settings.
        </p>
      </div>

      {/* Store Settings */}

      <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">🏪 Store Settings</h2>

          <p className="text-gray-400 mt-2">
            Basic information about your store.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Store Name
            </label>

            <input
              type="text"
              name="storeName"
              value={settings.storeName}
              onChange={handleChange}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Store Email
            </label>

            <input
              type="email"
              name="storeEmail"
              value={settings.storeEmail}
              onChange={handleChange}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Contact Number
            </label>

            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Shipping */}

      <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 mt-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">🚚 Shipping & Tax</h2>

          <p className="text-gray-400 mt-2">
            Configure shipping charges and taxes.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center bg-[#111214] border border-[#2A2F36] rounded-2xl p-5">
            <div>
              <h3 className="font-semibold text-white">Free Shipping</h3>

              <p className="text-gray-400 text-sm mt-1">
                Enable free delivery for all orders.
              </p>
            </div>

            <input
              type="checkbox"
              name="freeShipping"
              checked={settings.freeShipping}
              onChange={handleChange}
              className="w-5 h-5 accent-[#EF4444]"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-300">
                Shipping Fee ($)
              </label>

              <input
                type="number"
                name="shippingFee"
                value={settings.shippingFee}
                onChange={handleChange}
                className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-300">
                Tax Rate (%)
              </label>

              <input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security */}

      <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 mt-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">🔒 Security</h2>

          <p className="text-gray-400 mt-2">
            Manage administrator security settings.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between bg-[#111214] border border-[#2A2F36] rounded-2xl p-5">
            <div>
              <h3 className="font-semibold text-white">Change Password</h3>

              <p className="text-gray-400 text-sm mt-1">
                Update your administrator password regularly.
              </p>
            </div>

            <button
              className="px-5 py-2 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white transition-all duration-300"
              onClick={() =>
                toast("Use the Change Password page from your profile.")
              }
            >
              Change
            </button>
          </div>

          <div className="flex items-center justify-between bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 opacity-80">
            <div>
              <h3 className="font-semibold text-white">
                Two-Factor Authentication
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Extra protection for your admin account.
              </p>
            </div>

            <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-sm font-semibold">
              Coming Soon
            </span>
          </div>

          <div className="flex items-center justify-between bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 opacity-80">
            <div>
              <h3 className="font-semibold text-white">Logout All Devices</h3>

              <p className="text-gray-400 text-sm mt-1">
                Sign out from every logged-in device.
              </p>
            </div>

            <button
              disabled
              className="px-5 py-2 rounded-xl bg-[#2A2F36] text-gray-500 cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}

      <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 mt-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">📧 Notifications</h2>

          <p className="text-gray-400 mt-2">
            Choose which notifications you want to receive.
          </p>
        </div>

        <div className="space-y-5">
          <label className="flex justify-between items-center bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 cursor-pointer hover:border-[#EF4444] transition-all">
            <div>
              <h3 className="font-semibold text-white">Email Notifications</h3>

              <p className="text-gray-400 text-sm mt-1">
                Receive important store updates by email.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-[#EF4444]"
            />
          </label>

          <label className="flex justify-between items-center bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 cursor-pointer hover:border-[#EF4444] transition-all">
            <div>
              <h3 className="font-semibold text-white">New Orders</h3>

              <p className="text-gray-400 text-sm mt-1">
                Notify when a customer places a new order.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-[#EF4444]"
            />
          </label>

          <label className="flex justify-between items-center bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 cursor-pointer hover:border-[#EF4444] transition-all">
            <div>
              <h3 className="font-semibold text-white">Low Stock Alerts</h3>

              <p className="text-gray-400 text-sm mt-1">
                Receive alerts when inventory is running low.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-[#EF4444]"
            />
          </label>

          <label className="flex justify-between items-center bg-[#111214] border border-[#2A2F36] rounded-2xl p-5 cursor-pointer hover:border-[#EF4444] transition-all">
            <div>
              <h3 className="font-semibold text-white">
                New Customer Registration
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Get notified whenever a new customer registers.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-[#EF4444]"
            />
          </label>
        </div>
      </div>

      {/* Save Button */}

      <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Save Configuration
            </h2>

            <p className="text-gray-400 mt-2">
              Save your current store configuration and preferences.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-10 py-4 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
          >
            💾 Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
