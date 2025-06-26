import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Container,
  Avatar,
  Chip,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const DoctorPatientDetail = () => {
  const patient = {
    isAnonymous: true,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    code: "BN123456",
    gender: "Nam",
    dob: "01/01/1980",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    treatmentPlan: "Phác đồ điều trị ARV giai đoạn ổn định",
    appointments: ["12/06/2025 - 10:00", "15/06/2025 - 14:00"],
    testResults: ["CD4: 580 tế bào/mm³", "Tải lượng virus: Không phát hiện"],
    reminders: ["Tái khám định kỳ vào 15/06", "Uống thuốc ARV đúng giờ"],
  };

  const displayName = patient.isAnonymous ? "Bệnh nhân ẩn danh" : patient.name;
  const displayEmail = patient.isAnonymous ? "Không hiển thị" : patient.email;
  const displayPhone = patient.isAnonymous ? "Không hiển thị" : patient.phone;
  const displayAddress = patient.isAnonymous
    ? "Không hiển thị"
    : patient.address;

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
          Patient Details
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

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Patient Basic Info */}
          <Grid item xs={12} md={4}>
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
                  background:
                    "linear-gradient(135deg, #4A6D5A 0%, #6B8E7A 100%)",
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
                  Basic Information
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "#4A6D5A",
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={600}>
                      {displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {patient.code}
                    </Typography>
                    <Chip
                      label={patient.isAnonymous ? "Anonymous" : "Identified"}
                      size="small"
                      color={patient.isAnonymous ? "warning" : "success"}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {displayEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {displayPhone}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Gender
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {patient.gender}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Date of Birth
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {patient.dob}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {displayAddress}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Treatment Info */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Treatment Plan */}
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
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    <LocalHospitalIcon sx={{ fontSize: 28, color: "white" }} />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      fontSize: "1.25rem",
                    }}
                  >
                    Current Treatment Plan
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="body1" paragraph>
                    {patient.treatmentPlan}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#4A6D5A",
                      color: "#4A6D5A",
                      "&:hover": {
                        borderColor: "#3A5D4A",
                        bgcolor: "rgba(74, 109, 90, 0.1)",
                      },
                    }}
                  >
                    View Full Treatment History
                  </Button>
                </CardContent>
              </Card>

              {/* Test Results */}
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
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    <CalendarTodayIcon sx={{ fontSize: 28, color: "white" }} />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      fontSize: "1.25rem",
                    }}
                  >
                    Test Results
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  {patient.testResults.map((result, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        mb: 1,
                        bgcolor: "#f8f9fa",
                        borderRadius: 2,
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    >
                      <Typography variant="body1">{result}</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>

              {/* Reminders */}
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
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    <NotificationsActiveIcon
                      sx={{ fontSize: 28, color: "white" }}
                    />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      fontSize: "1.25rem",
                    }}
                  >
                    Reminders
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  {patient.reminders.map((reminder, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        mb: 1,
                        bgcolor: "#f8f9fa",
                        borderRadius: 2,
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    >
                      <Typography variant="body1">{reminder}</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DoctorPatientDetail;
