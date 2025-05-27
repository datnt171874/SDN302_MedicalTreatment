const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {
    registerController: async(req, res)=>{
        try {
            const { username, password, email, fullname } = req.body
            if (!username || !password || !email || !fullname) {
                return res.status(400).json({
                    error: "Missing required fields",
                    required: ["username", "password", "email", "fullname"]
                })
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                password: hashedPassword,
                email,
                fullname,
                roleName: "Customer"
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

    loginController: async(req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({
                    error: "Missing credentials",
                    required: ["username", "password"]
                });
            }

            const user = await User.findOne({ username });
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
                    username: user.username,
                    roleName: user.roleName
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                fullname: user.fullname,
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
    }
}

module.exports = authController