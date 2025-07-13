import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import dayjs from "dayjs";
import DoctorLayout from "../../components/DoctorLayout";

const DoctorTreatmentPlan = () => {
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
    regimen: "",
    customRegimen: "", // New field for custom regimen input
    startDate: "",
    endDate: "",
    nextAppointmentDate: "",
    medicalRecordId: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!token) throw new Error("No authentication token found");

        const plansRes = await axios.get(
          "http://localhost:3000/api/appointment/treatment-plan",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTreatmentPlans(plansRes.data);

        const patientsRes = await axios.get(
          "http://localhost:3000/api/users?role=Customer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPatients(patientsRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    if (userId && token) fetchData();
    else {
      setError("User ID or token not found. Please log in again.");
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      if (!formData.userId) {
        setMedicalRecords([]);
        return;
      }
      try {
        const recordsRes = await axios.get(
          `http://localhost:3000/api/medical-records?userId=${formData.userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMedicalRecords(recordsRes.data);
      } catch (err) {
        console.error("Error fetching medical records:", err);
        setError(
          err.response?.data?.message || "Failed to fetch medical records"
        );
      }
    };

    fetchMedicalRecords();
  }, [formData.userId, token]);

  const handleOpenDialog = (plan = null) => {
    if (plan) {
      setIsEditing(true);
      setCurrentPlanId(plan._id);
      setFormData({
        userId: plan.userId._id || "",
        regimen: plan.regimen || "",
        customRegimen: plan.regimen === "Custom" ? plan.regimen : "", // Set customRegimen only if original was custom
        startDate: plan.startDate
          ? dayjs(plan.startDate).format("YYYY-MM-DD")
          : "",
        endDate: plan.endDate ? dayjs(plan.endDate).format("YYYY-MM-DD") : "",
        nextAppointmentDate: plan.nextAppointmentDate
          ? dayjs(plan.nextAppointmentDate).format("YYYY-MM-DD")
          : "",
        medicalRecordId: "",
        notes: plan.notes || "",
      });
    } else {
      // Create mode
      setIsEditing(false);
      setCurrentPlanId(null);
      setFormData({
        userId: "",
        regimen: "",
        customRegimen: "",
        startDate: "",
        endDate: "",
        nextAppointmentDate: "",
        medicalRecordId: "",
        notes: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError(null);
  };

  const handleSave = async () => {
    try {
      if (!token) throw new Error("No authentication token found");

      if (!currentPlanId && isEditing) {
        throw new Error("Invalid treatment plan ID");
      }

      // Validate custom regimen
      if (formData.regimen === "Custom" && !formData.customRegimen.trim()) {
        setError("Custom regimen is required when selecting 'Tùy chỉnh'");
        return;
      }

      const treatmentData = {
        userId: formData.userId,
        doctorId: userId,
        regimen: formData.regimen === "Custom" ? formData.customRegimen : formData.regimen,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
        nextAppointmentDate: formData.nextAppointmentDate || null,
        notes: formData.notes,
      };

      let response;
      if (isEditing) {
        console.log("Updating plan with ID:", currentPlanId, "Data:", treatmentData);
        response = await axios.put(
          `http://localhost:3000/api/treatment-plan/${currentPlanId}`,
          treatmentData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTreatmentPlans(
          treatmentPlans.map((plan) =>
            plan._id === currentPlanId ? response.data : plan
          )
        );
        setSuccess("Treatment plan updated successfully");
      } else {
        response = await axios.post(
          "http://localhost:3000/api/appointment/treatment-plan",
          treatmentData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTreatmentPlans([...treatmentPlans, response.data]);
        setSuccess("Treatment plan created successfully");
      }

      handleCloseDialog();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error saving treatment plan:", err);
      setError(err.response?.data?.message || "Failed to save treatment plan");
    }
  };

  const handleDelete = async (planId) => {
    try {
      if (!token) throw new Error("No authentication token found");

      await axios.delete(
        `http://localhost:3000/api/treatment-plan/${planId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTreatmentPlans(treatmentPlans.filter((plan) => plan._id !== planId));
      setSuccess("Treatment plan deleted successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error deleting treatment plan:", err);
      setError(
        err.response?.data?.message || "Failed to delete treatment plan"
      );
    }
  };

  if (loading)
    return (
      <DoctorLayout activeItem="Treatment Plans">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </DoctorLayout>
    );

  return (
    <DoctorLayout activeItem="Treatment Plans">
      <Box sx={{ bgcolor: "#f5f5f5", py: 6, minHeight: "100vh" }}>
        <Container maxWidth="lg">
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h4" fontWeight="bold">
                Quản lý Phác đồ Điều trị
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog()}
              >
                Tạo Phác đồ Mới
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Bệnh nhân</TableCell>
                    <TableCell>Phác đồ</TableCell>
                    <TableCell>Ngày bắt đầu</TableCell>
                    <TableCell>Ngày kết thúc</TableCell>
                    <TableCell>Cuộc hẹn tiếp theo</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {treatmentPlans.map((plan) => (
                    <TableRow key={plan._id}>
                      <TableCell>{plan.userId?.fullName || "N/A"}</TableCell>
                      <TableCell>{plan.regimen}</TableCell>
                      <TableCell>
                        {plan.startDate
                          ? dayjs(plan.startDate).format("DD/MM/YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {plan.endDate
                          ? dayjs(plan.endDate).format("DD/MM/YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {plan.nextAppointmentDate
                          ? dayjs(plan.nextAppointmentDate).format("DD/MM/YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenDialog(plan)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(plan._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Dialog for Create/Edit Treatment Plan */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              {isEditing ? "Chỉnh sửa Phác đồ" : "Tạo Phác đồ Mới"}
            </DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{ mt: 2 }} disabled={isEditing}>
                <InputLabel id="patient-label">Bệnh nhân</InputLabel>
                <Select
                  labelId="patient-label"
                  value={formData.userId}
                  label="Bệnh nhân"
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient._id} value={patient._id}>
                      {patient.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="regimen-label">Phác đồ</InputLabel>
                <Select
                  labelId="regimen-label"
                  value={formData.regimen}
                  label="Phác đồ"
                  onChange={(e) =>
                    setFormData({ ...formData, regimen: e.target.value })
                  }
                >
                  <MenuItem value="TDF + 3TC + DTG">TDF + 3TC + DTG</MenuItem>
                  <MenuItem value="AZT + 3TC + EFV">AZT + 3TC + EFV</MenuItem>
                  <MenuItem value="Custom">Tùy chỉnh</MenuItem>
                </Select>
              </FormControl>
              {formData.regimen === "Custom" && (
                <TextField
                  fullWidth
                  label="Phác đồ tùy chỉnh"
                  value={formData.customRegimen}
                  onChange={(e) =>
                    setFormData({ ...formData, customRegimen: e.target.value })
                  }
                  sx={{ mt: 2 }}
                  required
                />
              )}
              <TextField
                fullWidth
                label="Ngày bắt đầu"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Ngày kết thúc"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Cuộc hẹn tiếp theo"
                type="date"
                value={formData.nextAppointmentDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nextAppointmentDate: e.target.value,
                  })
                }
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="medical-record-label">Bệnh án</InputLabel>
                <Select
                  labelId="medical-record-label"
                  value={formData.medicalRecordId}
                  label="Bệnh án"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      medicalRecordId: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">Không chọn</MenuItem>
                  {medicalRecords.map((record) => (
                    <MenuItem key={record._id} value={record._id}>
                      {record.diagnosis} (
                      {dayjs(record.recordDate).format("DD/MM/YYYY")})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Ghi chú"
                multiline
                rows={4}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                sx={{ mt: 2 }}
              />
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Hủy</Button>
              <Button onClick={handleSave} variant="contained" color="primary">
                Lưu
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </DoctorLayout>
  );
};

export default DoctorTreatmentPlan;