import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { People, Event, Notifications } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DoctorLayout from "../../components/DoctorLayout";

const DoctorDashboard = () => {
  const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/appointment/appointment",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const today = moment().startOf("day");
        const todayCount = response.data.filter((appt) =>
          moment(appt.appointmentDate).isSame(today, "day")
        ).length;

        setTodayAppointmentsCount(todayCount);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err.response?.data?.message || "Failed to fetch appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <DoctorLayout activeItem="Overview">
      <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
        Trang tổng quan của bác sĩ
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: "#e8f5e9" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <People color="action" />
              <Typography variant="h6" fontWeight={600}>
                Bệnh nhân đang điều trị
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ mt: 2 }}>
              12
            </Typography>
            <Button variant="text" sx={{ mt: 1 }}>
              Xem danh sách
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: "#e3f2fd" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Event color="action" />
              <Typography variant="h6" fontWeight={600}>
                Cuộc hẹn hôm nay
              </Typography>
            </Box>
            {loading ? (
              <Typography variant="h4" sx={{ mt: 2 }}>
                Loading...
              </Typography>
            ) : error ? (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            ) : (
              <Typography variant="h4" sx={{ mt: 2 }}>
                {todayAppointmentsCount}
              </Typography>
            )}
            <Button
              variant="text"
              sx={{ mt: 1 }}
              onClick={() => navigate("/doctor-appointments")}
            >
              Xem lịch hẹn
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: "#fff8e1" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Notifications color="action" />
              <Typography variant="h6" fontWeight={600}>
                Nhắc nhở quan trọng
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ mt: 2 }}>
              3
            </Typography>
            <Button variant="text" sx={{ mt: 1 }}>
              Xem chi tiết
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
