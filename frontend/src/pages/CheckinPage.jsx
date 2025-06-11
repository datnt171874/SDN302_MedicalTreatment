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

function CheckinPage() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const fakePatientData = {
    id: "BN001",
    name: "Nguyễn Văn A",
    gender: "Nam",
    birthDate: "1985-07-15",
    phone: "0912345678",
  };

  const handleSearch = () => {
    if (patientId === "BN001") {
      setPatient(fakePatientData);
      setMessage("");
    } else {
      setPatient(null);
      setMessage("Không tìm thấy bệnh nhân.");
    }
  };

  const handleCheckIn = () => {
    if (!reason) {
      setMessage("Vui lòng nhập lý do khám.");
      return;
    }

    setMessage("Check-in thành công!");
    setPatient(null);
    setPatientId("");
    setReason("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Check-in Khám HIV
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Mã bệnh nhân"
          variant="outlined"
          fullWidth
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Tìm
        </Button>
      </Box>

      {patient && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Thông tin bệnh nhân
            </Typography>
            <Typography>Mã: {patient.id}</Typography>
            <Typography>Tên: {patient.name}</Typography>
            <Typography>Giới tính: {patient.gender}</Typography>
            <Typography>Ngày sinh: {patient.birthDate}</Typography>
            <Typography>SĐT: {patient.phone}</Typography>
          </CardContent>
        </Card>
      )}

      {patient && (
        <Box mb={3}>
          <TextField
            label="Lý do khám"
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
          Xác nhận Check-in
        </Button>
      )}

      {message && (
        <Alert
          severity={message.includes("thành công") ? "success" : "error"}
          sx={{ mt: 3 }}
        >
          {message}
        </Alert>
      )}
    </Container>
  );
}

export default CheckinPage;
