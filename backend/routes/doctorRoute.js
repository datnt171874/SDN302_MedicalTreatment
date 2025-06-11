const express = require('express')
const router = express.Router()

const doctorController = require('../controllers/doctorController')
const {authenticate, authorize} = require('../middlewares/authMiddleware')

router.get("/doctors", authenticate, doctorController.getDoctors)
router.get("/doctors/:id", authenticate, doctorController.getDoctorById)
router.post("/doctors", authenticate, authorize(['Manager', 'Admin']) ,doctorController.createDoctor)
router.put("/doctors/:id", authenticate, doctorController.updateDoctor);
router.delete("/doctors/:id", authenticate, doctorController.deleteDoctor);
router.get("/doctors/search", authenticate, doctorController.searchDoctors);
module.exports = router