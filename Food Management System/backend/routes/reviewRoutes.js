import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Submit a Review (Any authenticated user)
router.post("/", protect, createReview);

// ✅ Get All Reviews (Publicly accessible)
router.get("/", getReviews);

export default router;
