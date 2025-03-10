import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodItems: [{
    name: String,
    quantity: String
  }],
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'accepted', 'delivered']
  }
}, {
  timestamps: true
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
