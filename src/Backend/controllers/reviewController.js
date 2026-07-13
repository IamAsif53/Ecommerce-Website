import mongoose from "mongoose";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

// ======================================
// Add Review
// ======================================
export const addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    // Validate Product ID
    if (!mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    // Validate Rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    // Validate Comment
    if (!comment || comment.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Comment must be at least 5 characters long.",
      });
    }

    // Check Product
    const existingProduct = await Product.findById(product);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Check Duplicate Review
    const existingReview = await Review.findOne({
      product,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product.",
      });
    }

    // Create Review
    let review = await Review.create({
      product,
      user: req.user._id,
      rating,
      comment: comment.trim(),
    });

    // ===========================
    // Update Product Rating
    // ===========================

    const reviews = await Review.find({ product });

    const numReviews = reviews.length;

    const averageRating =
      reviews.reduce((total, item) => total + item.rating, 0) / numReviews;

    await Product.findByIdAndUpdate(product, {
      rating: Number(averageRating.toFixed(1)),
      numReviews,
    });

    // Populate User Information
    review = await review.populate("user", "name avatar");

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
      review,
    });
  } catch (error) {
    console.error("Add Review Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

// ======================================
// Get Product Reviews
// ======================================
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const limit = Number(req.query.limit);

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    let query = Review.find({ product: productId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    if (limit) {
      query = query.limit(limit);
    }

    const reviews = await query;

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Get Reviews Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
