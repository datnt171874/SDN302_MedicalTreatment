import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import DoctorLayout from "../../components/DoctorLayout";

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
    <DoctorLayout activeItem="Patients">
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          py: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={4} sx={{ p: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
            >
              Hồ sơ bệnh nhân
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Họ tên:</strong> {displayName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Email:</strong> {displayEmail}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Mã bệnh nhân:</strong> {patient.code}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Giới tính:</strong> {patient.gender}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Ngày sinh:</strong> {patient.dob}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Số điện thoại:</strong> {displayPhone}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Địa chỉ:</strong> {displayAddress}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Phác đồ điều trị hiện tại
            </Typography>
            <Typography>{patient.treatmentPlan}</Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Lịch hẹn đã lên
            </Typography>
            <ul>
              {patient.appointments.map((appt, index) => (
                <li key={index}>{appt}</li>
              ))}
            </ul>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Kết quả xét nghiệm
            </Typography>
            <ul>
              {patient.testResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Nhắc nhở đang có
            </Typography>
            <ul>
              {patient.reminders.map((reminder, index) => (
                <li key={index}>{reminder}</li>
              ))}
            </ul>
          </Paper>
        </Container>
      </Box>
    </DoctorLayout>
  );
};

export default DoctorPatientDetail;
