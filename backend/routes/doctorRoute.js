const express = require('express')
const router = express.Router()

const doctorController = require('../controllers/doctorController')
const {authenticate, authorize} = require('../middlewares/authMiddleware')

router.get("/", authenticate, doctorController.getDoctors)
router.get("/:id", authenticate, doctorController.getDoctorById)
router.get("/user/:userId", authenticate, doctorController.getDoctorByUserId)
router.post("/", authenticate, authorize(['Manager', 'Admin']) ,doctorController.createDoctor)
router.put("/:id", authenticate, doctorController.updateDoctor);
// Example adjustment in doctorRoute.js
router.put('/user/:userId', authenticate, doctorController.updateDoctor);
router.delete("/:id", authenticate, doctorController.deleteDoctor);
router.get("/search", authenticate, doctorController.searchDoctors);
router.post('/book-slot', authenticate, doctorController.bookSlot);
module.exports = router