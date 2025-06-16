const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");
router.post("/register", authController.registerController);
router.post("/login", authController.loginController);
router.get("/users", authController.getAllUsersController);
router.delete("/users/:id", authController.deleteUserController);
// router.put("/users/:id", authController.updateUserController)
router.post("/doctors/register", authController.registerDoctorController);
router.post("/doctors/login", authController.loginDoctorController);
router.get("/me", authenticate, authController.getMe);
router.put("/me", authenticate, authController.updateMe);
module.exports = router;
