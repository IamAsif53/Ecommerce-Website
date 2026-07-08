import mongoose from "mongoose";

const pendingPaymentSchema = new mongoose.Schema(
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
    // Transaction
    //---------------------------------------------------

    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    //---------------------------------------------------
    // Customer
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
      default: "SSLCommerz",
    },

    //---------------------------------------------------
    // Products
    //---------------------------------------------------

    items: [
      {
        productId: String,
        name: String,
        image: String,
        quantity: Number,
        price: Number,
      },
    ],

    //---------------------------------------------------
    // Price
    //---------------------------------------------------

    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("PendingPayment", pendingPaymentSchema);
