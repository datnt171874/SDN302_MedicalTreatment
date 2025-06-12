import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Card,
  CardContent,
  CardActions,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { CalendarToday as CalendarTodayIcon } from "@mui/icons-material";

function BookAppointment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: initial choice, 1: patient info, 2: doctor selection, 3: time selection
  const [appointmentType, setAppointmentType] = useState(""); // "consultation" or "examination"
  const [appointmentDetails, setAppointmentDetails] = useState({
    patientName: "",
    age: "",
    phoneNumber: "",
    address: "",
    symptomsDescription: "",
    doctor: "",
    date: "",
    time: "",
    consultationDuration: "30", // 30 or 60 minutes
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const doctors = [
    {
      id: 1,
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      availableSlots: {
        "2024-03-20": ["09:00", "10:00", "11:00", "14:00", "15:00"],
        "2024-03-21": ["08:00", "09:00", "10:00", "13:00", "16:00", "17:00"],
        "2024-03-22": ["10:00", "11:00", "12:00", "15:00", "16:00"],
      },
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialty: "General Practitioner",
      availableSlots: {
        "2024-03-20": ["08:00", "11:00", "13:00", "16:00"],
        "2024-03-21": ["09:00", "10:00", "14:00", "15:00", "18:00"],
        "2024-03-22": ["08:00", "09:00", "13:00", "14:00"],
      },
    },
    {
      id: 3,
      name: "Dr. David Lee",
      specialty: "Pediatrician",
      availableSlots: {
        "2024-03-20": ["10:00", "12:00", "14:00", "17:00"],
        "2024-03-21": ["08:00", "11:00", "13:00", "16:00", "18:00"],
        "2024-03-22": [
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
        ],
      },
    },
  ];

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    if (appointmentDetails.doctor && appointmentDetails.date) {
      const selectedDoctor = doctors.find(
        (doc) => doc.name === appointmentDetails.doctor
      );
      if (selectedDoctor) {
        const slots =
          selectedDoctor.availableSlots[appointmentDetails.date] || [];
        setAvailableTimeSlots(slots);
        if (!slots.includes(appointmentDetails.time)) {
          setAppointmentDetails((prev) => ({ ...prev, time: "" }));
        }
      }
    }
  }, [appointmentDetails.doctor, appointmentDetails.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Details:", { ...appointmentDetails });
    setSnackbarMessage("Đặt lịch thành công!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleBack = () => {
    if (step === 0) {
      navigate("/user/appointments");
    } else {
      setStep(step - 1);
    }
  };

  const renderInitialChoice = () => (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Card
          sx={{ height: "100%", cursor: "pointer" }}
          onClick={() => {
            setAppointmentType("consultation");
            setStep(1);
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Tư vấn
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tư vấn sức khỏe trực tuyến với bác sĩ chuyên môn
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          sx={{ height: "100%", cursor: "pointer" }}
          onClick={() => {
            setAppointmentType("examination");
            setStep(1);
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Khám bệnh
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Đặt lịch khám trực tiếp tại phòng khám
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderPatientInfo = () => (
    <Paper sx={{ p: 4, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3, textAlign: "center" }}>
        Thông tin bệnh nhân
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStep(2);
        }}
      >
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Họ và tên"
            name="patientName"
            value={appointmentDetails.patientName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Tuổi"
            name="age"
            type="number"
            value={appointmentDetails.age}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phoneNumber"
            value={appointmentDetails.phoneNumber}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={appointmentDetails.address}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Mô tả triệu chứng"
            name="symptomsDescription"
            value={appointmentDetails.symptomsDescription}
            onChange={handleChange}
          />
          {appointmentType === "consultation" && (
            <FormControl component="fieldset" required>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Thời gian tư vấn
              </Typography>
              <RadioGroup
                name="consultationDuration"
                value={appointmentDetails.consultationDuration}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="30"
                  control={<Radio />}
                  label="30 phút"
                />
                <FormControlLabel
                  value="60"
                  control={<Radio />}
                  label="60 phút"
                />
              </RadioGroup>
            </FormControl>
          )}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button variant="outlined" size="large" onClick={handleBack}>
              Quay lại
            </Button>
            <Button type="submit" variant="contained" size="large">
              Tiếp tục
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );

  const renderDoctorSelection = () => (
    <Paper sx={{ p: 4, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3, textAlign: "center" }}>
        Chọn bác sĩ
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStep(3);
        }}
      >
        <Stack spacing={3}>
          <FormControl fullWidth required>
            <InputLabel>Chọn bác sĩ</InputLabel>
            <Select
              name="doctor"
              value={appointmentDetails.doctor}
              label="Chọn bác sĩ"
              onChange={handleChange}
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.name}>
                  {doctor.name} - {doctor.specialty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button variant="outlined" size="large" onClick={handleBack}>
              Quay lại
            </Button>
            <Button type="submit" variant="contained" size="large">
              Tiếp tục
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );

  const renderTimeSelection = () => (
    <Paper sx={{ p: 4, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3, textAlign: "center" }}>
        Chọn thời gian
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            type="date"
            name="date"
            value={appointmentDetails.date}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth required>
            <InputLabel>Chọn giờ</InputLabel>
            <Select
              name="time"
              value={appointmentDetails.time}
              label="Chọn giờ"
              onChange={handleChange}
            >
              {availableTimeSlots.map((slot) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button variant="outlined" size="large" onClick={handleBack}>
              Quay lại
            </Button>
            <Button type="submit" variant="contained" size="large">
              Đặt lịch
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 4, fontWeight: 600, color: "#333333", textAlign: "center" }}
      >
        Đặt lịch khám
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          {step === 0 && renderInitialChoice()}
          {step === 1 && renderPatientInfo()}
          {step === 2 && renderDoctorSelection()}
          {step === 3 && renderTimeSelection()}
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
