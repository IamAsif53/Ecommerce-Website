import express from "express";

import { protect, admin } from "../middleware/authMiddleware.js";

import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

// Any logged-in user can view settings
router.get("/", protect, getSettings);

// Only admin can update settings
router.put("/", protect, admin, updateSettings);

export default router;
