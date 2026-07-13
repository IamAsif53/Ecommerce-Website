import express from "express";
import {
  addReview,
  getProductReviews,
  getReviewSummary,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get Reviews for a Product (Public)
router.get("/product/:productId", getProductReviews);

// Get Rating Summary (Public)
router.get("/summary/:productId", getReviewSummary);

// Add Review (Protected)
router.post("/", protect, addReview);

export default router;
