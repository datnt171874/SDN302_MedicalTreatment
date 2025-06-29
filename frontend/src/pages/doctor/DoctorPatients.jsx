import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import DoctorLayout from "../../components/DoctorLayout";

const mockPatients = [
  {
    id: "BN001",
    name: "Nguyen Van A",
    email: "a.nguyen@example.com",
    currentTreatment: "Phác đồ A",
  },
  {
    id: "BN002",
    name: "Tran Thi B",
    email: "b.tran@example.com",
    currentTreatment: "Phác đồ B",
  },
  {
    id: "BN003",
    name: "Le Van C",
    email: "c.le@example.com",
    currentTreatment: "Phác đồ C",
  },
];

const DoctorPatients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DoctorLayout activeItem="Patients">
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
          Quản lý bệnh nhân
        </Typography>

        <TextField
          fullWidth
          placeholder="Tìm kiếm theo tên, email hoặc mã bệnh nhân"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Grid container spacing={3}>
          {filteredPatients.map((patient) => (
            <Grid item xs={12} md={6} lg={4} key={patient.id}>
              <Card
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/doctor/patient/${patient.id}`)}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {patient.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mã bệnh nhân: {patient.id}
                  </Typography>
                  <Typography variant="body2">
                    Email: {patient.email}
                  </Typography>
                  <Typography variant="body2">
                    Phác đồ: {patient.currentTreatment}
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 2 }} fullWidth>
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DoctorLayout>
  );
};

export default DoctorPatients;
