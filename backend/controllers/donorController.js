const Donation = require('../models/Donation');

const createDonation = async (req, res) => {
  try {
    const { foodType, quantity, notes, latitude, longitude, address, pickupTime } = req.body;

    if (!latitude || !longitude || !address) {
       return res.status(400).json({ message: 'Location (latitude, longitude, address) is required.' });
    }

    const donation = await Donation.create({
      donorId: req.user._id,
      foodType,
      quantity,
      notes,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)], // GeoJSON format: [lng, lat]
        address
      },
      pickupTime,
      status: 'pending'
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (donation.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot delete a donation that is already accepted or collected' });
    }

    await donation.deleteOne();
    res.json({ message: 'Donation removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDonation, getMyDonations, deleteDonation };
