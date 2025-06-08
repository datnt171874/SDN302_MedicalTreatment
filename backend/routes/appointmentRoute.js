const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');

router.post('/appointment', authenticate, appointmentController.createAppointment)

module.exports = router
