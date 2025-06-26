import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Snackbar,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { CalendarToday as CalendarTodayIcon } from "@mui/icons-material";
import { doctorService } from "../services/doctorService";
import { appointmentService } from "../services/appointmentService";
import axios from "axios";
import moment from "moment";

function BookAppointment() {
  const [appointmentDetails, setAppointmentDetails] = useState({
    patientName: "",
    doctor: "",
    date: "",
    symptomsDescription: "",
    serviceType: "",
    consultationDuration: "",
    examinationType: "",
    age: "",
    placeOfBirth: "",
    addressForExamination: "",
    timeSlot: "",
  });

  const [price, setPrice] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorSchedule, setSelectedDoctorSchedule] = useState([]);
  const [bookedSlots, setBookedSlots] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const servicePrices = React.useMemo(
    () => ({
      Consultation: {
        30: 150000,
        60: 250000,
      },
      Examination: 250000,
    }),
    []
  );

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctorService.getAllDoctors();
        setDoctors(data);
      } catch (err) {
        setError(err.message || "Error fetching doctors");
        setSnackbarMessage(err.message || "Error fetching doctors");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (appointmentDetails.doctor) {
      fetchDoctorSchedule(appointmentDetails.doctor);
      fetchBookedSlots(appointmentDetails.doctor, appointmentDetails.date);
    }
  }, [appointmentDetails.doctor, appointmentDetails.date]);

  const fetchDoctorSchedule = async (doctorId) => {
    try {
      const doctor = await doctorService.getDoctorById(doctorId);
      setSelectedDoctorSchedule(doctor.workSchedule || []);
    } catch (err) {
      setError(err.message || "Error fetching doctor schedule");
      setSnackbarMessage(err.message || "Error fetching doctor schedule");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const fetchBookedSlots = async (doctorId, date) => {
    if (!date) return;
    try {
      console.log(`Fetching booked slots for doctor ${doctorId} on ${date}`);
      const appointments = await appointmentService.getByDoctorAndDate(doctorId, date);
      console.log("Appointments fetched:", appointments);
      const booked = new Set(appointments.map((a) => a.timeSlot));
      console.log("Booked slots:", Array.from(booked));
      setBookedSlots(booked);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
      setError("Failed to fetch booked slots");
      setSnackbarMessage("Failed to fetch booked slots");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (
      appointmentDetails.serviceType === "Consultation" &&
      appointmentDetails.consultationDuration
    ) {
      setPrice(
        servicePrices["Consultation"][appointmentDetails.consultationDuration]
      );
    } else if (appointmentDetails.serviceType === "Examination") {
      setPrice(servicePrices["Examination"]);
    } else {
      setPrice(0);
    }
  }, [
    appointmentDetails.serviceType,
    appointmentDetails.consultationDuration,
    servicePrices,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    setError(null); // Reset error state when closing snackbar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const day = new Date(appointmentDetails.date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const schedule = selectedDoctorSchedule.find((s) => s.days.includes(day));
    if (!schedule || !schedule.slots) {
      setSnackbarMessage("No schedule available for this day.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const finalDuration = appointmentDetails.serviceType === "Examination"
      ? "30"
      : appointmentDetails.consultationDuration;
    const slotsToBook = finalDuration === "60" ? 2 : 1;
    const timeSlots = [];
    let currentSlot = appointmentDetails.timeSlot;
    for (let i = 0; i < slotsToBook; i++) {
      if (!schedule.slots.some((s) => s.time === currentSlot)) {
        setSnackbarMessage("Selected time slot is invalid.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      if (bookedSlots.has(currentSlot)) {
        setSnackbarMessage("One or more selected time slots are already booked.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      timeSlots.push(currentSlot);
      if (i < slotsToBook - 1) {
        const [start, end] = currentSlot.split("-");
        const nextStart = moment(end, "HH:mm").add(30, "minutes").format("HH:mm");
        currentSlot = `${end}-${nextStart}`;
        if (!schedule.slots.some((s) => s.time === currentSlot)) {
          setSnackbarMessage("Consecutive slots are not available for 60 minutes.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          return;
        }
      }
    }

    try {
      const [startTime] = appointmentDetails.timeSlot.split("-");
      const appointmentDateTime = new Date(
        appointmentDetails.date + "T" + startTime + ":00+07:00"
      );

      const payload = {
        doctorId: appointmentDetails.doctor,
        appointmentDate: appointmentDateTime,
        duration: finalDuration,
        timeSlot: appointmentDetails.timeSlot,
        startTime: startTime,
        patientName: appointmentDetails.patientName,
        symptomsDescription: appointmentDetails.symptomsDescription,
        serviceType: appointmentDetails.serviceType,
        age: appointmentDetails.age,
        placeOfBirth: appointmentDetails.placeOfBirth,
        addressForExamination: appointmentDetails.addressForExamination,
        examinationType: appointmentDetails.examinationType,
      };

      await appointmentService.create(payload);
      await Promise.all(
        timeSlots.map((slot) =>
          axios.put(
            `http://localhost:3000/api/doctors/${appointmentDetails.doctor}/book-slot`,
            { date: appointmentDetails.date, timeSlot: slot },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          )
        )
      );

      setSnackbarMessage("Đặt lịch thành công!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setAppointmentDetails({
        patientName: "",
        doctor: "",
        date: "",
        symptomsDescription: "",
        serviceType: "",
        consultationDuration: "",
        examinationType: "",
        age: "",
        placeOfBirth: "",
        addressForExamination: "",
        timeSlot: "",
      });
    } catch (err) {
      console.error("Error creating appointment:", err);
      setSnackbarMessage(
        err.response?.data?.message || "Có lỗi xảy ra khi đặt lịch"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const getAvailableSlots = () => {
    const day = new Date(appointmentDetails.date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const schedule = selectedDoctorSchedule.find((s) => s.days.includes(day));
    if (!schedule || !schedule.slots) return [];
    return schedule.slots.map((slot) => slot.time).filter(
      (slot) => !bookedSlots.has(slot)
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 4, fontWeight: 600, color: "#333333", textAlign: "center" }}
      >
        Book Appointment
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Paper sx={{ p: 4, boxShadow: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "#4A6D5A",
                mb: 3,
                textAlign: "center",
              }}
            >
              Make an Appointment - Consultation
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} alignItems="flex-start">
                <Grid item xs={12} sm={6}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#333333" }}
                      >
                        Patient Information
                      </Typography>
                      <TextField
                        fullWidth
                        label="Patient's Full Name"
                        name="patientName"
                        value={appointmentDetails.patientName}
                        onChange={handleChange}
                        required
                      />
                    </Box>

                    <Box>
                      <FormControl fullWidth required>
                        <InputLabel id="service-type-label">Service type</InputLabel>
                        <Select
                          labelId="service-type-label"
                          name="serviceType"
                          value={appointmentDetails.serviceType}
                          label="Loại dịch vụ"
                          onChange={handleChange}
                        >
                          <MenuItem value="Consultation">Consultation</MenuItem>
                          <MenuItem value="Examination">Examination</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    {appointmentDetails.serviceType === "Examination" && (
                      <Box>
                        <FormControl component="fieldset" required>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, color: "#333333", mb: 1 }}
                          >
                            Examination Type
                          </Typography>
                          <RadioGroup
                            name="examinationType"
                            value={appointmentDetails.examinationType}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="new"
                              control={<Radio />}
                              label="Khách khám mới"
                            />
                            <FormControlLabel
                              value="revisit"
                              control={<Radio />}
                              label="Khách tái khám"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    )}

                    {appointmentDetails.serviceType === "Consultation" && (
                      <Box>
                        <FormControl component="fieldset" required>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, color: "#333333", mb: 1 }}
                          >
                            Consultation Duration
                          </Typography>
                          <RadioGroup
                            name="consultationDuration"
                            value={appointmentDetails.consultationDuration}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="30"
                              control={<Radio />}
                              label="30 minutes"
                            />
                            <FormControlLabel
                              value="60"
                              control={<Radio />}
                              label="60 minutes"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    )}

                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#333333" }}
                      >
                        Select Doctor
                      </Typography>
                      <FormControl fullWidth required>
                        <InputLabel id="doctor-label">Choose a Doctor</InputLabel>
                        <Select
                          labelId="doctor-label"
                          id="doctor-select"
                          name="doctor"
                          value={appointmentDetails.doctor}
                          label="Choose a Doctor"
                          onChange={handleChange}
                        >
                          {doctors
                            .filter(
                              (doctor) =>
                                doctor.userId &&
                                doctor.userId.fullName &&
                                Array.isArray(doctor.skills) &&
                                doctor.skills.length > 0 &&
                                doctor.skills.every(
                                  (skill) => skill.name && skill.name.trim() !== ""
                                )
                            )
                            .map((doctor) => (
                              <MenuItem key={doctor._id} value={doctor._id}>
                                {doctor.userId.fullName} -{" "}
                                {doctor.skills.map((skill) => skill.name).join(", ")}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>

                    {appointmentDetails.doctor && appointmentDetails.date && (
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, color: "#333333" }}
                        >
                          Select Time Slot
                        </Typography>
                        <FormControl fullWidth required>
                          <InputLabel id="time-slot-label">Time Slot</InputLabel>
                          <Select
                            labelId="time-slot-label"
                            name="timeSlot"
                            value={appointmentDetails.timeSlot}
                            label="Time Slot"
                            onChange={handleChange}
                            sx={{
                              "& .MuiSelect-select": {
                                padding: "10px",
                              },
                              "& .MuiMenuItem-root": {
                                backgroundColor: bookedSlots.has(
                                  appointmentDetails.timeSlot
                                )
                                  ? "#d3d3d3"
                                  : "white",
                                color: bookedSlots.has(appointmentDetails.timeSlot)
                                  ? "#ffffff"
                                  : "#333333",
                                "&:hover": {
                                  backgroundColor: bookedSlots.has(
                                    appointmentDetails.timeSlot
                                  )
                                    ? "#c0c0c0"
                                    : "#f0f0f0",
                                },
                              },
                            }}
                          >
                            {getAvailableSlots().map((slot) => (
                              <MenuItem
                                key={slot}
                                value={slot}
                                disabled={bookedSlots.has(slot)}
                                sx={{
                                  backgroundColor: bookedSlots.has(slot)
                                    ? "#a9a9a9"
                                    : "white",
                                  color: bookedSlots.has(slot)
                                    ? "#ffffff"
                                    : "#333333",
                                  "&:hover": {
                                    backgroundColor: bookedSlots.has(slot)
                                      ? "#888888"
                                      : "#e0e0e0",
                                  },
                                }}
                              >
                                {slot} {bookedSlots.has(slot) && "(Booked)"}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#333333" }}
                      >
                        Select Date
                      </Typography>
                      <TextField
                        fullWidth
                        type="date"
                        name="date"
                        value={appointmentDetails.date}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ shrink: true }}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#333333" }}
                      >
                        Symptoms Description
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="symptomsDescription"
                        value={appointmentDetails.symptomsDescription}
                        onChange={handleChange}
                        placeholder="Please describe your symptoms..."
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#333333" }}
                      >
                        Service Fee
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#4A6D5A" }}>
                        {price.toLocaleString()} VND
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    background: "linear-gradient(45deg, #4A6D5A 30%, #6D8B74 90%)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #3A5C4B 30%, #5A7A63 90%)",
                    },
                    px: 5,
                    py: 1.5,
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Book Appointment
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BookAppointment;