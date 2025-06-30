import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Container,
  TextField,
  Autocomplete,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Divider,
} from "@mui/material";
import DoctorLayout from "../../components/DoctorLayout";
import { appointmentService } from "../../services/appointmentService";
import { medicalRecordService } from "../../services/medicalRecordService";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotesIcon from "@mui/icons-material/Notes";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import MedicationIcon from "@mui/icons-material/Medication";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";

const DoctorMedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [recordForm, setRecordForm] = useState({
    diagnosis: "",
    prescriptions: [
      {
        medicationName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ],
    notes: "",
    treatmentPlanId: "",
  });
  const [creating, setCreating] = useState(false);
  const [showFormForPatient, setShowFormForPatient] = useState(null);
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [treatmentPlanLoading, setTreatmentPlanLoading] = useState(false);
  const [allMedicalRecords, setAllMedicalRecords] = useState([]);
  const [showRecordDialog, setShowRecordDialog] = useState(false);
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const [detailRecord, setDetailRecord] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error" | "info" | "warning"
  });

  useEffect(() => {
    // Fetch all appointments, filter confirmed in FE
    appointmentService.getAll().then((res) => {
      const apts = res.data || res; // support both axios and mock
      // Extract unique patients from confirmed appointments
      const uniquePatients = [];
      const seen = new Set();
      apts
        .filter((appt) => appt.status === "Confirmed")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by latest
        .forEach((appt) => {
          if (appt.userId && appt.userId._id && !seen.has(appt.userId._id)) {
            uniquePatients.push({
              id: appt.userId._id,
              name: appt.userId.fullName,
              email: appt.userId.email,
              appointmentId: appt._id, // lấy appointmentId gần nhất
            });
            seen.add(appt.userId._id);
          }
        });
      setPatients(uniquePatients);
    });

    // Fetch all medical records
    medicalRecordService.getAll().then((res) => {
      setAllMedicalRecords(res.data || res);
    });
  }, []);

  const handlePrescriptionChange = (idx, e) => {
    const newPrescriptions = [...recordForm.prescriptions];
    newPrescriptions[idx][e.target.name] = e.target.value;
    setRecordForm({ ...recordForm, prescriptions: newPrescriptions });
  };

  const handleAddPrescription = () => {
    setRecordForm({
      ...recordForm,
      prescriptions: [
        ...recordForm.prescriptions,
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

  const handleRemovePrescription = (idx) => {
    const newPrescriptions = recordForm.prescriptions.filter(
      (_, i) => i !== idx
    );
    setRecordForm({ ...recordForm, prescriptions: newPrescriptions });
  };

  const handleSelectPatient = async (event, value) => {
    console.log("handleSelectPatient called", value);
    setSelectedPatient(value);
    setShowFormForPatient(value ? value.id : null);
    setRecordForm({
      diagnosis: "",
      prescriptions: [
        {
          medicationName: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ],
      notes: "",
      treatmentPlanId: "",
    });
    // Fetch all treatment plans, filter by patient
    if (value && value.id) {
      setTreatmentPlanLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/appointment/treatment-plan",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Log từng phần tử để debug
        res.data.forEach((plan) => {
          const planId =
            plan.userId && plan.userId._id ? String(plan.userId._id) : "";
          const selId = String(value.id);
          console.log("Compare:", planId, selId, planId === selId);
        });
        const plansForPatient = res.data.filter((plan) => {
          const planId =
            plan.userId && plan.userId._id ? String(plan.userId._id) : "";
          const selId = String(value.id);
          return planId === selId;
        });
        console.log("All plans:", res.data);
        console.log("Selected patient id:", value.id);
        console.log("Plans for patient:", plansForPatient);
        setTreatmentPlans(plansForPatient);
      } catch (err) {
        setTreatmentPlans([]);
      }
      setTreatmentPlanLoading(false);
    } else {
      setTreatmentPlans([]);
    }
  };

  const handleCreateRecord = async () => {
    setCreating(true);
    try {
      const newRecord = {
        userId: selectedPatient.id,
        appointmentId: selectedPatient.appointmentId,
        diagnosis: recordForm.diagnosis,
        prescription: recordForm.prescriptions,
        notes: recordForm.notes,
        recordDate: new Date().toISOString(),
        treatmentPlanId: recordForm.treatmentPlanId || undefined,
      };
      await medicalRecordService.create(newRecord);
      setMedicalRecords([...medicalRecords, newRecord]);
      setSelectedPatient(null);
      setSnackbar({
        open: true,
        message: "Tạo medical record thành công!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Tạo medical record thất bại!",
        severity: "error",
      });
    }
    setCreating(false);
  };

  const handleShowMedicalRecord = (patientId) => {
    setExpandedPatientId(expandedPatientId === patientId ? null : patientId);
  };

  const handleShowRecordDetail = (rec) => {
    setDetailRecord(rec);
    setShowDetailDialog(true);
  };

  const handleCloseDetailDialog = () => setShowDetailDialog(false);

  const handleEditRecord = (rec) => {
    // Deep copy để không ảnh hưởng trực tiếp state gốc
    setEditRecord(JSON.parse(JSON.stringify(rec)));
    setShowEditDialog(true);
  };

  const handleCloseEditDialog = () => setShowEditDialog(false);

  const handleEditPrescriptionChange = (idx, e) => {
    const newPres = [...editRecord.prescription];
    newPres[idx][e.target.name] = e.target.value;
    setEditRecord({ ...editRecord, prescription: newPres });
  };

  const handleAddEditPrescription = () => {
    setEditRecord({
      ...editRecord,
      prescription: [
        ...editRecord.prescription,
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

  const handleRemoveEditPrescription = (idx) => {
    const newPres = editRecord.prescription.filter((_, i) => i !== idx);
    setEditRecord({ ...editRecord, prescription: newPres });
  };

  const handleSaveEditRecord = async () => {
    try {
      await medicalRecordService.update(editRecord._id, editRecord);
      const res = await medicalRecordService.getAll();
      setAllMedicalRecords(res.data || res);
      setShowEditDialog(false);
      setSnackbar({
        open: true,
        message: "Cập nhật medical record thành công!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Cập nhật medical record thất bại!",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleOpenDeleteConfirm = (rec) => {
    setRecordToDelete(rec);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  const handleConfirmDelete = async () => {
    try {
      await medicalRecordService.delete(recordToDelete._id);
      const res = await medicalRecordService.getAll();
      setAllMedicalRecords(res.data || res);
      setShowDeleteConfirm(false);
      setSnackbar({
        open: true,
        message: "Xóa medical record thành công!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Xóa medical record thất bại!",
        severity: "error",
      });
    }
  };

  return (
    <DoctorLayout activeItem="MedicalRecords">
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            color="#4A6D5A"
          >
            Medical Records
          </Typography>
          <Autocomplete
            options={patients}
            getOptionLabel={(option) =>
              option.name + (option.email ? ` (${option.email})` : "")
            }
            value={selectedPatient}
            onChange={handleSelectPatient}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tìm kiếm bệnh nhân đã xác nhận lịch"
                margin="normal"
              />
            )}
            sx={{ maxWidth: 400, mb: 2 }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <Typography variant="h6" sx={{ mb: 2, color: "green" }}>
            Danh sách bệnh nhân đã xác nhận lịch hẹn
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((p) => {
                  const patientRecords = allMedicalRecords.filter(
                    (r) =>
                      String(r.userId) === String(p.id) ||
                      (r.userId && r.userId._id === p.id)
                  );
                  return (
                    <React.Fragment key={p.id}>
                      <TableRow>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.email}</TableCell>
                        <TableCell>
                          <Tooltip title="Tạo Medical Record" arrow>
                            <IconButton
                              color="primary"
                              onClick={() => handleSelectPatient(null, p)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                          {patientRecords.length > 0 && (
                            <Tooltip title="Xem" arrow>
                              <IconButton
                                color="primary"
                                onClick={() => handleShowMedicalRecord(p.id)}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                      {expandedPatientId === p.id && (
                        <TableRow>
                          <TableCell colSpan={3}>
                            {patientRecords.map((rec, idx) => (
                              <Card
                                key={idx}
                                sx={{
                                  mb: 1.5,
                                  cursor: "pointer",
                                  borderLeft: "5px solid #4A6D5A",
                                  boxShadow: 2,
                                  borderRadius: 2,
                                  transition: "background 0.2s",
                                  "&:hover": { background: "#f0f7f4" },
                                  position: "relative",
                                  minHeight: 56,
                                  display: "flex",
                                  alignItems: "center",
                                  px: 2,
                                }}
                                onClick={() => handleShowRecordDetail(rec)}
                              >
                                <CardContent
                                  sx={{
                                    p: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    minHeight: 40,
                                    "&:last-child": { pb: 1 },
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 2,
                                      flex: 1,
                                      minWidth: 0,
                                    }}
                                  >
                                    <CalendarMonthIcon
                                      sx={{ color: "#4A6D5A", mr: 1 }}
                                    />
                                    <Typography
                                      variant="subtitle2"
                                      fontWeight={700}
                                      color="#4A6D5A"
                                      noWrap
                                    >
                                      {rec.recordDate
                                        ? new Date(
                                            rec.recordDate
                                          ).toLocaleDateString("vi-VN")
                                        : ""}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      fontWeight={500}
                                      color="#1976d2"
                                      noWrap
                                      sx={{ mx: 2, minWidth: 0, flexShrink: 1 }}
                                    >
                                      Chẩn đoán: {rec.diagnosis}
                                    </Typography>
                                    {rec.treatmentPlanId && (
                                      <Typography
                                        variant="body2"
                                        color="#388e3c"
                                        noWrap
                                        sx={{ minWidth: 0, flexShrink: 1 }}
                                      >
                                        Phác đồ: {rec.treatmentPlanId.regimen}
                                      </Typography>
                                    )}
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      ml: 2,
                                    }}
                                  >
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditRecord(rec);
                                      }}
                                    >
                                      <EditIcon color="action" />
                                    </IconButton>
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenDeleteConfirm(rec);
                                      }}
                                    >
                                      <DeleteIcon color="error" />
                                    </IconButton>
                                  </Box>
                                </CardContent>
                              </Card>
                            ))}
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedPatient && showFormForPatient === selectedPatient.id && (
            <Box component={Paper} sx={{ p: 3, mb: 3, maxWidth: 800 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Tạo Medical Record cho: {selectedPatient.name}
              </Typography>
              <TextField
                label="Chẩn đoán"
                name="diagnosis"
                value={recordForm.diagnosis}
                onChange={(e) =>
                  setRecordForm({ ...recordForm, diagnosis: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
                Chọn phác đồ điều trị
              </Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel id="treatment-plan-label">
                  Phác đồ điều trị
                </InputLabel>
                <Select
                  labelId="treatment-plan-label"
                  value={recordForm.treatmentPlanId || ""}
                  label="Phác đồ điều trị"
                  onChange={(e) =>
                    setRecordForm({
                      ...recordForm,
                      treatmentPlanId: e.target.value,
                    })
                  }
                  disabled={treatmentPlanLoading}
                >
                  <MenuItem value="">Không chọn</MenuItem>
                  {treatmentPlans.map((plan) => (
                    <MenuItem key={plan._id} value={plan._id}>
                      {plan.regimen} (
                      {plan.startDate
                        ? new Date(plan.startDate).toLocaleDateString("vi-VN")
                        : ""}
                      )
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
                Đơn thuốc
              </Typography>
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên thuốc</TableCell>
                      <TableCell>Liều dùng</TableCell>
                      <TableCell>Tần suất</TableCell>
                      <TableCell>Thời gian</TableCell>
                      <TableCell>Hướng dẫn</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recordForm.prescriptions.map((pres, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <TextField
                            name="medicationName"
                            value={pres.medicationName}
                            onChange={(e) => handlePrescriptionChange(idx, e)}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="dosage"
                            value={pres.dosage}
                            onChange={(e) => handlePrescriptionChange(idx, e)}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="frequency"
                            value={pres.frequency}
                            onChange={(e) => handlePrescriptionChange(idx, e)}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="duration"
                            value={pres.duration}
                            onChange={(e) => handlePrescriptionChange(idx, e)}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="instructions"
                            value={pres.instructions}
                            onChange={(e) => handlePrescriptionChange(idx, e)}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            color="error"
                            onClick={() => handleRemovePrescription(idx)}
                            disabled={recordForm.prescriptions.length === 1}
                          >
                            Xóa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="outlined"
                onClick={handleAddPrescription}
                sx={{ mb: 2 }}
              >
                Thêm thuốc
              </Button>
              <TextField
                label="Ghi chú"
                name="notes"
                value={recordForm.notes}
                onChange={(e) =>
                  setRecordForm({ ...recordForm, notes: e.target.value })
                }
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateRecord}
                disabled={creating}
                sx={{ mt: 2 }}
              >
                {creating ? "Đang tạo..." : "Tạo Medical Record"}
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      <Dialog
        open={showRecordDialog}
        onClose={() => setShowRecordDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <VisibilityIcon />
          Medical Records
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {allMedicalRecords.map((rec, idx) => (
              <Grid item xs={12} key={idx}>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    borderColor: "primary.main",
                    boxShadow: 3,
                    minHeight: 170,
                    bgcolor: "#f8fafc",
                    borderRadius: 3,
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 3,
                      width: "100%",
                      p: 3,
                    }}
                  >
                    {/* Left column */}
                    <Box
                      flex={1}
                      minWidth={200}
                      pr={3}
                      borderRight={{ sm: "2px solid #e0e7ef", xs: "none" }}
                      display="flex"
                      flexDirection="column"
                      gap={1.5}
                      justifyContent="center"
                    >
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        <LocalHospitalIcon color="primary" fontSize="small" />
                        <Typography
                          variant="subtitle1"
                          color="primary.main"
                          fontWeight={700}
                        >
                          {rec.diagnosis || "Chưa có chẩn đoán"}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonthIcon color="action" fontSize="small" />
                        <Typography variant="caption" color="text.secondary">
                          {rec.recordDate
                            ? new Date(rec.recordDate).toLocaleDateString(
                                "vi-VN"
                              )
                            : ""}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AssignmentIcon color="success" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          <b>Phác đồ:</b>{" "}
                          {rec.treatmentPlanId?.regimen || "Chưa chọn"}
                        </Typography>
                      </Box>
                      {rec.treatmentPlanId?.notes && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <NotesIcon color="info" fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            <b>Ghi chú:</b> {rec.treatmentPlanId.notes}
                          </Typography>
                        </Box>
                      )}
                      <Box display="flex" gap={2} mt={1}>
                        {rec.treatmentPlanId?.startDate && (
                          <Typography variant="caption" color="text.secondary">
                            <b>BĐ:</b>{" "}
                            {new Date(
                              rec.treatmentPlanId.startDate
                            ).toLocaleDateString("vi-VN")}
                          </Typography>
                        )}
                        {rec.treatmentPlanId?.endDate && (
                          <Typography variant="caption" color="text.secondary">
                            <b>KT:</b>{" "}
                            {new Date(
                              rec.treatmentPlanId.endDate
                            ).toLocaleDateString("vi-VN")}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    {/* Right column */}
                    <Box
                      flex={2}
                      pl={{ sm: 3, xs: 0 }}
                      pt={{ xs: 2, sm: 0 }}
                      display="flex"
                      flexDirection="column"
                      gap={1.5}
                      justifyContent="center"
                    >
                      {rec.notes && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <NotesIcon color="secondary" fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            <b>Ghi chú BS:</b> {rec.notes}
                          </Typography>
                        </Box>
                      )}
                      {Array.isArray(rec.prescription) &&
                        rec.prescription.length > 0 && (
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="primary.main"
                              mb={0.5}
                            >
                              Đơn thuốc:
                            </Typography>
                            <TableContainer
                              sx={{
                                maxHeight: 120,
                                background: "#f4f6fa",
                                borderRadius: 1,
                                boxShadow: 0,
                                border: "1px solid #e0e7ef",
                                mt: 1,
                              }}
                            >
                              <Table size="small" stickyHeader>
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      sx={{
                                        fontWeight: 700,
                                        color: "primary.main",
                                        minWidth: 80,
                                      }}
                                    >
                                      Tên thuốc
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        fontWeight: 700,
                                        color: "primary.main",
                                        minWidth: 60,
                                      }}
                                    >
                                      Liều lượng
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        fontWeight: 700,
                                        color: "primary.main",
                                        minWidth: 60,
                                      }}
                                    >
                                      Tần suất
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        fontWeight: 700,
                                        color: "primary.main",
                                        minWidth: 60,
                                      }}
                                    >
                                      Thời gian
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        fontWeight: 700,
                                        color: "primary.main",
                                        minWidth: 80,
                                      }}
                                    >
                                      Hướng dẫn
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rec.prescription.map((pres, i) => (
                                    <TableRow key={i}>
                                      <TableCell sx={{ fontWeight: 600 }}>
                                        {pres.medicationName}
                                      </TableCell>
                                      <TableCell>{pres.dosage}</TableCell>
                                      <TableCell>{pres.frequency}</TableCell>
                                      <TableCell>{pres.duration}</TableCell>
                                      <TableCell>{pres.instructions}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            variant="contained"
            onClick={() => setShowRecordDialog(false)}
            sx={{ minWidth: 100 }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showDetailDialog}
        onClose={handleCloseDetailDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ color: "#4A6D5A", fontWeight: 700 }}>
          <AssignmentIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Chi tiết Medical Record
        </DialogTitle>
        <DialogContent>
          {detailRecord && (
            <Box sx={{ p: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight={600}>
                    <CalendarMonthIcon sx={{ mr: 1, color: "#4A6D5A" }} />
                    Ngày tạo:{" "}
                    <span style={{ color: "#1976d2" }}>
                      {detailRecord.recordDate
                        ? new Date(detailRecord.recordDate).toLocaleString(
                            "vi-VN"
                          )
                        : ""}
                    </span>
                  </Typography>
                  <Typography fontWeight={600} sx={{ mt: 1 }}>
                    <LocalHospitalIcon sx={{ mr: 1, color: "#388e3c" }} />
                    Chẩn đoán:{" "}
                    <span style={{ color: "#388e3c" }}>
                      {detailRecord.diagnosis}
                    </span>
                  </Typography>
                  <Typography fontWeight={600} sx={{ mt: 1 }}>
                    <AssignmentIcon sx={{ mr: 1, color: "#1976d2" }} />
                    Phác đồ:{" "}
                    <span style={{ color: "#1976d2" }}>
                      {detailRecord.treatmentPlanId?.regimen}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight={600}>
                    <NotesIcon sx={{ mr: 1, color: "#ff9800" }} />
                    Ghi chú:{" "}
                    <span style={{ color: "#555" }}>{detailRecord.notes}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography fontWeight={700} sx={{ mb: 1 }}>
                    Đơn thuốc:
                  </Typography>
                  {detailRecord.prescription &&
                  detailRecord.prescription.length > 0 ? (
                    <Table
                      size="small"
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 1,
                        mt: 1,
                        mb: 1,
                        minWidth: 400,
                        "& .MuiTableCell-head": {
                          background: "#e3f2fd",
                          color: "#1976d2",
                          fontWeight: 700,
                          fontSize: 15,
                          textAlign: "center",
                        },
                        "& .MuiTableCell-body": {
                          fontSize: 14,
                          textAlign: "center",
                        },
                        "& .MuiTableRow-root:nth-of-type(odd)": {
                          backgroundColor: "#f9fbe7",
                        },
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <MedicationIcon
                              sx={{
                                verticalAlign: "middle",
                                color: "#388e3c",
                                mr: 1,
                              }}
                            />
                            Tên thuốc
                          </TableCell>
                          <TableCell>Liều dùng</TableCell>
                          <TableCell>Tần suất</TableCell>
                          <TableCell>Thời gian</TableCell>
                          <TableCell>Hướng dẫn</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {detailRecord.prescription.map((pres, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <b>{pres.medicationName}</b>
                            </TableCell>
                            <TableCell>{pres.dosage}</TableCell>
                            <TableCell>{pres.frequency}</TableCell>
                            <TableCell>{pres.duration}</TableCell>
                            <TableCell>{pres.instructions}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography>Không có đơn thuốc</Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ color: "#1976d2", fontWeight: 700 }}>
          <EditIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Chỉnh sửa Medical Record
        </DialogTitle>
        <DialogContent>
          {editRecord && (
            <Box sx={{ p: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Chẩn đoán"
                    name="diagnosis"
                    value={editRecord.diagnosis}
                    onChange={(e) =>
                      setEditRecord({
                        ...editRecord,
                        diagnosis: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ghi chú"
                    name="notes"
                    value={editRecord.notes}
                    onChange={(e) =>
                      setEditRecord({ ...editRecord, notes: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={700} sx={{ mb: 1 }}>
                    Đơn thuốc:
                  </Typography>
                  <Table
                    size="small"
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: 1,
                      mb: 1,
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên thuốc</TableCell>
                        <TableCell>Liều dùng</TableCell>
                        <TableCell>Tần suất</TableCell>
                        <TableCell>Thời gian</TableCell>
                        <TableCell>Hướng dẫn</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {editRecord.prescription.map((pres, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <TextField
                              name="medicationName"
                              value={pres.medicationName}
                              onChange={(e) =>
                                handleEditPrescriptionChange(idx, e)
                              }
                              size="small"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="dosage"
                              value={pres.dosage}
                              onChange={(e) =>
                                handleEditPrescriptionChange(idx, e)
                              }
                              size="small"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="frequency"
                              value={pres.frequency}
                              onChange={(e) =>
                                handleEditPrescriptionChange(idx, e)
                              }
                              size="small"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="duration"
                              value={pres.duration}
                              onChange={(e) =>
                                handleEditPrescriptionChange(idx, e)
                              }
                              size="small"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="instructions"
                              value={pres.instructions}
                              onChange={(e) =>
                                handleEditPrescriptionChange(idx, e)
                              }
                              size="small"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              color="error"
                              onClick={() => handleRemoveEditPrescription(idx)}
                              disabled={editRecord.prescription.length === 1}
                            >
                              Xóa
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button
                    variant="outlined"
                    onClick={handleAddEditPrescription}
                    sx={{ mb: 2 }}
                  >
                    Thêm thuốc
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Hủy</Button>
          <Button
            onClick={handleSaveEditRecord}
            variant="contained"
            color="primary"
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showDeleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa medical record này không? Hành động này
            không thể hoàn tác.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Hủy</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DoctorLayout>
  );
};

export default DoctorMedicalRecords;
