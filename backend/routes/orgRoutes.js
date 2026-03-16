const express = require('express');
const { getAvailableDonations, acceptDonation, getAcceptedDonations } = require('../controllers/orgController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/available', protect, authorize('organization'), getAvailableDonations);
router.put('/accept/:id', protect, authorize('organization'), acceptDonation);
router.get('/accepted', protect, authorize('organization'), getAcceptedDonations);

module.exports = router;
