const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Residential", "Commercial"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    default: 0,
  },
  bathrooms: {
    type: Number,
    default: 0,
  },
  features: [
    {
      type: String,
    },
  ],
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Sold", "Coming Soon"],
    default: "Available",
  },
  images: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  sqft: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", propertySchema);
