import express from 'express';
import { createDonation, getDonations, updateDonationStatus, getDonationById } from '../controllers/DonationController.js';
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create a donation (Only Donors)
router.post('/', protect, authorize('donor'), createDonation);

// ✅ Get all donations (Only NGOs & Admins)
router.get('/', protect, authorize('ngo', 'admin'), getDonations);

// ✅ Get a donation by ID (Only NGOs & Admins)
router.get('/:id', protect, authorize('ngo', 'admin'), getDonationById);

// ✅ Update donation status (Only NGOs & Admins)
router.put('/:id/status', protect, authorize('ngo', 'admin'), updateDonationStatus);

export default router;
