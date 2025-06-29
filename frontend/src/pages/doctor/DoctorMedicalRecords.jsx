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
} from "@mui/material";
import DoctorLayout from "../../components/DoctorLayout";
import { appointmentService } from "../../services/appointmentService";
import { medicalRecordService } from "../../services/medicalRecordService";

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
  });
  const [creating, setCreating] = useState(false);
  const [showFormForPatient, setShowFormForPatient] = useState(null);

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
      };
      await medicalRecordService.create(newRecord);
      setMedicalRecords([...medicalRecords, newRecord]);
      setSelectedPatient(null);
    } catch (err) {
      alert("Lưu medical record thất bại!");
    }
    setCreating(false);
  };

  const handleSelectPatient = (event, value) => {
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
    });
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
                {patients.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setSelectedPatient(p);
                          setShowFormForPatient(p.id);
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
                          });
                        }}
                      >
                        Tạo Medical Record
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
    </DoctorLayout>
  );
};

export default DoctorMedicalRecords;
