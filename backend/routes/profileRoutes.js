const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/my', protect, getUserProfile);
router.put('/my', protect, updateUserProfile);

module.exports = router;
