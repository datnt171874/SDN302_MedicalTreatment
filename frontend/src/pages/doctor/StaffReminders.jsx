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
} from "@mui/material";
import axios from "axios";
import StaffLayout from "../../components/StaffLayout";

const StaffReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [reminder, setReminder] = useState({
    patientId: "",
    content: "",
    status: "Pending",
  });
  const [message, setMessage] = useState("");

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
    <StaffLayout activeItem="Reminders">
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
          Quản lý lời nhắc
        </Typography>

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
                  setReminder({ ...reminder, patientId: e.target.value })
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
                  setReminder({ ...reminder, content: e.target.value })
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
                <TableRow key={reminder._id || reminder.id}>
                  <TableCell>
                    {reminder.userId?.fullName || reminder.patientId}
                  </TableCell>
                  <TableCell>{reminder.message || reminder.content}</TableCell>
                  <TableCell>{reminder.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </StaffLayout>
  );
};

export default StaffReminders;
