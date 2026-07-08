import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Store file temporarily in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

// POST /api/upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image file provided",
      });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64",
    )}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "mern-ecommerce",
    });

    res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    res.status(500).json({
      message: "Image upload failed",
      error: error.message,
    });
  }
});

export default router;
