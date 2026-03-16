const express = require('express');
const { getAllDonations, assignAgent, getUsers } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/all', protect, authorize('admin'), getAllDonations);
router.put('/assign-agent/:id', protect, authorize('admin'), assignAgent);
router.get('/users', protect, authorize('admin', 'organization'), getUsers); // Actually the prompt says /api/users under Admin. Let's make it just / here if mounted at /api/users
router.get('/', protect, authorize('admin'), getUsers); // Handled for /api/users/

module.exports = router;
