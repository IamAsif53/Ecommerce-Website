import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    // Store Information
    storeName: {
      type: String,
      default: "Tech IT",
    },

    storeEmail: {
      type: String,
      default: "admin@techit.com",
    },

    phone: {
      type: String,
      default: "+8801700000000",
    },

    // Shipping
    freeShipping: {
      type: Boolean,
      default: true,
    },

    shippingFee: {
      type: Number,
      default: 0,
    },

    taxRate: {
      type: Number,
      default: 0,
    },

    // Notifications
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },

      newOrders: {
        type: Boolean,
        default: true,
      },

      lowStock: {
        type: Boolean,
        default: true,
      },

      newUsers: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
