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

const StaffTreatmentPlans = () => {
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTreatmentPlans();
  }, []);

  const fetchTreatmentPlans = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Không tìm thấy token xác thực");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        "http://localhost:3000/api/appointment/treatment-plan",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTreatmentPlans(response.data);
      setLoading(false);
    } catch (err) {
      setError("Không thể tải danh sách treatment plans");
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
        Danh sách Kế hoạch điều trị
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
                <TableCell>Phác đồ</TableCell>
                <TableCell>Ngày bắt đầu</TableCell>
                <TableCell>Ngày kết thúc</TableCell>
                <TableCell>Bác sĩ điều trị</TableCell>
                <TableCell>Ghi chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {treatmentPlans.map((plan) => (
                <TableRow key={plan._id}>
                  <TableCell>{plan.userId?.fullName || "N/A"}</TableCell>
                  <TableCell>{plan.regimen || "N/A"}</TableCell>
                  <TableCell>
                    {plan.startDate
                      ? moment(plan.startDate).format("DD/MM/YYYY")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {plan.endDate
                      ? moment(plan.endDate).format("DD/MM/YYYY")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {plan.doctorId?.userId?.fullName || "N/A"}
                  </TableCell>
                  <TableCell>{plan.notes || ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default StaffTreatmentPlans;
