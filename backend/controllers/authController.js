const User = require('../models/User.js')
const Doctor = require('../models/Doctor.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {
    registerController: async (req, res) => {
        try {
            const { userName, password, email, fullName } = req.body
            if (!userName || !password || !email || !fullName) {
                return res.status(400).json({
                    error: "Missing required fields",
                    required: ["userName", "password", "email", "fullName"]
                })
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                userName,
                password: hashedPassword,
                email,
                fullName,
                roleName: role || "Customer"
            })
            const user = await newUser.save();
            res.status(201).json(user)
        } catch (error) {
            console.error("Register error:", error);
            if (error.code === 11000) {
                return res.status(400).json({
                    error: "Username already exists"
                })
            }
            res.status(500).json({
                error: "Internal server error",
                message: error.message
            })
        }
    },

    loginController: async (req, res) => {
        try {
            const { userName, password } = req.body;
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
                id: user._id,
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
            const {userName, password} = req.body;

            const user = await Doctor.findOne({ userName, roleName: "Doctor"});
            if(!user){
                res.status(401).json({message: "Invalid credentials"});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                res.status(401).json({message: "Wrong password"})
            }

            const token = jwt.sign({
                userId: user._id,
                roleName: user.roleName
            },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );
        res.status(200).json({message: "Doctor Login Successfully", token, user: {userId: user._id, roleName: user.roleName, userName: user.userName}});
        } catch (error) {
            res.status(500).json({message: "Error logining doctor", error: error.message});
        }
    },
}

module.exports = authController