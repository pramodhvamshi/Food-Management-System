# Smart Food Donation Management System

A full-stack MERN application that connects food donors with NGOs, organizations, and volunteers to collect and distribute surplus food to people in need.

## Features
- **Role-based Access Control**: Donor, Organization, Agent, Admin
- **Donation Locking**: Only one organization can accept a pending donation.
- **Workflow Management**: Pending -> Accepted -> Assigned -> Collected
- **Google Maps Integration**: View the location of the donation right from the dashboard.
- **Email Notifications**: Automatic emails sent during acceptance, assignment, and collection.
- **Admin Dashboard**: System overview and capability to dispatch agents to accepted donations.
- **Responsive UI**: Powered by Bootstrap and React-Icons.

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas cluster or local MongoDB instance

## Setup Instructions

### 1. Database Configuration
1. Open the `.env` file that you'll create in the `backend` folder.
2. Ensure you have your MongoDB Connection String ready.

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=super_secret_jwt_key_here
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   *(Note: The server will automatically create a default admin account when connecting to MongoDB: `admin@fooddonation.com` / `admin123`)*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173` (or the port Vite provides)

## Usage Flows
1. **Register as a Donor**: Create a food donation request.
2. **Register as an Organization**: Check "Available Donations" and accept one.
3. **Log in as Admin** (`admin@fooddonation.com`): Go to dashboard and Assign an Agent to the accepted donation.
4. **Register/Log in as Agent**: View "My Assigned Tasks" and mark the donation as Collected once physically picked up.

Enjoy building a better world by reducing food waste!
