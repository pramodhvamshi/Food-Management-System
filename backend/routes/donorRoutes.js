const express = require('express');
const { createDonation, getMyDonations, deleteDonation } = require('../controllers/donorController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/create', protect, authorize('donor'), createDonation);
router.get('/my', protect, authorize('donor'), getMyDonations);
router.delete('/:id', protect, authorize('donor'), deleteDonation);

module.exports = router;
