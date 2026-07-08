import express from "express";

import {
  createOrder,
  getOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../Controllers/OrderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//--------------------------------------------------
// Create Order
//--------------------------------------------------

router.post("/", protect, createOrder);

//--------------------------------------------------
// Get All Orders (Admin)
//--------------------------------------------------

router.get("/", protect, getOrders);

//--------------------------------------------------
// Get Logged-in User Orders
//--------------------------------------------------

router.get("/my-orders", protect, getUserOrders);

//--------------------------------------------------
// Get Single Order
//--------------------------------------------------

router.get("/:id", protect, getOrderById);

//--------------------------------------------------
// Update Order Status
//--------------------------------------------------

router.put("/:id", protect, updateOrderStatus);

export default router;
