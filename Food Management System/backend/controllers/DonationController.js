import Donation from '../models/Donation.js';

// Helper function for responses
const sendResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({ message, data });
};

// ✅ Create a donation (Only Donors)
export const createDonation = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user);
    console.log("Request Body:", req.body);

    const { foodItems, address, phone } = req.body;

    if (!foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
      return sendResponse(res, 400, 'At least one food item is required');
    }

    if (!address || !phone) {
      return sendResponse(res, 400, 'Address and phone number are required');
    }

    const donation = new Donation({
      donor: req.user.id,
      foodItems,
      address,
      phone
    });

    await donation.save();
    sendResponse(res, 201, 'Donation created successfully', donation);
  } catch (error) {
    console.error("Error creating donation:", error);
    sendResponse(res, 500, 'Failed to create donation');
  }
};

// ✅ Get all donations (NGOs & Admins see all, Donors see their own)
export const getDonations = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user);
    
    let donations;
    
    if (req.user.role === "donor") {
      // Donors should only see their own donations
      donations = await Donation.find({ donor: req.user.id }).populate('donor', 'name email');
    } else {
      // NGOs & Admins see all donations
      donations = await Donation.find().populate('donor', 'name email');
    }

    sendResponse(res, 200, 'Donations fetched successfully', donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    sendResponse(res, 500, 'Failed to fetch donations');
  }
};

// ✅ Get a specific donation by ID (Only NGOs & Admins)
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('donor', 'name email');
    if (!donation) {
      return sendResponse(res, 404, 'Donation not found');
    }
    sendResponse(res, 200, 'Donation fetched successfully', donation);
  } catch (error) {
    console.error("Error fetching donation by ID:", error);
    sendResponse(res, 500, 'Failed to fetch donation');
  }
};

// ✅ Get donations of the logged-in donor (Only Donors)
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id }).populate('donor', 'name email');
    sendResponse(res, 200, 'Fetched donations successfully', donations);
  } catch (error) {
    console.error("Error fetching my donations:", error);
    sendResponse(res, 500, 'Failed to fetch donations');
  }
};

// ✅ Update donation status (Only NGOs & Admins)
export const updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'accepted', 'delivered'].includes(status)) {
      return sendResponse(res, 400, 'Invalid status update');
    }

    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return sendResponse(res, 404, 'Donation not found');
    }

    console.log("Request Body:", req.body);
    donation.status = status;
    await donation.save();

    sendResponse(res, 200, 'Donation status updated successfully', donation);
  } catch (error) {
    console.error("Error updating donation status:", error);
    sendResponse(res, 500, 'Failed to update donation status');
  }
};
