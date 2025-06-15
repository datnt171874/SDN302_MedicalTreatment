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
  });

  const [price, setPrice] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [doctors, setDoctors] = useState([]);
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
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalDuration =
        appointmentDetails.serviceType === "Examination"
          ? "30" // For Examination, send a valid enum string like "30" or "60"
          : appointmentDetails.consultationDuration; // This is already a string "30" or "60"

      const payload = {
        doctorId: appointmentDetails.doctor,
        appointmentDate: appointmentDetails.date,
        duration: finalDuration, // Send as string
        patientName: appointmentDetails.patientName,
        symptomsDescription: appointmentDetails.symptomsDescription,
        serviceType: appointmentDetails.serviceType,
        age: appointmentDetails.age,
        placeOfBirth: appointmentDetails.placeOfBirth,
        addressForExamination: appointmentDetails.addressForExamination,
        examinationType: appointmentDetails.examinationType,
      };

      await appointmentService.create(payload);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                {/* Left Column */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={3}>
                    {/* Patient Information */}
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

                    {/* Service Type Selection */}
                    <Box>
                      <FormControl fullWidth required>
                        <InputLabel id="service-type-label">
                          Service type
                        </InputLabel>
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

                    {/* Examination Type (only for Examination) - Changed to RadioGroup */}
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

                    {/* Consultation Duration (only for Consultation) */}
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

                    {/* Doctor Selection */}
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#333333" }}
                      >
                        Select Doctor
                      </Typography>
                      <FormControl fullWidth required>
                        <InputLabel id="doctor-label">
                          Choose a Doctor
                        </InputLabel>
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
                                  (skill) =>
                                    skill.name && skill.name.trim() !== ""
                                )
                            )
                            .map((doctor) => (
                              <MenuItem key={doctor._id} value={doctor._id}>
                                {doctor.userId.fullName} -{" "}
                                {doctor.skills
                                  .map((skill) => skill.name)
                                  .join(", ")}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Stack>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={3}>
                    {/* Date Selection */}
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
                      />
                    </Box>

                    {/* Symptoms Description */}
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

                    {/* Price Display */}
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

              {/* Submit Button */}
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#4A6D5A",
                    "&:hover": { backgroundColor: "#3A5C4B" },
                    px: 4,
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
