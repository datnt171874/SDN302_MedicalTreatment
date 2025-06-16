const Pricing = require("../models/Pricing"); // Đảm bảo đường dẫn đúng

exports.seedPricingData = async (req, res) => {
  try {
    await Pricing.deleteMany({}); // Xóa dữ liệu cũ nếu có

    const pricingData = [
      { appointmentType: "Consultation", duration: "30", price: 150000 },
      { appointmentType: "Consultation", duration: "60", price: 250000 },
      { appointmentType: "Examination", duration: "30", price: 250000 },
    ];

    await Pricing.insertMany(pricingData);
    res.status(200).json({ message: "Pricing data seeded successfully!" });
  } catch (error) {
    console.error("Error seeding pricing data:", error);
    res
      .status(500)
      .json({ message: "Failed to seed pricing data", error: error.message });
  }
};
