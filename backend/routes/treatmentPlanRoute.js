const express = require("express");
const router = express.Router();
const treatmentPlanController = require("../controllers/treatmentPlanController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/treatment-plan", authenticate, treatmentPlanController.createTreatmentPlan);
router.get("/treatment-plan", authenticate, treatmentPlanController.getAllTreatmentPlans); 
router.get("/treatment-plan/:id", authenticate, treatmentPlanController.getTreatmentPlanById);
router.put("/treatment-plan/:id", authenticate, treatmentPlanController.updateTreatmentPlan);

module.exports = router;