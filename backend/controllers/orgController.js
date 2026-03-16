const Donation = require('../models/Donation');
const User = require('../models/User');
const OrganizationProfile = require('../models/OrganizationProfile');

const getAvailableDonations = async (req, res) => {
  try {
    const { lat, lng, radiusInKm = 10 } = req.query;
    
    let query = { status: 'pending' };

    // Geolocation nearby filter
    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radiusInKm * 1000 // Convert km to meters
        }
      };
    }

    const donations = await Donation.find(query)
      .populate('donorId', 'name phone address')
      .sort({ createdAt: -1 });
      
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptDonation = async (req, res) => {
  try {
    // DONATION LOCKING RULE: Atomic findOneAndUpdate
    const donation = await Donation.findOneAndUpdate(
      { _id: req.params.id, status: 'pending' },
      { status: 'accepted', acceptedByOrg: req.user._id },
      { new: true }
    ).populate('donorId', 'email name');

    if (!donation) {
      // If it doesn't return, it either doesn't exist or isn't 'pending'
      return res.status(400).json({ message: 'Donation already accepted or not found' });
    }

    // Removed donor email notification

    res.json({ message: 'Donation accepted successfully', donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAcceptedDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ acceptedByOrg: req.user._id })
      .populate('donorId', 'name phone address')
      .populate('assignedAgent', 'name phone')
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAvailableDonations, acceptDonation, getAcceptedDonations };
