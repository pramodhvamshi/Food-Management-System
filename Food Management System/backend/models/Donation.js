import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  foodItems: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true }
    }
  ],
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
    enum: ['pending', 'accepted', 'delivered'],
    default: 'pending'
  }
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
