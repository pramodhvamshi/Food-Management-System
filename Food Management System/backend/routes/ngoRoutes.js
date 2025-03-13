import express from "express";
import { getNGOs, updateNGOProfile, deleteNGO } from "../controllers/ngoController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get All Registered NGOs (Admins only)
router.get("/", protect, authorize("admin"), getNGOs);

// ✅ Update NGO Profile (NGOs only)
router.put("/update", protect, authorize("ngo"), updateNGOProfile);

// ✅ Delete NGO Account (Admin only)
router.delete("/:id", protect, authorize("admin"), deleteNGO);

export default router;
