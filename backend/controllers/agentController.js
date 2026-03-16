const Donation = require('../models/Donation');

const getTasks = async (req, res) => {
  try {
    const tasks = await Donation.find({
      assignedAgent: req.user._id,
      status: { $in: ["assigned", "picked-up"] }
    }).populate('donorId', 'name phone address').populate('acceptedByOrg', 'name phone location').sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNearbyPickups = async (req, res) => {
  try {
    const { lat, lng, radiusInKm = 15 } = req.query;
    let query = { status: 'accepted' };
    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: radiusInKm * 1000
        }
      };
    }
    const donations = await Donation.find(query).populate('donorId', 'name phone address').populate('acceptedByOrg', 'name phone location').sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptTask = async (req, res) => {
  try {
    // Atomic check to prevent multiple agent assignment
    const donation = await Donation.findOneAndUpdate(
      { _id: req.params.id, status: 'accepted' },
      { status: 'assigned', assignedAgent: req.user._id },
      { new: true }
    );
    if (!donation) return res.status(400).json({ message: 'Task already taken or not found' });
    res.json({ message: 'Task assigned successfully', donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markPickedUp = async (req, res) => {
  try {
    const donation = await Donation.findOneAndUpdate(
      { _id: req.params.id, status: 'assigned', assignedAgent: req.user._id },
      { status: 'picked-up' },
      { new: true }
    );
    if (!donation) return res.status(400).json({ message: 'Donation not found or not in assigned state' });
    res.json({ message: 'Status updated to picked-up', donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markDelivered = async (req, res) => {
  try {
    const donation = await Donation.findOneAndUpdate(
      { _id: req.params.id, status: 'picked-up', assignedAgent: req.user._id },
      { status: 'delivered' },
      { new: true }
    ).populate('donorId', 'email name');
    
    if (!donation) return res.status(400).json({ message: 'Donation not found or not in picked-up state' });
    
    // Removed donor email notification
    
    res.json({ message: 'Donation marked as delivered', donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, getNearbyPickups, acceptTask, markPickedUp, markDelivered };
