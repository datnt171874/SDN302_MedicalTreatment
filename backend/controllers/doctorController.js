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
function generateSlots(startTime, endTime) {
  const slots = [];
  let currentTime = new Date(`2000-01-01 ${startTime}`);
  const end = new Date(`2000-01-01 ${endTime}`);
  while (currentTime < end) {
    const nextTime = new Date(currentTime.getTime() + 30 * 60000);
    if (nextTime <= end) {
      slots.push({
        time: `${currentTime.toTimeString().slice(0, 5)}-${nextTime.toTimeString().slice(0, 5)}`,
        isBooked: false
      });
    }
    currentTime = nextTime;
  }
  return slots;
}
const updateDoctor = async (req, res) => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> datnt
    console.log("Update request body:", JSON.stringify(req.body, null, 2));

    const doctor = await Doctor.findById(req.params.id).populate('userId');
>>>>>>> datnt
=======
    // if (!["Admin", "Manager", "Doctor"].includes(req.user?.Role)) {
    //   return res.status(403).json({ message: "Forbidden: Only Admin or Manager or Doctor can update doctors" });
    // }
    console.log("Update request body:", JSON.stringify(req.body, null, 2));

    const doctor = await Doctor.findById(req.params.id).populate('userId');
>>>>>>> 6ab6a0fa3d20b35c1af12fd7e7bcaaa82b01b3bb

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { certificates, experiences, skills, workSchedule, fullName, email, phone, address } = req.body;

    console.log("Incoming workSchedule:", workSchedule);

    doctor.certificates = certificates !== undefined ? certificates : doctor.certificates;
    doctor.experiences = experiences !== undefined ? experiences : doctor.experiences;
    doctor.skills = skills !== undefined ? skills : doctor.skills;
    doctor.workSchedule = workSchedule
      ? workSchedule.map(ws => ({
          days: ws.days || [],
          hours: ws.hours || { start: "", end: "" },
          slots: ws.hours && ws.hours.start && ws.hours.end
            ? generateSlots(ws.hours.start, ws.hours.end)
            : []
        }))
      : doctor.workSchedule;
    doctor.updatedAt = new Date();

    console.log("Doctor object before save:", doctor.toObject());

    const savedDoctor = await doctor.save();
    console.log("Saved doctor:", savedDoctor.toObject());

    if (fullName || email || phone || address) {
      await User.findByIdAndUpdate(doctor.userId._id, {
        fullName,
        email,
        phone,
<<<<<<< HEAD
<<<<<<< HEAD
        address,
      });
=======
        address
      }, { new: true });
>>>>>>> datnt
=======
        address
      }, { new: true });
>>>>>>> 6ab6a0fa3d20b35c1af12fd7e7bcaaa82b01b3bb
    }

    res.json(savedDoctor);
  } catch (error) {
<<<<<<< HEAD
<<<<<<< HEAD
    res
      .status(500)
      .json({ message: "Error updating doctor", error: error.message });
=======
    console.log("Update Doctor Error:", error);
    res.status(500).json({ message: "Error updating doctor", error: error.message });
>>>>>>> datnt
=======
    console.log("Update Doctor Error:", error);
    
    res.status(500).json({ message: "Error updating doctor", error: error.message });
>>>>>>> 6ab6a0fa3d20b35c1af12fd7e7bcaaa82b01b3bb
  }
};
const bookSlot = async (req, res) => {
  try {
    const { date, timeSlot } = req.body;
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const schedule = doctor.workSchedule.find(s => s.days.includes(day));
    if (!schedule) {
      return res.status(400).json({ message: "No schedule for this day" });
    }

    const slot = schedule.slots.find(s => s.time === timeSlot);
    if (!slot) {
      return res.status(400).json({ message: "Invalid time slot" });
    }

    slot.isBooked = true;
    await doctor.save();

    res.status(200).json({ message: "Slot booked successfully", doctor });
  } catch (error) {
    console.log("Book Slot Error:", error);
    res.status(500).json({ message: "Error booking slot", error: error.message });
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
  bookSlot
};
