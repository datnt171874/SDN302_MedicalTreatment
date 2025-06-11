import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./CheckinPage.css";
function CheckinPage() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const fakePatientData = {
    userId: "BN001",
    fullName: "Nguyễn Văn A",
    gender: "Nam",
    birthDate: "1985-07-15",
    phone: "0912345678",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  };

  const handleSearch = () => {
    if (patientId === "BN001") {
      setPatient(fakePatientData);
      setMessage("");
    } else {
      setPatient(null);
      setMessage("Not found patient! Please check again.");
    }
  };

  const handleCheckIn = () => {
    if (!reason) {
      setMessage("Please enter the reason.");
      return;
    }

    setMessage("Check-in successfully!");
    setPatient(null);
    setPatientId("");
    setReason("");
  };

  return (
    <div className="checkin-container">
      <div className="checkin-content">
        <div className="checkin-head">
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            className="checkin-title"
          >
            Check In Patient
          </Typography>
          <Box display="flex" gap={2} mb={3} className="checkin-search-box">
            <TextField
              label="Patient Code"
              variant="outlined"
              fullWidth
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              // style={{ backgroundColor: "#fff" }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Box>
        </div>
        <div className="checkin-description">
          {patient && (
            <Card sx={{ mb: 3 }} className="patient-info-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Patient Information
                </Typography>
                <Typography>Patient ID: {patient.userId}</Typography>
                <Typography>Full name: {patient.fullName}</Typography>
                <Typography>Gender: {patient.gender}</Typography>
                <Typography>Date of birth: {patient.birthDate}</Typography>
                <Typography>Phone Number: {patient.phone}</Typography>
                <Typography>Address: {patient.address}</Typography>
              </CardContent>
            </Card>
          )}

          {patient && (
            <Box mb={3}>
              <TextField
                label="Reason"
                multiline
                minRows={3}
                fullWidth
                variant="outlined"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Box>
          )}

          {patient && (
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleCheckIn}
            >
              Confirm
            </Button>
          )}

          {message && (
            <Alert
              severity={message.includes("Success") ? "success" : "error"}
              sx={{ mt: 3 }}
            >
              {message}
            </Alert>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CheckinPage;
