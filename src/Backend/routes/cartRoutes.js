import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);

router.post("/", protect, addToCart);

router.delete("/:productId", protect, removeFromCart);

router.delete("/", protect, clearCart);
router.put("/increase/:productId", protect, increaseQuantity);

router.put("/decrease/:productId", protect, decreaseQuantity);
export default router;
