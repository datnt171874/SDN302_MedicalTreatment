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
  DialogActions,
  Grid,
  Typography,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Logout from "../components/Logout";
import axios from "axios";
import moment from "moment";

const DoctorPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [openCustomize, setOpenCustomize] = useState(false);
  const [openMedicalRecord, setOpenMedicalRecord] = useState(false);
  const [customPlan, setCustomPlan] = useState({
    regimen: "",
    customRegimen: "", // New field for custom regimen input
    startDate: "",
    endDate: "",
    notes: "",
    userId: "",
    nextAppointmentDate: "",
  });
  const [medicalRecord, setMedicalRecord] = useState({
    userId: "",
    appointmentId: "",
    treatmentPlanId: "",
    diagnosis: "",
    prescription: [
      {
        medicationName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ],
    notes: "",
    recordDate: moment().format("YYYY-MM-DD"),
  });
  const [treatmentPlans, setTreatmentPlans] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDoctorAndAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const doctorRes = await axios.get(`http://localhost:3000/api/doctors/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(doctorRes.data);

        const doctorId = doctorRes.data._id;
        const today = moment().startOf("day").toISOString();
        const appointmentsRes = await axios.get(
          `http://localhost:3000/api/appointment/appointments?doctorId=${doctorId}&date=${today}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppointments(appointmentsRes.data);

        const plansRes = await axios.get("http://localhost:3000/api/appointment/treatment-plan", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTreatmentPlans(plansRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error in fetchDoctorAndAppointments:", err);
        setError(err.response?.data?.message || `Request failed with status ${err.response?.status}`);
        setLoading(false);
      }
    };

    if (userId) fetchDoctorAndAppointments();
    else {
      setError("User ID not found. Please log in again.");
      setLoading(false);
    }
  }, [userId]);

  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => setOpenDetail(false);

  const handleOpenCustomize = (plan = null, patientId = "") => {
    if (plan) {
      setCustomPlan({
        regimen: plan.regimen || "",
        customRegimen: plan.regimen || "",
        startDate: plan.startDate ? moment(plan.startDate).format("YYYY-MM-DD") : "",
        endDate: plan.endDate ? moment(plan.endDate).format("YYYY-MM-DD") : "",
        notes: plan.notes || "",
        userId: plan.userId || "",
        nextAppointmentDate: plan.nextAppointmentDate ? moment(plan.nextAppointmentDate).format("YYYY-MM-DD") : "",
      });
    } else {
      setCustomPlan({
        regimen: "",
        customRegimen: "",
        startDate: "",
        endDate: "",
        notes: "",
        userId: patientId || "",
        nextAppointmentDate: "",
      });
    }
    setOpenCustomize(true);
  };

  const handleCloseCustomize = () => setOpenCustomize(false);

  const handleOpenMedicalRecord = (appointment) => {
    setMedicalRecord({
      userId: appointment.userId._id,
      appointmentId: appointment._id,
      treatmentPlanId: "",
      diagnosis: "",
      prescription: [
        {
          medicationName: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ],
      notes: "",
      recordDate: moment().format("YYYY-MM-DD"),
    });
    setOpenMedicalRecord(true);
  };

  const handleCloseMedicalRecord = () => setOpenMedicalRecord(false);

  const handleAddPrescription = () => {
    setMedicalRecord({
      ...medicalRecord,
      prescription: [
        ...medicalRecord.prescription,
        {
          medicationName: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ],
    });
  };

  const handleRemovePrescription = (index) => {
    setMedicalRecord({
      ...medicalRecord,
      prescription: medicalRecord.prescription.filter((_, i) => i !== index),
    });
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updatedPrescriptions = [...medicalRecord.prescription];
    updatedPrescriptions[index] = {
      ...updatedPrescriptions[index],
      [field]: value,
    };
    setMedicalRecord({
      ...medicalRecord,
      prescription: updatedPrescriptions,
    });
  };

  const handleSaveCustomPlan = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      // Validate custom regimen
      if (customPlan.regimen === "Custom" && !customPlan.customRegimen) {
        setError("Custom regimen is required when selecting 'Tùy chỉnh'");
        return;
      }

      const treatmentData = {
        userId: customPlan.userId,
        doctorId: doctor._id,
        regimen: customPlan.regimen === "Custom" ? customPlan.customRegimen : customPlan.regimen,
        startDate: customPlan.startDate,
        endDate: customPlan.endDate || null,
        notes: customPlan.notes,
        nextAppointmentDate: customPlan.nextAppointmentDate || null,
      };

      const response = await axios.post(
        "http://localhost:3000/api/appointment/treatment-plan",
        treatmentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTreatmentPlans([...treatmentPlans, response.data]);
      setOpenCustomize(false);
      setSuccess("Treatment plan created successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error saving custom plan:", err);
      setError(err.response?.data?.message || "Failed to save custom plan");
    }
  };

  const handleSaveMedicalRecord = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      // Validate prescriptions
      if (medicalRecord.prescription.length === 0) {
        setError("At least one prescription is required");
        return;
      }

      for (let i = 0; i < medicalRecord.prescription.length; i++) {
        const med = medicalRecord.prescription[i];
        if (
          !med.medicationName ||
          !med.dosage ||
          !med.frequency ||
          !med.duration ||
          !med.instructions
        ) {
          setError(`Prescription ${i + 1} is missing required fields`);
          return;
        }
      }

      const recordData = {
        userId: medicalRecord.userId,
        appointmentId: medicalRecord.appointmentId,
        treatmentPlanId: medicalRecord.treatmentPlanId || null,
        diagnosis: medicalRecord.diagnosis,
        prescription: medicalRecord.prescription,
        notes: medicalRecord.notes,
        recordDate: medicalRecord.recordDate,
      };

      await axios.post(
        "http://localhost:3000/api/medical-records/",
        recordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpenMedicalRecord(false);
      setSuccess("Medical record created successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error saving medical record:", err);
      setError(err.response?.data?.message || "Failed to save medical record");
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="sm">
          <Typography color="error">Lỗi: {error}</Typography>
          <Logout />
        </Container>
      </Box>
    );
  if (!doctor || !doctor.userId)
    return (
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="sm">
          <Typography>Không tìm thấy dữ liệu bác sĩ hoặc thông tin người dùng.</Typography>
          <Logout />
        </Container>
      </Box>
    );

  const { userId: userInfo, certificates, skills, experiences, workSchedule } = doctor;

  const todayAppointments = appointments.filter((a) =>
    moment(a.appointmentDate).isSame(moment(), "day")
  ).length;
  const pendingAppointments = appointments.filter((a) => a.status === "Pending").length;
  const totalPatients = 12; // Placeholder

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="sm">
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        <Card sx={{ mb: 3, p: 2, borderRadius: 3, cursor: "pointer" }} onClick={handleOpenDetail}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src="https://via.placeholder.com/80" alt={userInfo.userName} sx={{ width: 64, height: 64 }} />
            <Box>
              <Typography fontWeight="bold" fontSize={20}>
                TSGS. {userInfo.fullName || userInfo.userName || "Tên bác sĩ"}
              </Typography>
              <Typography color="text.secondary">
                {skills?.length > 0 ? (
                  skills.map((s, i) => (
                    <Chip key={i} label={`${s.name} (${s.level})`} sx={{ m: 0.5 }} />
                  ))
                ) : (
                  <Typography color="text.secondary">Không có dữ liệu kỹ năng</Typography>
                )}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">{userInfo.email || "Email"}</Typography>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={2} mt={2}>
            {[
              { label: "Lịch hôm nay", value: todayAppointments },
              { label: "Chờ xác nhận", value: pendingAppointments },
              { label: "Bệnh nhân", value: totalPatients },
            ].map((item, index) => (
              <Grid item xs={4} key={index}>
                <Box textAlign="center" sx={{ bgcolor: "#f0f7f0", py: 1, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
        <Dialog open={openDetail} onClose={handleCloseDetail} fullWidth maxWidth="sm">
          <DialogTitle>Chi tiết bác sĩ</DialogTitle>
          <DialogContent dividers>
            <Typography variant="h6" gutterBottom>📜 Chứng chỉ</Typography>
            {certificates?.length > 0 ? (
              certificates.map((c, i) => (
                <Typography key={i}>
                  • {c.name} ({c.issuedBy || "N/A"}, {new Date(c.date).toLocaleDateString()})
                </Typography>
              ))
            ) : (
              <Typography color="text.secondary">Không có dữ liệu chứng chỉ</Typography>
            )}

            <Typography variant="h6" mt={2} gutterBottom>💼 Kinh nghiệm</Typography>
            {experiences?.length > 0 ? (
              experiences.map((e, i) => (
                <Typography key={i}>
                  • {e.position} tại {e.organization} (từ {new Date(e.startDate).getFullYear()} -{" "}
                  {e.endDate ? new Date(e.endDate).getFullYear() : "nay"})
                </Typography>
              ))
            ) : (
              <Typography color="text.secondary">Không có dữ liệu kinh nghiệm</Typography>
            )}

            <Typography variant="h6" mt={2} gutterBottom>🧠 Kỹ năng</Typography>
            {skills?.length > 0 ? (
              skills.map((s, i) => <Chip key={i} label={`${s.name} (${s.level})`} sx={{ m: 0.5 }} />)
            ) : (
              <Typography color="text.secondary">Không có dữ liệu kỹ năng</Typography>
            )}

            <Typography variant="h6" mt={2} gutterBottom>🕒 Lịch làm việc</Typography>
            {workSchedule?.length > 0 ? (
              workSchedule.map((schedule, i) => (
                <Box key={i}>
                  <Typography>
                    • Ngày làm việc: {schedule.days.join(", ") || "Chưa xác định"}
                  </Typography>
                  <Typography>
                    • Giờ làm việc: {schedule.hours.start || "N/A"} - {schedule.hours.end || "N/A"}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">Không có dữ liệu lịch làm việc</Typography>
            )}
          </DialogContent>
        </Dialog>

        <Typography fontWeight="bold" fontSize={18} mt={4} mb={2}>
          Lịch khám hôm nay
        </Typography>
        {appointments.map((appt, index) => (
          <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon color="success" />
                <Typography fontWeight="bold">
                  {appt.userId.fullName || "Unknown Patient"}
                </Typography>
                <Chip
                  label={appt.status || "Pending"}
                  size="small"
                  color={appt.status === "Confirmed" ? "success" : "warning"}
                  sx={{ ml: "auto" }}
                />
              </Box>
              <Typography variant="body2" mt={0.5}>
                {moment(appt.appointmentDate).format("hh:mm A")} | {appt.appointmentType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {appt.note || "No symptoms noted"}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  sx={{ textTransform: "none" }}
                  onClick={() => handleOpenCustomize(null, appt.userId._id)}
                >
                  Tạo phác đồ
                </Button>
                <Button
                  size="small"
                  sx={{ textTransform: "none" }}
                  onClick={() => handleOpenMedicalRecord(appt)}
                >
                  Tạo hồ sơ y tế
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Dialog open={openCustomize} onClose={handleCloseCustomize} fullWidth maxWidth="sm">
          <DialogTitle>{customPlan.id ? "Cập nhật Phác đồ" : "Thêm Phác đồ mới"}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="regimen-label">Phác đồ</InputLabel>
              <Select
                labelId="regimen-label"
                value={customPlan.regimen}
                label="Phác đồ"
                onChange={(e) => setCustomPlan({ ...customPlan, regimen: e.target.value })}
              >
                <MenuItem value="TDF + 3TC + DTG">TDF + 3TC + DTG</MenuItem>
                <MenuItem value="AZT + 3TC + EFV">AZT + 3TC + EFV</MenuItem>
                <MenuItem value="Custom">Tùy chỉnh</MenuItem>
              </Select>
            </FormControl>
            {customPlan.regimen === "Custom" && (
              <TextField
                fullWidth
                label="Phác đồ tùy chỉnh"
                value={customPlan.customRegimen}
                onChange={(e) => setCustomPlan({ ...customPlan, customRegimen: e.target.value })}
                sx={{ mt: 2 }}
                required
              />
            )}
            <TextField
              fullWidth
              label="Ngày bắt đầu"
              type="date"
              value={customPlan.startDate}
              onChange={(e) => setCustomPlan({ ...customPlan, startDate: e.target.value })}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Ngày kết thúc"
              type="date"
              value={customPlan.endDate}
              onChange={(e) => setCustomPlan({ ...customPlan, endDate: e.target.value })}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Ngày cuộc hẹn tiếp theo"
              type="date"
              value={customPlan.nextAppointmentDate}
              onChange={(e) => setCustomPlan({ ...customPlan, nextAppointmentDate: e.target.value })}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Ghi chú"
              multiline
              rows={3}
              value={customPlan.notes}
              onChange={(e) => setCustomPlan({ ...customPlan, notes: e.target.value })}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCustomize}>Hủy</Button>
            <Button onClick={handleSaveCustomPlan} variant="contained" color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openMedicalRecord} onClose={handleCloseMedicalRecord} fullWidth maxWidth="sm">
          <DialogTitle>Tạo hồ sơ y tế</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="treatment-plan-label">Phác đồ điều trị</InputLabel>
              <Select
                labelId="treatment-plan-label"
                value={medicalRecord.treatmentPlanId}
                label="Phác đồ điều trị"
                onChange={(e) =>
                  setMedicalRecord({ ...medicalRecord, treatmentPlanId: e.target.value })
                }
              >
                <MenuItem value="">Không chọn</MenuItem>
                {treatmentPlans
                  .filter((plan) => plan.userId._id === medicalRecord.userId)
                  .map((plan) => (
                    <MenuItem key={plan._id} value={plan._id}>
                      {plan.regimen} (Start: {moment(plan.startDate).format("DD/MM/YYYY")})
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Chẩn đoán"
              value={medicalRecord.diagnosis}
              onChange={(e) => setMedicalRecord({ ...medicalRecord, diagnosis: e.target.value })}
              sx={{ mt: 2 }}
              required
            />
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Đơn thuốc</Typography>
            {medicalRecord.prescription.map((prescription, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
                <TextField
                  fullWidth
                  label="Tên thuốc"
                  value={prescription.medicationName}
                  onChange={(e) => handlePrescriptionChange(index, "medicationName", e.target.value)}
                  sx={{ mt: 1 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Liều lượng"
                  value={prescription.dosage}
                  onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)}
                  sx={{ mt: 1 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Tần suất"
                  value={prescription.frequency}
                  onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)}
                  sx={{ mt: 1 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Thời gian sử dụng"
                  value={prescription.duration}
                  onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)}
                  sx={{ mt: 1 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Hướng dẫn sử dụng"
                  multiline
                  rows={2}
                  value={prescription.instructions}
                  onChange={(e) => handlePrescriptionChange(index, "instructions", e.target.value)}
                  sx={{ mt: 1 }}
                  required
                />
                <IconButton
                  onClick={() => handleRemovePrescription(index)}
                  disabled={medicalRecord.prescription.length === 1}
                  sx={{ mt: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddPrescription}
              sx={{ mt: 1 }}
            >
              Thêm đơn thuốc
            </Button>
            <TextField
              fullWidth
              label="Ghi chú"
              multiline
              rows={3}
              value={medicalRecord.notes}
              onChange={(e) => setMedicalRecord({ ...medicalRecord, notes: e.target.value })}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Ngày ghi nhận"
              type="date"
              value={medicalRecord.recordDate}
              onChange={(e) => setMedicalRecord({ ...medicalRecord, recordDate: e.target.value })}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMedicalRecord}>Hủy</Button>
            <Button onClick={handleSaveMedicalRecord} variant="contained" color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Logout />
    </Box>
  );
};

export default DoctorPage;