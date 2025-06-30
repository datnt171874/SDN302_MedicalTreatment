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
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import moment from "moment";

const StaffMedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Không tìm thấy token xác thực");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        "http://localhost:3000/api/medical-records",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMedicalRecords(response.data);
      setLoading(false);
    } catch (err) {
      setError("Không thể tải danh sách medical records");
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
        Danh sách Hồ sơ y tế
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
                <TableCell>Bệnh nhân</TableCell>
                <TableCell>Bác sĩ</TableCell>
                <TableCell>Chẩn đoán</TableCell>
                <TableCell>Ngày khám</TableCell>
                <TableCell>Ghi chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalRecords.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.userId?.fullName || "N/A"}</TableCell>
                  <TableCell>
                    {record.doctorId?.userId?.fullName || "N/A"}
                  </TableCell>
                  <TableCell>{record.diagnosis || "N/A"}</TableCell>
                  <TableCell>
                    {record.recordDate
                      ? moment(record.recordDate).format("DD/MM/YYYY")
                      : "N/A"}
                  </TableCell>
                  <TableCell>{record.notes || ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default StaffMedicalRecords;
