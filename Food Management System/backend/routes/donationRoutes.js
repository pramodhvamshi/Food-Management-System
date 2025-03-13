import express from 'express';
import { 
  createDonation, 
  getDonations, 
  updateDonationStatus, 
  getDonationById, 
  getMyDonations  // ✅ Importing getMyDonations
} from '../controllers/DonationController.js';

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create a donation (Only Donors)
router.post('/', protect, authorize('donor'), createDonation);

// ✅ Get all donations (NGOs & Admins see all, Donors see their own)
router.get('/', protect, authorize('ngo', 'admin'), getDonations);

// ✅ Get donations of the logged-in donor (Only Donors)
router.get('/my-donations', protect, getMyDonations);  // ✅ No need for authorize()

// ✅ Get a specific donation by ID (Only NGOs & Admins)
router.get('/:id', protect, authorize('ngo', 'admin'), getDonationById);

// ✅ Update donation status (Only NGOs & Admins)
router.put('/:id/status', protect, authorize('ngo', 'admin'), updateDonationStatus);

export default router;
