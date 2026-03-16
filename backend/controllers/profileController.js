const User = require('../models/User');
const OrganizationProfile = require('../models/OrganizationProfile');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    let responseData = { ...user._doc };

    if (user.role === 'organization') {
      const orgProfile = await OrganizationProfile.findOne({ createdBy: user._id });
      if (orgProfile) {
        responseData.orgProfile = orgProfile;
      }
    }

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      
      if (req.body.profilePhoto !== undefined) user.profilePhoto = req.body.profilePhoto;
      if (req.body.availabilityStatus) user.availabilityStatus = req.body.availabilityStatus;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      let responseData = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
        profilePhoto: updatedUser.profilePhoto,
        availabilityStatus: updatedUser.availabilityStatus
      };

      if (user.role === 'organization' && req.body.orgProfile) {
        const orgProfileBody = req.body.orgProfile;
        const orgProfile = await OrganizationProfile.findOne({ createdBy: user._id });
        if (orgProfile) {
          orgProfile.orgName = orgProfileBody.orgName || orgProfile.orgName;
          orgProfile.description = orgProfileBody.description || orgProfile.description;
          if (orgProfileBody.location) orgProfile.location = orgProfileBody.location;
          const updatedOrgProfile = await orgProfile.save();
          responseData.orgProfile = updatedOrgProfile;
        } else {
          // Robust fallback: if organization profile got deleted or missed during registration
          const newOrgProfile = await OrganizationProfile.create({
            orgName: orgProfileBody.orgName || user.name,
            description: orgProfileBody.description || 'No description provided',
            location: orgProfileBody.location || user.location,
            contactEmail: user.email,
            phone: user.phone,
            createdBy: user._id
          });
          responseData.orgProfile = newOrgProfile;
        }
      }

      res.json(responseData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };
