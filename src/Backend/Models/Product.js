import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    // Total quantity sold
    sold: {
      type: Number,
      default: 0,
    },

    // Average rating (future reviews)
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // Number of reviews
    numReviews: {
      type: Number,
      default: 0,
    },

    // Discount percentage
    discount: {
      type: Number,
      default: 0,
    },

    // Featured product
    featured: {
      type: Boolean,
      default: false,
    },

    // Active / Hidden
    isActive: {
      type: Boolean,
      default: true,
    },

    // Brand
    brand: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
