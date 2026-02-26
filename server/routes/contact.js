const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Get all contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create contact message
router.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const newContact = await contact.save();
    res.status(201).json({
      message: "Thank you for your message. We will get back to you soon!",
      contact: newContact,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update contact status
router.patch("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
