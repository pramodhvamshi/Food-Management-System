import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(helmet()); // Security headers for better protection
app.use(cors({
  origin: ["http://localhost:3000", "http://yourfrontend.com"], // Allow frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true // Allow cookies & authentication headers
}));
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies
app.use(morgan("dev")); // Logs API requests

// Serve Static Files (for profile uploads)
app.use("/uploads", express.static("uploads")); // Ensure uploads folder is accessible

// Routes
app.use('/api/auth', authRoutes); // Authentication Routes (Login, Signup, Profile)
app.use('/api/donations', donationRoutes); // Donation Routes
app.use('/api/admin', adminRoutes); // Admin Panel Routes

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Food Donation API Running...' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
