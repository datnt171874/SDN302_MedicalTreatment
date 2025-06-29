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
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotesIcon from "@mui/icons-material/Notes";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

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
  const [recordToShow, setRecordToShow] = useState([]);

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
    } catch (err) {
      alert("Lưu medical record thất bại!");
    }
    setCreating(false);
  };

  const handleShowMedicalRecord = (records) => {
    setRecordToShow(records);
    setShowRecordDialog(true);
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
          <Typography variant="h6" sx={{ mb: 2 }}>
            Danh sách bệnh nhân đã xác nhận lịch hẹn
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell></TableCell>
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
                    <TableRow key={p.id}>
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
                              onClick={() =>
                                handleShowMedicalRecord(patientRecords)
                              }
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
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
            {recordToShow.map((rec, idx) => (
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
    </DoctorLayout>
  );
};

export default DoctorMedicalRecords;
