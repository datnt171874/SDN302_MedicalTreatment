import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";
import axios from "axios";

const StaffReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    patientId: "",
    type: "Revisit",
    content: "",
    status: "Pending",
  });
  const [appointmentCode, setAppointmentCode] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch reminders and today's appointments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("No authentication token found");
          return;
        }

        // Fetch reminders
        const remindersResponse = await axios.get("http://localhost:3000/api/reminders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReminders(remindersResponse.data);

        // Fetch today's appointments
        const today = new Date().toISOString().split("T")[0];
        const appointmentsResponse = await axios.get(
          `http://localhost:3000/api/appointment/appointments?date=${today}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAppointments(appointmentsResponse.data);
        console.log("Today's appointments:", appointmentsResponse.data);
        
      } catch (err) {
        setMessage("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  // Handle reminder input change
  const handleReminderChange = (e) => {
    setNewReminder({ ...newReminder, [e.target.name]: e.target.value });
  };

  // Create a new reminder
  const handleCreateReminder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No authentication token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/reminders",
        {
          userId: newReminder.patientId,
          type: newReminder.type,
          reminderDate: new Date().toISOString(),
          message: newReminder.content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReminders([...reminders, response.data.reminder]);
      setNewReminder({ patientId: "", type: "Revisit", content: "", status: "Pending" });
      setMessage("Reminder created successfully");
    } catch (err) {
      setMessage("Error creating reminder");
    }
  };

  // Search appointment by code
  const handleSearchAppointment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/appointments?code=${appointmentCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const appointment = response.data[0];
      if (appointment) {
        setAppointments([appointment]); // Replace list with searched appointment
        setMessage("");
      } else {
        setMessage("Appointment not found");
      }
    } catch (err) {
      setMessage("Error searching appointment");
    } finally {
      setLoading(false);
      setAppointmentCode("");
    }
  };

  // Confirm appointment status
  const handleConfirmAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No authentication token found");
        return;
      }

      await axios.put(
        `http://localhost:3000/api/appointments/${appointmentId}`,
        { status: "Confirmed" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAppointments(
        appointments.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: "Confirmed" } : appt
        )
      );
      setMessage("Appointment confirmed successfully");
    } catch (err) {
      setMessage("Error confirming appointment");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
        Quản lý lời nhắc và Check-in
      </Typography>

      {/* Check-in Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
          Check-in Bệnh nhân
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Mã cuộc hẹn"
              value={appointmentCode}
              onChange={(e) => setAppointmentCode(e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearchAppointment}
              disabled={loading}
            >
              {loading ? "Đang tìm..." : "Tìm kiếm"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Reminder Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
          Gửi lời nhắc cho bệnh nhân
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Mã bệnh nhân</InputLabel>
              <Select
                name="patientId"
                value={newReminder.patientId}
                onChange={handleReminderChange}
                label="Mã bệnh nhân"
              >
                <MenuItem value="BN001">Nguyễn Văn A (BN001)</MenuItem>
                <MenuItem value="BN002">Trần Thị B (BN002)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Loại lời nhắc</InputLabel>
              <Select
                name="type"
                value={newReminder.type}
                onChange={handleReminderChange}
                label="Loại lời nhắc"
              >
                <MenuItem value="Revisit">Tái khám</MenuItem>
                <MenuItem value="Medication">Thuốc</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Nội dung lời nhắc"
              name="content"
              value={newReminder.content}
              onChange={handleReminderChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCreateReminder}
              sx={{ height: "100%" }}
            >
              Gửi
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Appointments Table */}
      <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
        Danh sách cuộc hẹn hôm nay
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã cuộc hẹn</TableCell>
              <TableCell>Bệnh nhân</TableCell>
              <TableCell>Bác sĩ</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt._id}>
                <TableCell>{appt.appointmentCode}</TableCell>
                <TableCell>{appt.userId?.fullName || "Không rõ"}</TableCell>
                <TableCell>{appt.doctorId?.userId?.fullName || "Không rõ"}</TableCell>
                <TableCell>
                  {new Date(appt.appointmentDate).toLocaleString("vi-VN")}
                </TableCell>
                <TableCell>{appt.status}</TableCell>
                <TableCell>
                  {appt.status === "Pending" && (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleConfirmAppointment(appt._id)}
                    >
                      Xác nhận
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reminders Table */}
      <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
        Danh sách lời nhắc đã tạo
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã bệnh nhân</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reminders.map((reminder) => (
              <TableRow key={reminder._id || reminder.id}>
                <TableCell>{reminder.userId?.fullName || reminder.patientId}</TableCell>
                <TableCell>{reminder.type}</TableCell>
                <TableCell>{reminder.message || reminder.content}</TableCell>
                <TableCell>{reminder.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {message && (
        <Alert
          severity={message.includes("successfully") ? "success" : "error"}
          sx={{ mt: 2 }}
        >
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default StaffReminders;