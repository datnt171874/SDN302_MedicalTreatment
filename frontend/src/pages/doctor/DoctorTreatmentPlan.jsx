import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

const DoctorTreatmentPlan = () => {
  const [plan, setPlan] = useState("");
  const [medications, setMedications] = useState("");
  const [notes, setNotes] = useState("");
  const [medicalRecord, setMedicalRecord] = useState("");
  const [testResults, setTestResults] = useState("");

  const handleSave = () => {
    // Gửi dữ liệu đến API hoặc lưu trữ local state
    console.log({ plan, medications, notes, medicalRecord, testResults });
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 6, minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            color="black"
          >
            Hồ sơ điều trị
          </Typography>
          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phác đồ điều trị"
                multiline
                rows={4}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ghi chú thuốc / đơn kê"
                multiline
                rows={3}
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nhật ký khám bệnh"
                multiline
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Thông tin bệnh án (Medical Records)"
                multiline
                rows={3}
                value={medicalRecord}
                onChange={(e) => setMedicalRecord(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Kết quả xét nghiệm (Test Results)"
                multiline
                rows={3}
                value={testResults}
                onChange={(e) => setTestResults(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Lưu hồ sơ
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DoctorTreatmentPlan;
