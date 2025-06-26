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
      duration,
      serviceType,
      patientName,
      symptomsDescription,
      age,
      placeOfBirth,
      addressForExamination,
      examinationType,
    } = req.body;
    const userId = req.user.id;

    const isRevisit =
      serviceType === "Examination" && examinationType === "revisit";

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Can not find the doctor" });
    }

    let pricingQuery = { appointmentType: serviceType };
    if (serviceType === "Consultation") {
      if (!duration) {
        return res
          .status(400)
          .json({ message: "Consultation must have a duration (30 or 60)" });
      }
      pricingQuery.duration = duration;
    } else if (serviceType === "Examination") {
      pricingQuery.duration = "30";
    }

    const pricing = await Pricing.findOne(pricingQuery);
    if (!pricing) {
      return res
        .status(400)
        .json({
          message: "No pricing found for this AppointmentType and Duration.",
        });
    }

    const newAppointment = new Appointment({
      userId,
      doctorId,
      appointmentCode: generateAppointmentCode(),
      appointmentDate,
      duration: serviceType === "Consultation" ? duration : undefined,
      appointmentType: serviceType,
      price: pricing.price,
      pricingId: pricing._id,
      isRevisit,
      note: symptomsDescription,
      patientName,
      age,
      placeOfBirth,
      addressForExamination,
      createdAt: new Date(),
    });

    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("Error creating appointment:", err);
    res
      .status(500)
      .json({ message: "Error creating appointment", error: err.message });
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

    // if (!doctorId || !date) {
    //   return res.status(400).json({ message: "Doctor ID and date are required" });
    // }

    const startOfDay = new Date(date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(date).setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
    }).populate("userId", "fullName");

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Error fetching appointments", error: err.message });
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
