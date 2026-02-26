const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");

// Get all inquiries
router.get("/", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create inquiry
router.post("/", async (req, res) => {
  const inquiry = new Inquiry(req.body);
  try {
    const newInquiry = await inquiry.save();
    res.status(201).json(newInquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update inquiry status
router.patch("/:id", async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
