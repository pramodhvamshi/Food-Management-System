const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodType: { 
    type: String, 
    enum: ['rice', 'vegetables', 'groceries', 'fruits', 'cooked food', 'other'],
    required: true 
  },
  quantity: { type: String, required: true },
  notes: { type: String, default: '' },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: { type: String, required: true }
  },
  pickupTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'assigned', 'picked-up', 'delivered'], 
    default: 'pending' 
  },
  acceptedByOrg: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Create 2dsphere index for geospatial queries
donationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Donation', donationSchema);
