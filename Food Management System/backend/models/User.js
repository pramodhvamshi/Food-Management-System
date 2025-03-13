import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['donor', 'ngo', 'admin'],
    default: 'donor',
  },
  address: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    match: /^\d{10}$/,
    default: '',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
