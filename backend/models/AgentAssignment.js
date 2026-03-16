const mongoose = require('mongoose');

const agentAssignmentSchema = new mongoose.Schema({
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupTime: { type: Date, required: true },
  status: { type: String, enum: ['assigned', 'collected', 'failed'], default: 'assigned' }
}, { timestamps: true });

module.exports = mongoose.model('AgentAssignment', agentAssignmentSchema);
