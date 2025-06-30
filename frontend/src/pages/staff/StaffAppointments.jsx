import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import moment from "moment";

const StaffAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Không tìm thấy token xác thực");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        "http://localhost:3000/api/appointment",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointments(response.data);
      setLoading(false);
    } catch (err) {
      setError("Không thể tải danh sách appointments");
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Confirmed":
        return "success";
      case "Cancelled":
        return "error";
      case "Completed":
        return "info";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
        Danh sách Lịch hẹn
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Paper sx={{ p: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Mã lịch hẹn</TableCell>
                <TableCell>Bệnh nhân</TableCell>
                <TableCell>Bác sĩ</TableCell>
                <TableCell>Loại lịch hẹn</TableCell>
                <TableCell>Ngày giờ</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>{appointment.appointmentCode}</TableCell>
                  <TableCell>{appointment.userId?.fullName || "N/A"}</TableCell>
                  <TableCell>
                    {appointment.doctorId?.userId?.fullName || "N/A"}
                  </TableCell>
                  <TableCell>{appointment.appointmentType}</TableCell>
                  <TableCell>
                    {moment(appointment.appointmentDate).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default StaffAppointments;
