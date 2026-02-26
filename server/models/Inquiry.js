const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  propertyName: {
    type: String,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "Resolved"],
    default: "New",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inquiry", inquirySchema);
