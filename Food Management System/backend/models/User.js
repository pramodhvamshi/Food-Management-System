import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  // Ensures no leading/trailing spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,  // Converts email to lowercase
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Ensures password is at least 6 characters long
  },
  role: {
    type: String,
    enum: ['donor', 'ngo', 'admin'],
    default: 'donor',  // Default role set to 'donor'
  },
  address: {
    type: String,
    required: false,
    default: '',  // Address is optional
  },
  phone: {
    type: String,
    required: false,
    match: /^\d{10}$/,  // Phone must be exactly 10 digits
    default: '',  // Phone is optional
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
