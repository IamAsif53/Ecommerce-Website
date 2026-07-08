import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    //---------------------------------------------------
    // User
    //---------------------------------------------------

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //---------------------------------------------------
    // Customer Information
    //---------------------------------------------------

    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    postalCode: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "Bangladesh",
    },

    //---------------------------------------------------
    // Payment
    //---------------------------------------------------

    paymentMethod: {
      type: String,
      enum: ["Cash On Delivery", "SSLCommerz", "Stripe"],
      default: "Cash On Delivery",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Cancelled", "Refunded"],
      default: "Pending",
    },

    paymentGateway: {
      type: String,
      default: "",
    },

    transactionId: {
      type: String,
      default: "",
    },

    valId: {
      type: String,
      default: "",
    },

    paidAt: {
      type: Date,
    },

    //---------------------------------------------------
    // Products
    //---------------------------------------------------

    items: [
      {
        productId: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    //---------------------------------------------------
    // Price
    //---------------------------------------------------

    totalPrice: {
      type: Number,
      required: true,
    },

    //---------------------------------------------------
    // Order Status
    //---------------------------------------------------

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
