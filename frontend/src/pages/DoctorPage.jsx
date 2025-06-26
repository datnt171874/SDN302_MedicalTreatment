import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "../components/Logout";

const DoctorPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDoctorByUserId = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/doctors/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error(
            `Failed to fetch doctor data: ${res.status} - ${res.statusText}`
          );
        }
        const data = await res.json();
        setDoctor(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchDoctorByUserId();
    } else {
      setError("User ID not found. Please log in again.");
      setLoading(false);
    }
  }, [userId]);

  const handleOpenDetail = () => {
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="sm">
          <Typography color="error">Lỗi: {error}</Typography>
          <Logout />
        </Container>
      </Box>
    );
  }

  if (!doctor || !doctor.userId) {
    return (
      <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="sm">
          <Typography>
            Không tìm thấy dữ liệu bác sĩ hoặc thông tin người dùng.
          </Typography>
          <Logout />
        </Container>
      </Box>
    );
  }

  const {
    userId: userInfo,
    certificates,
    skills,
    experiences,
    workSchedule,
  } = doctor;

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: 700,
            color: "#333333",
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Doctor Dashboard
        </Typography>
        <Box
          sx={{
            height: 4,
            width: 80,
            background: "linear-gradient(45deg, #4A6D5A, #6B8E7A)",
            mx: "auto",
            borderRadius: 2,
          }}
        />
      </Box>

      <Grid container spacing={3} sx={{ maxWidth: "1200px", mx: "auto" }}>
        {/* Doctor Info Card */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              borderRadius: 3,
              height: "fit-content",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #4A6D5A 0%, #6B8E7A 100%)",
                p: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  mr: 2,
                  width: 48,
                  height: 48,
                }}
              >
                <PersonIcon sx={{ fontSize: 28, color: "white" }} />
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "white",
                  fontSize: "1.25rem",
                }}
              >
                Doctor Information
              </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar
                  src="https://via.placeholder.com/80"
                  alt={userInfo.userName}
                  sx={{ width: 64, height: 64 }}
                />
                <Box>
                  <Typography fontWeight="bold" fontSize={20}>
                    Dr.{" "}
                    {userInfo.fullName || userInfo.userName || "Doctor Name"}
                  </Typography>
                  <Typography color="text.secondary">
                    {skills?.length > 0 ? (
                      skills.map((s, i) => (
                        <Chip
                          key={i}
                          label={`${s.name} (${s.level})`}
                          sx={{
                            m: 0.5,
                            bgcolor: "#e8f5e9",
                            color: "#2e7d32",
                            fontWeight: 500,
                          }}
                        />
                      ))
                    ) : (
                      <Typography color="text.secondary">
                        No skills data
                      </Typography>
                    )}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <EmailIcon fontSize="small" />
                    <Typography variant="body2">
                      {userInfo.email || "Email"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Today's Appointments Card */}
            <Card
              sx={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #4A6D5A 0%, #5A7D6A 100%)",
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "white",
                    fontSize: "1.25rem",
                  }}
                >
                  Today's Appointments
                </Typography>
              </Box>
              <CardContent sx={{ p: 0 }}>
                {[
                  {
                    name: "Nguyễn Văn Hùng",
                    time: "08:30 | New Patient",
                    symptom: "Symptoms: Cough, mild fever.",
                    status: "Pending",
                    statusColor: "warning",
                  },
                  {
                    name: "Trần Thị Bích",
                    time: "09:45 | Follow-up",
                    symptom: "ARV treatment for 2 months.",
                    status: "Confirmed",
                    statusColor: "success",
                  },
                ].map((appt, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      borderBottom:
                        index < 1 ? "1px solid rgba(0,0,0,0.1)" : "none",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon color="success" />
                      <Typography fontWeight="bold">{appt.name}</Typography>
                      <Chip
                        label={appt.status}
                        size="small"
                        color={appt.statusColor}
                        sx={{ ml: "auto" }}
                      />
                    </Box>
                    <Typography variant="body2" mt={0.5}>
                      {appt.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {appt.symptom}
                    </Typography>
                    <Button
                      size="small"
                      sx={{
                        mt: 1,
                        textTransform: "none",
                        color: "#4A6D5A",
                        "&:hover": {
                          bgcolor: "rgba(74, 109, 90, 0.1)",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="body2" sx={{ color: "#666" }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default DoctorPage;
