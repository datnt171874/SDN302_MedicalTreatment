const Doctor = require('../models/Doctor')
const User = require('../models/User')
const createDoctor = async(req, res) => {
    const {userId, certificates, experiences, skills, workschedule} = req.body;
    const userID = await User.findById(userId)
    const newDoctor = new Doctor({
        userId: userID,
        certificates,
        experiences,
        skills,
        workschedule
    })

    await newDoctor.save();
    res.status(201).json({message: `Doctor `})
}

module.exports = {createDoctor}