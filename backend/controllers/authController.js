const User = require("../models/User.js");
const Doctor = require("../models/Doctor.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const authController = {
  // registerController: async (req, res) => {
  //     try {
  //         console.log("Received at backend:", req.body);
  //         console.log("Fields received:", { userName, password, email});
  //         const { userName, password, email} = req.body
  //         if (!userName || !password || !email) {
  //             return res.status(400).json({
  //                 error: "Missing required fields",
  //                 required: ["userName", "password", "email"]
  //             })
  //         }
  //         const existingUser = await User.findOne({ userName });
  //         if (existingUser) {
  //             return res.status(400).json({error: "Username already exists"});
  //         }
  //         const salt = await bcrypt.genSalt(10)
  //         const hashedPassword = await bcrypt.hash(password, salt);

  //         const newUser = new User({
  //             userName,
  //             password: hashedPassword,
  //             email,
  //             roleName: "Customer"
  //         })
  //         const user = await newUser.save();
  //         res.status(201).json(user)
  //     } catch (error) {
  //         console.error("Register error:", error);
  //         if (error.code === 11000) {
  //             return res.status(400).json({
  //                 error: "Username already exists"
  //             })
  //         }
  //         res.status(500).json({
  //             error: "Internal server error",
  //             message: error.message
  //         })
  //     }
  // },
  registerController: async (req, res) => {
    try {
      const { userName, password, email } = req.body;

      console.log("Received at backend:", { userName, password, email });

      if ([userName, password, email].some((field) => !field?.trim())) {
        return res.status(400).json({
          error: "Missing required fields",
          required: ["userName", "password", "email"],
        });
      }

      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        userName,
        password: hashedPassword,
        email,
        roleName: "Customer",
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  },

  loginController: async (req, res) => {
    try {
      const { userName, password } = req.body;
      console.log("Login with:", { userName, password });
      if (!userName || !password) {
        return res.status(400).json({
          error: "Missing credentials",
          required: ["username", "password"],
        });
      }

      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.userName,
          roleName: user.roleName,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        id: user._id,
        userName: user.userName,
        email: user.email,
        fullName: user.fullName,
        roleName: user.roleName,
        token: token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  },

  getAllUsersController: async (req, res) => {
    try {
      const users = await User.find().select("-password -__v");
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  },

  deleteUserController: async (req, res) => {
    try {
      const userId = req.params.id;
      console.log("DELETE userId:", req.params.id);

      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
      console.log("User deleted:", user);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  },

  registerDoctorController: async (req, res) => {
    try {
      const {
        userName,
        password,
        email,
        fullName,
        phone,
        address,
        certificates,
        experiences,
        skills,
        workSchedule,
      } = req.body;
      const existingDoctor = await Doctor.findOne({
        $or: [{ userName }, { email }],
      });
      if (existingDoctor) {
        return res
          .status(400)
          .json({ message: "Username or Email already exists" });
      }

      const user = new User({
        userName,
        password,
        email,
        fullName,
        phone,
        address,
        roleName: "Doctor",
        isAnonymous: false,
      });
      await user.save();

      const doctor = new Doctor({
        userId: user._id,
        certificates: certificates || [],
        experiences: experiences || [],
        skills: skills || [],
        workSchedule: workSchedule || {
          days: [],
          hours: { start: "", end: "" },
        },
      });
      await doctor.save();
      res.status(201).json({ message: "Doctor registed successfully", doctor });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering doctor", error: error.message });
    }
  },

  loginDoctorController: async (req, res) => {
    try {
      const { userName, password } = req.body;

      const user = await Doctor.findOne({ userName, roleName: "Doctor" });
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          roleName: user.roleName,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res
        .status(200)
        .json({
          message: "Doctor Login Successfully",
          token,
          user: {
            userId: user._id,
            roleName: user.roleName,
            userName: user.userName,
          },
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error logining doctor", error: error.message });
    }
  },
  getMe: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (err) {
      console.error("getMe error:", err.message);
      res
        .status(500)
        .json({ message: "Error fetching user", error: err.message });
    }
  },
  updateMe: async (req, res) => {
    try {
      const userId = req.user.id;
      const updateFields = req.body;
      // Không cho phép update password qua route này
      delete updateFields.password;
      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
        new: true,
        select: "-password -__v",
      });
      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating user", error: err.message });
    }
  },
};

module.exports = authController;
