const Doctor = require("../models/Doctor");
const User = require("../models/User");

const createDoctor = async (req, res) => {
  try {
    if (!["Admin", "Manager"].includes(req.user?.roleName)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Only Admin, Manager can create doctor" });
    }
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
      workschedule,
    } = req.body;

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
      workschedule: workschedule || { days: [], hours: { start: "", end: "" } },
    });
    await doctor.save();
    res.status(201).json("Successfully Create Doctor");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating doctor", error: error.message });
  }
};

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().populate(
      "userId",
      "fullName email phone roleName"
    );
    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Can not fetch doctors", error: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "userId",
      "fullName email phone roleName"
    );
    if (!doctor) {
      return res.status(404).json({ message: "Can not find doctor" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching doctor", error: error.message });
  }
};

const getDoctorByUserId = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.params.userId }).populate(
      "userId",
      "fullName email phone roleName"
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching doctor", error: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
<<<<<<< HEAD
    if (!["Admin", "Manager"].includes(req.user?.roleName)) {
      return res.status(403).json({
        message: "Forbidden: Only Admin or Manager can update doctors",
      });
    }

    const {
      certificates,
      experiences,
      skills,
      workSchedule,
      fullName,
      email,
      phone,
      address,
    } = req.body;
=======
    // if (!["Admin", "Manager", "Doctor"].includes(req.user?.Role)) {
    //   return res.status(403).json({ message: "Forbidden: Only Admin or Manager or Doctor can update doctors" });
    // }
    console.log("Update request body:", JSON.stringify(req.body, null, 2));

    const doctor = await Doctor.findById(req.params.id).populate('userId');
>>>>>>> datnt

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { certificates, experiences, skills, workSchedule, fullName, email, phone, address } = req.body;

    doctor.certificates = certificates ?? doctor.certificates;
    doctor.experiences = experiences ?? doctor.experiences;
    doctor.skills = skills ?? doctor.skills;
    doctor.workSchedule = workSchedule ?? doctor.workSchedule;
    doctor.updatedAt = new Date();

    await doctor.save();

    if (fullName || email || phone || address) {
      await User.findByIdAndUpdate(doctor.userId._id, {
        fullName,
        email,
        phone,
<<<<<<< HEAD
        address,
      });
=======
        address
      }, { new: true });
>>>>>>> datnt
    }

    res.json(doctor);
  } catch (error) {
<<<<<<< HEAD
    res
      .status(500)
      .json({ message: "Error updating doctor", error: error.message });
=======
    console.log("Update Doctor Error:", error);
    
    res.status(500).json({ message: "Error updating doctor", error: error.message });
>>>>>>> datnt
  }
};

const deleteDoctor = async (req, res) => {
  try {
    if (req.user?.roleName !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only Admin can delete doctors" });
    }

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await User.findByIdAndDelete(doctor.userId);
    await Doctor.findByIdAndDelete(req.params.id);

    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting doctor", error: error.message });
  }
};

const searchDoctors = async (req, res) => {
  try {
    const { skill, day } = req.query;
    const query = {};

    if (skill) {
      query.skills = { $in: [skill] };
    }
    if (day) {
      query["workSchedule.days"] = { $in: [day] };
    }

    const doctors = await Doctor.find(query).populate(
      "userId",
      "fullName email phone roleName"
    );
    res.json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching doctors", error: error.message });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  searchDoctors,
  getDoctorByUserId,
};
