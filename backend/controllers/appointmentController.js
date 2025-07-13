const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Pricing = require("../models/Pricing");

const generateAppointmentCode = () => {
  return `C-${Math.floor(1000 + Math.random() * 9000)}`;
};       //${Date.now()}-

const createAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      appointmentDate,
      timeSlot,
      duration,
      appointmentType,
      price,
      isRevisit,
      pricingId,
      // patientName,
      note,
      appointmentCode,
      isAnonymous,
    } = req.body;

    // Validate required fields
    if (!doctorId || !appointmentDate || !timeSlot || !appointmentType || !price || !pricingId || !appointmentCode) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (appointmentType === "Examination" && isRevisit === undefined) {
      return res.status(400).json({ message: "isRevisit is required for Examination" });
    }

    // Validate pricingId
    const pricing = await Pricing.findById(pricingId);
    if (!pricing) {
      return res.status(400).json({ message: "Invalid pricingId" });
    }

    // Check for existing appointment
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
      timeSlot,
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Time slot is already booked" });
    }

    // Check for duplicate appointmentCode
    const existingCode = await Appointment.findOne({ appointmentCode });
    if (existingCode) {
      return res.status(400).json({ message: "Appointment code already exists" });
    }

    const appointment = new Appointment({
      userId: req.user.id,
      doctorId,
      appointmentDate,
      timeSlot,
      duration,
      appointmentType,
      price,
      isRevisit: appointmentType === "Examination" ? isRevisit : false,
      pricingId,
      // patientName,
      note,
      appointmentCode: generateAppointmentCode(),
      isAnonymous: isAnonymous || false,
      status: "Pending",
    });

    await appointment.save();

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("userId", "fullName emailAddress")
      .populate({
        path: "doctorId",
        populate: { path: "userId", select: "fullName" },
      });

    res.status(201).json({ message: "Appointment created successfully", appointment: populatedAppointment });
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ message: "Failed to create appointment", error: err.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    let filter = {};
    const { code } = req.query;

    if (code) {
      const appointment = await Appointment.findOne({ appointmentCode: code })
        .populate("userId", "fullName email")
        .populate({
          path: "doctorId",
          populate: { path: "userId", select: "fullName phone email" },
        });

      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      return res.json([appointment]);
    }

    if (req.user.roleName === "Customer") {
      filter = { userId: req.user.id };
    } else if (req.user.roleName === "Doctor") {
      const doctor = await Doctor.findOne({ userId: req.user.id });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor profile not found" });
      }
      filter = { doctorId: doctor._id };
    }

    const appointments = await Appointment.find(filter)
      .populate("userId", "fullName email")
      .populate({
        path: "doctorId",
        populate: { path: "userId", select: "fullName phone email" },
      });

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Error fetching appointments", error: err.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("userId", "fullName email")
      .populate({
        path: "doctorId",
        populate: { path: "userId", select: "fullName phone email" },
      });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (
      req.user.role === "patient" &&
      appointment.userId.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this appointment" });
    }
    res.json(appointment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching appointment", error: err.message });
  }
};
// const getAppointmentsByDoctorAndDate = async (req, res) => {
//   try {
//     const { doctorId, date } = req.query;
//     const startOfDay = new Date(date).setHours(0, 0, 0, 0);
//     const endOfDay = new Date(date).setHours(23, 59, 59, 999);
//     const appointments = await Appointment.find({
//       doctorId,
//       appointmentDate: { $gte: startOfDay, $lte: endOfDay }
//     }).populate('userId', 'fullName');
//     res.json(appointments);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching appointments', error: err.message });
//   }
// };
// const getByDoctorAndDate = async (req, res) => {
//   try {
//     const { doctorId, date } = req.query;
//     const appointments = await Appointment.find({
//       doctorId,
//       appointmentDate: new Date(date).toISOString().split('T')[0]
//     });
//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching appointments", error: error.message });
//   }
// };
const getAppointmentsByDoctorAndDate = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Missing date parameter" });
    }

    console.log(`Querying appointments for doctor ${doctorId} on ${date}`);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const query = {
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
    };
    if (doctorId) {
      query.doctorId = doctorId;
    }

    const appointments = await Appointment.find(query)
      .populate("userId", "fullName emailAddress")
      .populate({
        path: "doctorId",
        populate: { path: "userId", select: "fullName" },
      });

    console.log("Appointments found:", appointments);
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Failed to fetch appointments", error: err.message });
  }
};
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { roleName, id: userId } = req.user;

    if (!id || !status) {
      return res.status(400).json({ message: "Missing appointment ID or status" });
    }

    if (!["Staff", "Doctor"].includes(roleName)) {
      return res.status(403).json({ message: "Forbidden: Only staff or doctors can update appointment status" });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    const updatedAppointment = await Appointment.findById(id)
      .populate("userId", "fullName email")
      .populate("doctorId", "userId");

    res.json({ message: "Appointment updated successfully", appointment: updatedAppointment });
  } catch (err) {
    console.error("Error updating appointment status:", err);
    res.status(500).json({ message: "Failed to update appointment status", error: err.message });
  }
};
const getAppointmentByCode = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "Appointment code is required" });
    }

    const appointment = await Appointment.findOne({ appointmentCode: code })
      .populate("userId", "fullName email")
      .populate({
        path: "doctorId",
        populate: { path: "userId", select: "fullName phone email" },
      });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json([appointment]); 
  } catch (err) {
    console.error("Error fetching appointment by code:", err);
    res.status(500).json({ message: "Error fetching appointment", error: err.message });
  }
};
module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByDoctorAndDate,
  updateAppointmentStatus,
  getAppointmentByCode
};
