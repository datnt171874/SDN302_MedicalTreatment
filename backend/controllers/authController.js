const User = require('../models/User.js')
const Doctor = require('../models/Doctor.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const authController = {
    registerController: async (req, res) => {
        try {
            const { userName, password, email, roleName, doctorDetails, fullName, phone, address } = req.body;

            console.log("Received at backend:", { userName, password, email, roleName, doctorDetails, fullName, phone, address });

            if ([userName, password, email].some(field => !field?.trim())) {
                return res.status(400).json({
                    error: "Missing required fields",
                    required: ["userName", "password", "email"]
                });
            }

            const existingUser = await User.findOne({ userName });
            if (existingUser) {
                return res.status(400).json({ error: "Username already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            let finalRoleName = roleName || "Customer";
            if (!roleName && email.includes("@admin.com")) {
                finalRoleName = "Admin";
            } else if (!roleName && email.includes("@doctor.com")) {
                finalRoleName = "Doctor";
            } else if (!roleName && email.includes("@user.com")) {
                finalRoleName = "Customer";
            }
            const newUser = new User({
                userName,
                password: hashedPassword,
                email,
                roleName: finalRoleName,
                fullName,
                phone, 
                address
            });

            const savedUser = await newUser.save();

            if (finalRoleName === "Doctor") {
                const doctorData = {
                    userId: savedUser._id,
                    certificates: doctorDetails?.certificates || [],
                    experiences: doctorDetails?.experiences || [],
                    skills: doctorDetails?.skills || [],
                    workSchedule: doctorDetails?.workSchedule || { days: [], hours: { start: "", end: "" } }
                };

                if (doctorData.certificates) {
                    doctorData.certificates = doctorData.certificates.map(cert => ({
                        name: cert.name || '',
                        issuedBy: cert.issuedBy || '',
                        date: cert.date ? new Date(cert.date) : new Date()
                    }));
                }

                if (doctorData.experiences) {
                    doctorData.experiences = doctorData.experiences.map(exp => ({
                        position: exp.position || '',
                        organization: exp.organization || '',
                        startDate: exp.startDate ? new Date(exp.startDate) : new Date(),
                        endDate: exp.endDate ? new Date(exp.endDate) : null
                    }));
                }

                if (doctorData.skills) {
                    doctorData.skills = doctorData.skills.map(skill => ({
                        name: skill.name || '',
                        level: skill.level || ''
                    }));
                }

                const doctor = new Doctor(doctorData);
                await doctor.save();
            }
            res.status(201).json({
                userId: savedUser._id,
                userName: savedUser.userName,
                email: savedUser.email,
                roleName: savedUser.roleName,
                fullName: savedUser.fullName,
                phone: savedUser.phone,
                address: savedUser.address,
                message: "User registered successfully"
            });
        } catch (error) {
            console.error("Register error:", error);
            res.status(500).json({
                error: "Internal server error",
                message: error.message
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
                    required: ["username", "password"]
                });
            }

            const user = await User.findOne({ userName });
            if (!user) {
                return res.status(401).json({
                    error: "Invalid credentials"
                });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    error: "Invalid credentials"
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.userName,
                    roleName: user.roleName
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                userId: user._id,
                userName: user.userName,
                email: user.email,
                fullName: user.fullName,
                roleName: user.roleName,
                token: token
            });

        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({
                error: "Internal server error",
                message: error.message
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
                message: error.message
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
                message: error.message
            });
        }
    },

    registerDoctorController: async (req, res) => {
        try {
            const { userName, password, email, fullName, phone, address, certificates, experiences, skills, workSchedule } = req.body;
            const existingDoctor = await Doctor.findOne({ $or: [{ userName }, { email }] });
            if (existingDoctor) {
                return res.status(400).json({ message: "Username or Email already exists" })
            }

            const user = new User({
                userName,
                password,
                email,
                fullName,
                phone,
                address,
                roleName: "Doctor",
                isAnonymous: false
            });
            await user.save();

            const doctor = new Doctor({
                userId: user._id,
                certificates: certificates || [],
                experiences: experiences || [],
                skills: skills || [],
                workSchedule: workSchedule || { days: [], hours: { start: "", end: "" } }
            });
            await doctor.save();
            res.status(201).json({ message: "Doctor registed successfully", doctor });
        } catch (error) {
            res.status(500).json({ message: "Error registering doctor", error: error.message });
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
                res.status(401).json({ message: "Wrong password" })
            }

            const token = jwt.sign({
                userId: user._id,
                roleName: user.roleName
            },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            res.status(200).json({ message: "Doctor Login Successfully", token, user: { userId: user._id, roleName: user.roleName, userName: user.userName } });
        } catch (error) {
            res.status(500).json({ message: "Error logining doctor", error: error.message });
        }
    },
}

module.exports = authController