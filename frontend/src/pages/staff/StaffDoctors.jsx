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

const StaffDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Không tìm thấy token xác thực");
        setLoading(false);
        return;
      }
      const response = await axios.get("http://localhost:3000/api/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
      setLoading(false);
    } catch (err) {
      setError("Không thể tải danh sách bác sĩ");
      setLoading(false);
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
        Danh sách Bác sĩ
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
                <TableCell>Tên bác sĩ</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Chuyên môn</TableCell>
                <TableCell>Số điện thoại</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor._id}>
                  <TableCell>{doctor.userId?.fullName || "N/A"}</TableCell>
                  <TableCell>{doctor.userId?.email || "N/A"}</TableCell>
                  <TableCell>
                    {doctor.skills && doctor.skills.length > 0
                      ? doctor.skills.map((skill) => skill.name).join(", ")
                      : "N/A"}
                  </TableCell>
                  <TableCell>{doctor.userId?.phone || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default StaffDoctors;
