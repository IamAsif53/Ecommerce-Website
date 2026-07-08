import express from "express";
import { chatWithAI, clearChatHistory } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, chatWithAI);

router.delete("/clear", protect, clearChatHistory);

export default router;
