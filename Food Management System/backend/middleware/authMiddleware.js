import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Middleware to protect routes (Authentication)
export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.startsWith("Bearer") 
    ? req.headers.authorization.split(" ")[1] 
    : null;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found, authorization denied" });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// ✅ Role-based authorization middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, user data missing" });
    }

    // ✅ Allow donors to access only their donations
    if (req.path === "/my-donations" && req.user.role === "donor") {
      return next();
    }

    // 🚫 Restrict access if role is unauthorized
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied for role: ${req.user.role}` });
    }

    next();
  };
};
