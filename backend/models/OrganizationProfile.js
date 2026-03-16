const mongoose = require('mongoose');

const organizationProfileSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  description: { type: String, required: true },
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
  contactEmail: { type: String, required: true },
  phone: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  numberOfDonations: { type: Number, default: 0 }
}, { timestamps: true });

organizationProfileSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('OrganizationProfile', organizationProfileSchema);
