const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// Get all properties
router.get("/", async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = {};

    if (type) query.type = type;
    if (status) query.status = status;

    const properties = await Property.find(query).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single property
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create property
router.post("/", async (req, res) => {
  const property = new Property(req.body);
  try {
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update property
router.patch("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete property
router.delete("/:id", async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed initial properties
router.post("/seed", async (req, res) => {
  try {
    const sampleProperties = [
      {
        name: "4-Bedroom Duplex",
        type: "Residential",
        location: "Mbora, Karmo District, Abuja",
        bedrooms: 4,
        bathrooms: 5,
        features: [
          "Modern Kitchen",
          "BQ",
          "Swimming Pool",
          "24/7 Security",
          "CCTV",
          "Gen House",
        ],
        price: "₦85,000,000",
        status: "Available",
        description:
          "Luxurious 4-bedroom duplex with state-of-the-art finishes in a prime location.",
        sqft: "350 sqm",
      },
      {
        name: "5-Bedroom Duplex",
        type: "Residential",
        location: "Ochacho Homes, Mbora, Abuja",
        bedrooms: 5,
        bathrooms: 6,
        features: [
          "En-suite Rooms",
          "BQ",
          "Garden",
          "Gated Estate",
          "Tarred Roads",
          "Water Treatment",
        ],
        price: "₦120,000,000",
        status: "Available",
        description:
          "Exquisite 5-bedroom duplex in the prestigious Ochacho Homes estate.",
        sqft: "450 sqm",
      },
      {
        name: "3-Bedroom Terrace",
        type: "Residential",
        location: "Porsche Terrace, Mbora, Abuja",
        bedrooms: 3,
        bathrooms: 4,
        features: [
          "Modern Design",
          "3D Flooring",
          "POP Ceiling",
          "Security",
          "Spacious Compound",
        ],
        price: "₦55,000,000",
        status: "Sold",
        description:
          "Contemporary 3-bedroom terrace with stunning 3D flooring and stamp concrete.",
        sqft: "250 sqm",
      },
      {
        name: "Commercial Plaza",
        type: "Commercial",
        location: "Idu Industrial Layout, Abuja",
        bedrooms: 0,
        bathrooms: 8,
        features: [
          "Multiple Floors",
          "Parking Space",
          "Commercial Zone",
          "High Traffic Area",
          "Elevator",
        ],
        price: "₦250,000,000",
        status: "Available",
        description:
          "Prime commercial property in the heart of Idu Industrial Layout.",
        sqft: "1200 sqm",
      },
      {
        name: "Luxury Villa",
        type: "Residential",
        location: "Maitama, Abuja",
        bedrooms: 6,
        bathrooms: 7,
        features: [
          "Smart Home",
          "Cinema Room",
          "Wine Cellar",
          "Infinity Pool",
          "Rooftop Lounge",
        ],
        price: "₦350,000,000",
        status: "Coming Soon",
        description:
          "Ultra-luxury villa with world-class amenities coming soon to Maitama.",
        sqft: "800 sqm",
      },
      {
        name: "2-Bedroom Apartment",
        type: "Residential",
        location: "Jabi, Abuja",
        bedrooms: 2,
        bathrooms: 3,
        features: [
          "Gym Access",
          "Swimming Pool",
          "Elevator",
          "24/7 Power",
          "Concierge",
        ],
        price: "₦45,000,000",
        status: "Available",
        description:
          "Modern apartment in a serviced complex with premium amenities.",
        sqft: "150 sqm",
      },
    ];

    await Property.deleteMany({});
    const properties = await Property.insertMany(sampleProperties);
    res.json({
      message: "Properties seeded successfully",
      count: properties.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
