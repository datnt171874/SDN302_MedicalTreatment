const express = require('express')
const router = express.Router()
const reminderController = require('../controllers/reminderController')
const {authenticate} = require("../middlewares/authMiddleware");

router.post("/",authenticate,reminderController.createReminder);
router.get("/", authenticate, reminderController.getAllReminders);
module.exports = router