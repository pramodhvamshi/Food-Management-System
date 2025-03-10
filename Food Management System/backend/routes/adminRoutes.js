import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Donation from "../models/Donation.js";

const router = express.Router();

// ✅ Admin Dashboard Stats
router.get("/dashboard", protect, authorize("admin"), async (req, res) => {
  try {
    const [totalUsers, totalDonations] = await Promise.all([
      User.countDocuments(),
      Donation.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: "Admin dashboard stats retrieved successfully",
      data: { totalUsers, totalDonations },
    });
  } catch (error) {
    console.error("Error fetching admin dashboard stats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get All Users (Excluding Passwords)
router.get("/users", protect, authorize("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Delete User
router.delete("/users/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get All Donations
router.get("/donations", protect, authorize("admin"), async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json({
      success: true,
      message: "Donations retrieved successfully",
      data: donations,
    });
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
