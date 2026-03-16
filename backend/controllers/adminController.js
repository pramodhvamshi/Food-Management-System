const Donation = require('../models/Donation');
const User = require('../models/User');
const AgentAssignment = require('../models/AgentAssignment');

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donorId', 'name phone')
      .populate('acceptedByOrg', 'name')
      .populate('assignedAgent', 'name')
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignAgent = async (req, res) => {
  try {
    const { agentId, pickupTime } = req.body;
    
    // Assign agent ONLY if donation is accepted
    const donation = await Donation.findOneAndUpdate(
      { _id: req.params.id, status: 'accepted' },
      { status: 'assigned', assignedAgent: agentId },
      { new: true }
    );

    if (!donation) {
      return res.status(400).json({ message: 'Donation not found or not in accepted state' });
    }

    const agent = await User.findById(agentId);
    if (!agent || agent.role !== 'agent') {
      return res.status(400).json({ message: 'Valid agent must be provided' });
    }

    await AgentAssignment.create({
      donationId: donation._id,
      agentId,
      pickupTime: pickupTime || donation.pickupTime
    });

    // Removed agent email notification

    res.json({ message: 'Agent assigned successfully', donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllDonations, assignAgent, getUsers };
