# 🍱 Smart Food Donation Management System

---

## 🌍 Project Overview

Smart Food Donation Management System is a **modern MERN Stack web platform** designed to reduce food waste by connecting **Food Donors, NGOs (Organizations), and Delivery Agents** using **real-time geolocation and map-based matching**.

The system enables:

- Donors to create food donation requests  
- Organizations to accept nearby donations  
- Agents to pick up and deliver food  
- Real-time tracking of donation lifecycle  

---
## 🌐 Live Deployment

Frontend:  
https://food-management-system-psi.vercel.app

Backend API:  
https://food-management-system-d9mt.onrender.com

----
# 🎯 Project Vision

Millions of tons of food are wasted every day while millions of people struggle with hunger.

This platform aims to **bridge the gap between surplus food and people in need** by creating a **smart location-based food donation ecosystem**.

The platform allows:

- Individuals to donate excess food  
- NGOs to accept nearby donations  
- Agents to pick up and deliver food  
- Real-time tracking of donation status  

---

# 🚀 Key Features

## 👤 Donor

- Register and login securely
- Create food donation requests
- Share live location automatically
- Track donation status
- View donation history
- Manage personal profile

---

## 🏢 Organization (NGO)

- Register organization profile
- View nearby donations on map
- Accept food donations
- Track delivery progress
- Manage donation records
- Organization profile management

---

## 🚚 Delivery Agent

- View assigned pickup tasks
- See nearby donation requests
- Track pickup routes on map
- Update delivery status
- Manage delivery history

---

# 🔄 Donation Workflow

The system follows a **5-stage logistics pipeline**.


Donor creates donation
↓
Status: Pending

Organization accepts donation
↓
Status: Accepted

Admin assigns delivery agent
↓
Status: Assigned

Agent picks up food
↓
Status: Picked-Up

Agent delivers food
↓
Status: Delivered


This ensures **transparent tracking of every donation**.

---

# 📊 System Flow Chart

         ┌──────────────┐
         │   Donor      │
         └──────┬───────┘
                │
                ▼
     Create Donation Request
                │
                ▼
       ┌────────────────┐
       │   Pending      │
       └──────┬─────────┘
              │
              ▼
     Organization Accepts
              │
              ▼
       ┌────────────────┐
       │   Accepted     │
       └──────┬─────────┘
              │
              ▼
        Admin Assigns Agent
              │
              ▼
       ┌────────────────┐
       │   Assigned     │
       └──────┬─────────┘
              │
              ▼
         Agent Pickup
              │
              ▼
       ┌────────────────┐
       │   Picked Up    │
       └──────┬─────────┘
              │
              ▼
         Food Delivered
              │
              ▼
       ┌────────────────┐
       │   Delivered    │
       └────────────────┘

---

# 📍 Location-Based Matching

The system uses **real-time geolocation and MongoDB geospatial queries**.

### Features

- Automatic location detection using browser GPS
- Map visualization using Google Maps
- Nearby donations within **10–15 km radius**
- Fast geospatial queries

### Technologies

- Google Maps API
- MongoDB **2dsphere indexes**
- React Google Maps integration

---

# 🗺️ Interactive Map System

Organizations and agents can view:

- Donor locations
- Nearby donation requests
- Pickup routes
- Delivery destinations

Map markers represent:

- 📍 Donor
- 🏢 Organization
- 🚚 Agent routes

---

# 📊 Dashboard System

Each role has a **custom dashboard** with analytics.

Dashboard statistics include:

- Total donations
- Pending donations
- Accepted donations
- Completed deliveries
- Food saved metrics

Dashboard UI contains:

- Statistic cards
- Map view
- Donation tables
- Quick actions

---

# 👤 User Profiles

Every user has a **profile management system**.

### Donor Profile

- Name
- Email
- Phone
- Address
- Profile Photo
- Location Preview

### Organization Profile

- Organization Name
- Registration Number
- Contact Details
- Address
- Description
- Location

### Agent Profile

- Name
- Phone
- Address
- Availability Status

Users can update profile details and view history.

---

# 🧑‍💻 Technology Stack

## Frontend

- React (Vite)
- React Router
- Axios
- Bootstrap / Tailwind
- React Icons
- Google Maps SDK

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Authentication

- JWT Authentication
- Protected Routes
- Role-Based Access Control

---

## Location Services

- Google Maps API
- Browser Geolocation API
- MongoDB Geospatial Queries

---

# 🏗️ System Architecture


Frontend (React + Vite)
│
│ REST API
▼
Backend (Node.js + Express)
│
│ Mongoose ODM
▼
MongoDB Database
│
│ Geospatial Queries
▼
Location Matching System


---

# 🗄️ Database Design

### Users

Stores:

- Donor accounts
- Organization accounts
- Agent accounts

---

### Donations

Stores:

- Food type
- Quantity
- Location
- Status

---

### Organization Profiles

Stores:

- Organization details
- Contact information
- Location

---

### Agent Assignments

Tracks:

- Pickup tasks
- Delivery routes
- Delivery status

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository


git clone https://github.com/pramodhvamshi/Food-Management-System.git

cd Food-Management-System


---

# Backend Setup


cd backend
npm install


Create `.env` file:


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_MAPS_API_KEY=your_api_key


Start backend server:


npm start


---

# Frontend Setup


cd frontend
npm install
npm run dev


Open application:


http://localhost:5173


---

# 🧪 Example Usage

## Donor Flow

1. Register as donor
2. Create donation request
3. Location auto-detected
4. Wait for NGO acceptance
5. Track delivery status

---

## Organization Flow

1. Register organization
2. View nearby donations on map
3. Accept donation
4. Wait for agent pickup

---

## Agent Flow

1. Login as agent
2. View assigned tasks
3. Navigate to donor
4. Pickup food
5. Deliver to organization

---

# 🔐 Security Features

- JWT Authentication
- Protected API Routes
- Role-based access control
- Secure password hashing
- Atomic donation acceptance

---

# 🔮 Future Enhancements

- AI-based donation prediction
- SMS notifications
- Real-time delivery tracking
- Food quality verification
- Mobile application

---

# 👨‍💻 Author

**Pramodh Vamshi**

GitHub:  
https://github.com/pramodhvamshi

---

# 📜 License

This project is licensed under the **MIT License**.
