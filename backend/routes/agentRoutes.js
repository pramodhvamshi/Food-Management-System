const express = require('express');
const { getTasks, getNearbyPickups, acceptTask, markPickedUp, markDelivered } = require('../controllers/agentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/tasks', protect, authorize('agent'), getTasks);
router.get('/nearby', protect, authorize('agent'), getNearbyPickups);
router.put('/accept/:id', protect, authorize('agent'), acceptTask);
router.put('/mark-picked-up/:id', protect, authorize('agent'), markPickedUp);
router.put('/mark-delivered/:id', protect, authorize('agent'), markDelivered);

module.exports = router;
