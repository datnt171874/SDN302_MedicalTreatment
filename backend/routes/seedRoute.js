const express = require("express");
const router = express.Router();
const seedController = require("../controllers/seedController");

router.post("/pricing", seedController.seedPricingData);

module.exports = router;
