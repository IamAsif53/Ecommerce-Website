import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ======================================
// Protect Middleware
// ======================================

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Provided",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Store complete user object
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }
};

// ======================================
// Admin Middleware
// ======================================

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Admin access only",
  });
};
