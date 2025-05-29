const express = require('express')
const router = express.Router()

const doctorController = require('../controllers/doctorController')
const {authenticate} = require('../middlewares/authMiddleware')

router.get("/doctors", doctorController.getDoctors)
router.get("/doctors/:id", doctorController.getDoctorById)
router.post("/doctors", authenticate, doctorController.createDoctor)
router.put("/doctors/:id", authenticate, doctorController.updateDoctor);
router.delete("/doctors/:id", authenticate, doctorController.deleteDoctor);
router.get("/doctors/search", doctorController.searchDoctors);
module.exports = router