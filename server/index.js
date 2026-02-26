const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/dzinex_homes")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/properties", require("./routes/properties"));
app.use("/api/inquiries", require("./routes/inquiries"));
app.use("/api/contact", require("./routes/contact"));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server is running",
    company: "Dzinex Hybrid Construction Ltd",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
