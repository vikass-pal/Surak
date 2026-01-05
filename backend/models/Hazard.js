const mongoose = require('mongoose');

const HazardSchema = new mongoose.Schema({
  hazardCategory: {
    type: String,
    required: [true, 'Please add a hazard category'],
  },
  hazardType: {
    type: String,
    required: [true, 'Please add a hazard type'],
  },
  location: {
    latitude: {
      type: Number,
      required: [true, 'Please add latitude'],
    },
    longitude: {
      type: Number,
      required: [true, 'Please add longitude'],
    },
    address: {
      type: String,
      required: [true, 'Please add address'],
    },
  },
  severity: {
    type: String,
    required: [true, 'Please add a severity level'],
    enum: ['low', 'medium', 'high', 'critical'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    minlength: [50, 'Description must be at least 50 characters'],
  },
  media: [{
    type: String,
  }],
  contactInfo: {
    name: String,
    phone: String,
    email: String,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'resolved', 'rejected'],
    default: 'pending',
  },
  reportId: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

// Create report ID before saving
HazardSchema.pre('save', function(next) {
  if (!this.reportId) {
    this.reportId = `HR-${Date.now().toString().slice(-6)}`;
  }
  next();
});

module.exports = mongoose.model('Hazard', HazardSchema);
