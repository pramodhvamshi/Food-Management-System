const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');

const authRoutes = require('./routes/authRoutes');
const donorRoutes = require('./routes/donorRoutes');
const orgRoutes = require('./routes/orgRoutes');
const agentRoutes = require('./routes/agentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const createDefaultAdmin = async () => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const adminExists = await User.findOne({ email: 'admin@fooddonation.com' });
      if (!adminExists) {
        await User.create({
          name: 'System Admin',
          email: 'admin@fooddonation.com',
          password: 'admin123',
          role: 'admin',
          phone: '1234567890',
          address: 'System',
          location: {
            type: 'Point',
            coordinates: [0, 0]
          }
        });
        console.log('Default Admin account created successfully');
      }
    }
  } catch (error) {
    console.error('Failed to create default admin account', error);
  }
};

const mongoose = require('mongoose');
mongoose.connection.once('open', () => {
  createDefaultAdmin();
});

app.use('/api/auth', authRoutes);
app.use('/api/donations', orgRoutes);    
app.use('/api/donations', adminRoutes);  
app.use('/api/donations', donorRoutes);  // Must be last since it contains /:id
app.use('/api/users', adminRoutes);      
app.use('/api/agent', agentRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
