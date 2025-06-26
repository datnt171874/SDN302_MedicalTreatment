import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  CircularProgress
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import axios from "axios";
import moment from "moment";

function MedicalRecords() {
  const [patientInfo, setPatientInfo] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        // Fetch user info
        const userRes = await axios.get(`http://localhost:3000/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatientInfo({
          name: userRes.data.fullName,
          dateOfBirth: moment(userRes.data.dateOfBirth).format("DD/MM/YYYY"),
          gender: userRes.data.gender,
          address: userRes.data.address,
          phone: userRes.data.phone,
          email: userRes.data.email,
        });

        // Fetch medical records
        const recordsRes = await axios.get("http://localhost:3000/api/medical-records", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMedicalRecords(recordsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching medical records:", err);
        setError(err.response?.data?.message || "Failed to fetch medical records");
        setLoading(false);
      }
    };

    if (userId) fetchMedicalRecords();
    else {
      setError("User ID not found. Please log in again.");
      setLoading(false);
    }
  }, [userId]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
        <Typography color="error">Lỗi: {error}</Typography>
      </Box>
    );

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
          Medical Records
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
        {/* Patient Information Card */}
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
                Patient Information
              </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <List dense sx={{ p: 0 }}>
                {patientInfo &&
                  Object.entries({
                    "Full Name": patientInfo.name,
                    "Date of Birth": patientInfo.dateOfBirth,
                    Gender: patientInfo.gender,
                    Address: patientInfo.address,
                    Phone: patientInfo.phone,
                    Email: patientInfo.email,
                  }).map(([label, value], index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#666",
                                fontWeight: 500,
                                mb: 0.25,
                              }}
                            >
                              {label}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#333",
                                fontWeight: 600,
                              }}
                            >
                              {value || "N/A"}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < 5 && <Divider sx={{ my: 0.5, opacity: 0.3 }} />}
                    </React.Fragment>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Medical Records Card */}
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
                  Medical Records
                </Typography>
              </Box>
              <CardContent sx={{ p: 0 }}>
                <TableContainer
                  component={Paper}
                  sx={{ boxShadow: 0, borderRadius: 0 }}
                >
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: "#4A6D5A",
                            py: 1.5,
                            fontSize: "0.9rem",
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: "#4A6D5A",
                            py: 1.5,
                            fontSize: "0.9rem",
                          }}
                        >
                          Diagnosis
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: "#4A6D5A",
                            py: 1.5,
                            fontSize: "0.9rem",
                          }}
                        >
                          Treatment Plan
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: "#4A6D5A",
                            py: 1.5,
                            fontSize: "0.9rem",
                          }}
                        >
                          Next Appointment
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {medicalRecords.map((record, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:hover": { backgroundColor: "#f8f9fa" },
                            transition: "background-color 0.2s ease",
                          }}
                        >
                          <TableCell
                            sx={{
                              py: 1.5,
                              fontWeight: 500,
                              fontSize: "0.85rem",
                            }}
                          >
                            {moment(record.recordDate).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell sx={{ py: 1.5 }}>
                            <Chip
                              label={record.diagnosis || "N/A"}
                              size="small"
                              sx={{
                                bgcolor: "#ffebee",
                                color: "#c62828",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{ py: 1.5, color: "#666", fontSize: "0.85rem" }}
                          >
                            {record.treatmentPlanId
                              ? `${record.treatmentPlanId.regimen} (Start: ${moment(
                                  record.treatmentPlanId.startDate
                                ).format("DD/MM/YYYY")})`
                              : "N/A"}
                          </TableCell>
                          <TableCell
                            sx={{ py: 1.5, color: "#666", fontSize: "0.85rem" }}
                          >
                            {record.treatmentPlanId?.nextAppointmentDate
                              ? moment(record.treatmentPlanId.nextAppointmentDate).format("DD/MM/YYYY")
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* Medications Card */}
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
                  <MedicationIcon sx={{ fontSize: 28, color: "white" }} />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "white",
                    fontSize: "1.25rem",
                  }}
                >
                  Medications
                </Typography>
              </Box>
              <CardContent sx={{ p: 0 }}>
                <TableContainer
                  component={Paper}
                  sx={{ boxShadow: 0, borderRadius: 0 }}
                >
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: "#4A6D5A",
                            py: 1.5,
                            fontSize: "0.9rem",
                          }}
                        >
                          Medication Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: "#4A6D5A",
                            py: 1.5,
                            fontSize: "0.9rem",
                          }}
                        >
                          Dosage
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: "#4A6D5A",
                            py: 1.5,
                            fontSize: "0.9rem",
                          }}
                        >
                          Frequency
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: "#4A6D5A",
                            py: 1.5,
                            fontSize: "0.9rem",
                          }}
                        >
                          Duration
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: "#4A6D5A",
                            py: 1.5,
                            fontSize: "0.9rem",
                          }}
                        >
                          Instructions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {medicalRecords.map((record, index) =>
                        record.prescription ? (
                          <TableRow
                            key={index}
                            sx={{
                              "&:hover": { backgroundColor: "#f8f9fa" },
                              transition: "background-color 0.2s ease",
                            }}
                          >
                            <TableCell
                              sx={{
                                py: 1.5,
                                fontWeight: 500,
                                fontSize: "0.85rem",
                              }}
                            >
                              {record.prescription.medicationName || "N/A"}
                            </TableCell>
                            <TableCell
                              sx={{ py: 1.5, color: "#666", fontSize: "0.85rem" }}
                            >
                              {record.prescription.dosage || "N/A"}
                            </TableCell>
                            <TableCell
                              sx={{ py: 1.5, color: "#666", fontSize: "0.85rem" }}
                            >
                              {record.prescription.frequency || "N/A"}
                            </TableCell>
                            <TableCell
                              sx={{ py: 1.5, color: "#666", fontSize: "0.85rem" }}
                            >
                              {record.prescription.duration || "N/A"}
                            </TableCell>
                            <TableCell
                              sx={{ py: 1.5, color: "#666", fontSize: "0.85rem" }}
                            >
                              {record.prescription.instructions || "N/A"}
                            </TableCell>
                          </TableRow>
                        ) : null
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="body2" sx={{ color: "#666" }}>
          Hồ sơ được cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
        </Typography>
      </Box>
    </Box>
  );
}

export default MedicalRecords;