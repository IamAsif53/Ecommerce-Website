import express from "express";

import {
  sendContactMessage,
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/contactController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User
router.post("/", sendContactMessage);

// Admin
router.get("/", protect, admin, getAllMessages);

router.put("/:id", protect, admin, markMessageAsRead);

router.delete("/:id", protect, admin, deleteMessage);

export default router;
