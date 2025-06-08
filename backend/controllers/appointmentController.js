const Appointment = require('../models/Appointment')
const Doctor = require('../models/Doctor')
const Pricing = require('../models/Pricing')
const generateAppointmentCode = () => {
    return `C-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

const createAppointment = async (req, res) => {
    const { doctorId, appointmentDate, duration, appointmentType, isRevisit} = req.body;
    const userId = req.user.userId;

    const doctor = await Doctor.findById(doctorId);
    if(!doctor || doctor.roleName !== 'Doctor'){
        res.status(404).json({message: "Can not find the doctor"})
    }
    const pricing = await Pricing.findOne({
        appointmentType,
        duration
    });

    if(!pricing){
        return res.status(400).json({message: "No pricing found for this AppointmentType and Duration"});
    }

    const newAppointment = new Appointment({
        userId,
        doctorId,
        appointmentCode: generateAppointmentCode(),
        appointmentDate,
        duration,
        appointmentType,
        price: pricing.price,
        isAnonymous: false,
        status: "Pending",
        isRevisit,
        createdAt: new Date()
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
}
const getAppointmentByCustomerId = async(req, res) => {
    const {userId } = req.user.id;
    const user = Appointment.find({userId, status: "Confirmed" });
}

module.exports = {createAppointment}
