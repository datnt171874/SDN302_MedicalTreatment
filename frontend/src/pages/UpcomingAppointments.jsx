import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Avatar,
  Grid,
  Container,
  Stack,
  Skeleton,
  Alert,
  Badge,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  EventNote as EventIcon,
  Schedule as ScheduleIcon,
  LocalHospital as HospitalIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import { appointmentService } from "../services/appointmentService";

// Helper: màu theo trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case "Confirmed":
      return "success";
    case "Pending":
      return "warning";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

// Helper: icon theo trạng thái
const getStatusIcon = (status) => {
  switch (status) {
    case "Confirmed":
      return "✓";
    case "Pending":
      return "⏳";
    case "Cancelled":
      return "✕";
    default:
      return "•";
  }
};

function formatDate(dateString) {
  if (!dateString) return "N.A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Gọi API để lấy tất cả appointment của chính người dùng
        const response = await appointmentService.getAll();
        setAppointments(response.data);
      } catch (err) {
        setError(err.message || "Error fetching appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Skeleton
        variant="text"
        width={300}
        height={60}
        sx={{ mx: "auto", mb: 4 }}
      />
      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item}>
            <Card sx={{ height: 280 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Skeleton variant="circular" width={56} height={56} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Skeleton variant="text" width="70%" height={24} />
                      <Skeleton variant="text" width="50%" height={20} />
                    </Box>
                  </Box>
                  <Skeleton variant="rectangular" width="30%" height={24} />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            "& .MuiAlert-icon": { fontSize: 28 },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "#f8f9fa",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#333",
              background: "linear-gradient(135deg, #4A6D5A 0%, #6B8E6F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Upcoming Appointments
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#666",
              fontWeight: 400,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Manage and track your upcoming medical appointments
          </Typography>

          {appointments.length > 0 && (
            <Chip
              icon={<EventIcon />}
              label={`${appointments.length} appointment${
                appointments.length > 1 ? "s" : ""
              }`}
              color="primary"
              variant="outlined"
              sx={{
                mt: 2,
                fontWeight: 600,
                bgcolor: "rgba(74, 109, 90, 0.1)",
                borderColor: "#4A6D5A",
                color: "#4A6D5A",
              }}
            />
          )}
        </Box>

        {/* Content */}
        {appointments.length === 0 ? (
          <Fade in timeout={800}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                border: "1px solid #e0e0e0",
              }}
            >
              <Box sx={{ py: 8, px: 4, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    bgcolor: "rgba(74, 109, 90, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <CalendarIcon sx={{ fontSize: 48, color: "#4A6D5A" }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#333",
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  No Upcoming Appointments
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#666",
                    maxWidth: 400,
                    mx: "auto",
                    lineHeight: 1.6,
                  }}
                >
                  You have no upcoming appointments at this time. Schedule your
                  next appointment to stay on top of your health.
                </Typography>
              </Box>
            </Paper>
          </Fade>
        ) : (
          <Grid container spacing={3}>
            {appointments.map((appointment, index) => (
              <Grid item xs={12} md={6} lg={4} key={appointment._id}>
                <Fade in timeout={600 + index * 100}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #fafbfa 100%)",
                      border: "1px solid #e8ede9",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(74, 109, 90, 0.15)",
                        borderColor: "#4A6D5A",
                      },
                      position: "relative",
                      overflow: "visible",
                    }}
                  >
                    {/* Status Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: 16,
                        zIndex: 1,
                      }}
                    >
                      <Chip
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <span>{getStatusIcon(appointment?.status)}</span>
                            <span>{appointment?.status || "N.A"}</span>
                          </Box>
                        }
                        color={getStatusColor(appointment?.status)}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          boxShadow: 2,
                          "& .MuiChip-label": {
                            px: 1.5,
                            py: 0.5,
                          },
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Stack spacing={3} sx={{ height: "100%" }}>
                        {/* Doctor Info */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2.5,
                          }}
                        >
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  bgcolor: "#4A6D5A",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: "2px solid white",
                                }}
                              >
                                <HospitalIcon
                                  sx={{ fontSize: 12, color: "white" }}
                                />
                              </Box>
                            }
                          >
                            <Avatar
                              src={
                                appointment?.doctorId?.userId?.avatar ||
                                appointment?.doctor?.avatar
                              }
                              sx={{
                                width: 72,
                                height: 72,
                                bgcolor: "#4A6D5A",
                                boxShadow: "0 4px 12px rgba(74, 109, 90, 0.3)",
                                border: "3px solid white",
                              }}
                            >
                              <PersonIcon sx={{ fontSize: 32 }} />
                            </Avatar>
                          </Badge>
                          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Tooltip
                              title={
                                appointment?.doctorId?.userId?.fullName ||
                                appointment?.doctor?.name ||
                                "Unknown Doctor"
                              }
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  color: "#333",
                                  mb: 0.5,
                                  lineHeight: 1.3,
                                  cursor: "default",
                                }}
                              >
                                Dr.{" "}
                                {appointment?.doctorId?.userId?.fullName ||
                                  appointment?.doctor?.fullName ||
                                  appointment?.doctor?.name ||
                                  appointment?.doctorName ||
                                  "Unknown Doctor"}
                              </Typography>
                            </Tooltip>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ flexWrap: "wrap", gap: 0.5 }}
                            >
                              <Chip
                                size="small"
                                label={
                                  appointment?.appointmentType ||
                                  "General Consultation"
                                }
                                sx={{
                                  bgcolor: "rgba(74, 109, 90, 0.1)",
                                  color: "#4A6D5A",
                                  fontWeight: 600,
                                  fontSize: "0.75rem",
                                }}
                              />
                              {appointment?.specialty && (
                                <Chip
                                  size="small"
                                  label={appointment.specialty}
                                  variant="outlined"
                                  sx={{
                                    borderColor: "#4A6D5A",
                                    color: "#4A6D5A",
                                    fontSize: "0.75rem",
                                  }}
                                />
                              )}
                            </Stack>
                          </Box>
                        </Box>

                        {/* Appointment Details */}
                        <Stack spacing={2}>
                          {/* Date & Time Info */}
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              bgcolor: "rgba(74, 109, 90, 0.05)",
                              borderRadius: 2,
                              border: "1px solid rgba(74, 109, 90, 0.15)",
                            }}
                          >
                            <Stack spacing={1.5}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                }}
                              >
                                <CalendarIcon
                                  sx={{ fontSize: 22, color: "#4A6D5A" }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "#666",
                                      fontSize: "0.75rem",
                                      fontWeight: 600,
                                      textTransform: "uppercase",
                                      letterSpacing: 0.5,
                                    }}
                                  >
                                    Date & Time
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color: "#333",
                                      fontWeight: 700,
                                      mb: 0.5,
                                    }}
                                  >
                                    {formatDate(appointment?.appointmentDate)}
                                  </Typography>
                                </Box>
                              </Box>
                            </Stack>
                          </Paper>

                          {/* Duration & Type Info */}
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              bgcolor: "rgba(74, 109, 90, 0.05)",
                              borderRadius: 2,
                              border: "1px solid rgba(74, 109, 90, 0.15)",
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <ScheduleIcon
                                    sx={{ fontSize: 20, color: "#4A6D5A" }}
                                  />
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: "#666",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: 0.5,
                                      }}
                                    >
                                      Duration
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      sx={{ color: "#333", fontWeight: 700 }}
                                    >
                                      {appointment?.duration > 0
                                        ? `${appointment?.duration}m`
                                        : ""}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <EventIcon
                                    sx={{ fontSize: 20, color: "#4A6D5A" }}
                                  />
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: "#666",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: 0.5,
                                      }}
                                    >
                                      Type
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: "#333",
                                        fontWeight: 600,
                                        fontSize: "0.85rem",
                                      }}
                                    >
                                      {appointment?.appointmentType ||
                                        "General"}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Stack>

                        {/* Appointment Note */}
                        <Paper
                          elevation={0}
                          sx={{
                            mt: "auto",
                            p: 2,
                            bgcolor: "#f8f9fa",
                            borderRadius: 2,
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1.5,
                            }}
                          >
                            <EventIcon
                              sx={{ fontSize: 20, color: "#6c757d", mt: 0.2 }}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#6c757d",
                                  fontSize: "0.75rem",
                                  mb: 0.5,
                                  textTransform: "uppercase",
                                  letterSpacing: 0.5,
                                  fontWeight: 600,
                                }}
                              >
                                Reason for Visit
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#333",
                                  lineHeight: 1.6,
                                  fontStyle: appointment?.note
                                    ? "normal"
                                    : "italic",
                                  fontWeight: appointment?.note ? 500 : 400,
                                }}
                              >
                                {appointment?.note ||
                                  appointment?.reason ||
                                  "No specific reason provided"}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      </Stack>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default UpcomingAppointments;
