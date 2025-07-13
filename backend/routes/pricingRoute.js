// routes/pricingRoute.js
const express = require("express");
const router = express.Router();
const Pricing = require("../models/Pricing");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", authenticate, async (req, res) => {
  try {
    const { appointmentType, duration, price } = req.body;
    if (!appointmentType || !price) {
      return res.status(400).json({ message: "Missing appointmentType or price" });
    }

    let pricing = await Pricing.findOne({ appointmentType, duration: duration || "30" });
    if (!pricing) {
      pricing = new Pricing({ appointmentType, duration: duration || "30", price });
      await pricing.save();
    }

    res.status(201).json(pricing);
  } catch (err) {
    console.error("Error creating pricing:", err);
    res.status(500).json({ message: "Failed to create pricing", error: err.message });
  }
});

module.exports = router;