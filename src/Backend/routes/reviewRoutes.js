import express from "express";
import {
  addReview,
  getProductReviews,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get Reviews for a Product (Public)
router.get("/product/:productId", getProductReviews);

// Add Review (Protected)
router.post("/", protect, addReview);

export default router;
