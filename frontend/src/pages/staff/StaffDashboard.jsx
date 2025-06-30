import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const StaffDashboard = () => {
  const [appointmentCode, setAppointmentCode] = useState("");
  const [foundAppointment, setFoundAppointment] = useState(null);
  const [searching, setSearching] = useState(false);
  const [reminder, setReminder] = useState({
    patientId: "",
    content: "",
    status: "Pending",
  });
  const [reminders, setReminders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("No authentication token found");
          return;
        }
        const response = await axios.get(
          "http://localhost:3000/api/reminders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReminders(response.data);
      } catch (err) {
        setMessage("Failed to fetch reminders");
      }
    };
    fetchReminders();
  }, []);

  const handleSearchAppointment = async () => {
    setSearching(true);
    setFoundAppointment(null);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No authentication token found");
        setSearching(false);
        return;
      }
      const response = await axios.get(
        `http://localhost:3000/api/appointment?code=${appointmentCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const appointment = response.data[0];
      if (appointment) {
        setFoundAppointment(appointment);
      } else {
        setMessage("Không tìm thấy cuộc hẹn với mã này");
      }
    } catch (err) {
      setMessage("Lỗi khi tìm kiếm cuộc hẹn");
    } finally {
      setSearching(false);
    }
  };

  const handleCheckIn = async () => {
    if (!foundAppointment) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No authentication token found");
        setLoading(false);
        return;
      }
      await axios.put(
        `http://localhost:3000/api/appointment/${foundAppointment._id}`,
        { status: "Confirmed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Check-in thành công!");
      setFoundAppointment({ ...foundAppointment, status: "Confirmed" });
    } catch (err) {
      setMessage("Lỗi khi check-in");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReminder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No authentication token found");
        return;
      }
      await axios.post(
        "http://localhost:3000/api/reminders",
        {
          userId: reminder.patientId,
          message: reminder.content,
          reminderDate: new Date().toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReminder({ patientId: "", content: "", status: "Pending" });
      setMessage("Reminder created successfully");
      // Refresh reminders
      const response = await axios.get("http://localhost:3000/api/reminders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReminders(response.data);
    } catch (err) {
      setMessage("Error creating reminder");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
        Trang quản lý của nhân viên
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
              label="Nhập mã cuộc hẹn"
              value={appointmentCode}
              onChange={(e) => setAppointmentCode(e.target.value)}
              disabled={searching}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearchAppointment}
              disabled={searching || !appointmentCode}
            >
              {searching ? "Đang tìm..." : "Tìm kiếm"}
            </Button>
          </Grid>
        </Grid>
        {message && (
          <Alert
            severity={message.includes("thành công") ? "success" : "error"}
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}
        {foundAppointment && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Mã cuộc hẹn</TableCell>
                  <TableCell>Bệnh nhân</TableCell>
                  <TableCell>Ngày giờ</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{foundAppointment.appointmentCode}</TableCell>
                  <TableCell>
                    {foundAppointment.userId?.fullName || "N/A"}
                  </TableCell>
                  <TableCell>
                    {foundAppointment.appointmentDate
                      ? new Date(
                          foundAppointment.appointmentDate
                        ).toLocaleString("vi-VN")
                      : ""}
                  </TableCell>
                  <TableCell>{foundAppointment.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCheckIn}
                      disabled={
                        foundAppointment.status === "Confirmed" || loading
                      }
                    >
                      {loading
                        ? "Đang check-in..."
                        : foundAppointment.status === "Confirmed"
                        ? "Đã check-in"
                        : "Check-in"}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Reminder Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
          Gửi lời nhắc cho bệnh nhân
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Mã bệnh nhân"
              name="patientId"
              value={reminder.patientId}
              onChange={(e) =>
                setReminder({ ...reminder, [e.target.name]: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nội dung lời nhắc"
              name="content"
              value={reminder.content}
              onChange={(e) =>
                setReminder({ ...reminder, [e.target.name]: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCreateReminder}
            >
              Gửi
            </Button>
          </Grid>
        </Grid>
        {message && (
          <Alert
            severity={message.includes("success") ? "success" : "error"}
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}
      </Paper>

      {/* Reminders Table */}
      <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
        Danh sách lời nhắc đã tạo
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã bệnh nhân</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reminders.map((reminder) => (
              <TableRow key={reminder.id}>
                <TableCell>{reminder.patientId}</TableCell>
                <TableCell>{reminder.content}</TableCell>
                <TableCell>{reminder.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StaffDashboard;
