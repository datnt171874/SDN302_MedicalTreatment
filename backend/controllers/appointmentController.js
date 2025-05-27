const Appointment = require('../models/Appointment')
const Doctor = require('../models/Doctor')
const generateAppointmentCode = () => {
    return `C-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

const createAppointment =async () => {
    const {userId, doctorId, appointmentDate, duration, appointmentType, isAnonymous} = req.body;
    const userID = req.user.id;
    const doctorID = await Doctor.findById(doctorId)
    const appointment = new Appointment({
        userId: userID,
        doctorId: doctorID,
        appointmentCode: generateAppointmentCode(),
        appointmentDate,
        duration,
        appointmentType,
        price,
        isAnonymous,
    });
}
