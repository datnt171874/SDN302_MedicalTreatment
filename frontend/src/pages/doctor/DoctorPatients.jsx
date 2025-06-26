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
  Avatar,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const mockPatients = [
  {
    id: "BN001",
    name: "Nguyen Van A",
    email: "a.nguyen@example.com",
    currentTreatment: "Phác đồ A",
    lastVisit: "2024-03-15",
    status: "Active",
  },
  {
    id: "BN002",
    name: "Tran Thi B",
    email: "b.tran@example.com",
    currentTreatment: "Phác đồ B",
    lastVisit: "2024-03-10",
    status: "Follow-up",
  },
  {
    id: "BN003",
    name: "Le Van C",
    email: "c.le@example.com",
    currentTreatment: "Phác đồ C",
    lastVisit: "2024-03-05",
    status: "Completed",
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Follow-up":
        return "warning";
      case "Completed":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: 700,
            color: "#333333",
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Patient Management
        </Typography>
        <Box
          sx={{
            height: 4,
            width: 80,
            background: "linear-gradient(45deg, #4A6D5A, #6B8E7A)",
            mx: "auto",
            borderRadius: 2,
          }}
        />
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <TextField
          fullWidth
          placeholder="Search by name, email or patient ID"
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
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            },
          }}
        />

        <Grid container spacing={3}>
          {filteredPatients.map((patient) => (
            <Grid item xs={12} md={6} lg={4} key={patient.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  borderRadius: 3,
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                  },
                }}
                onClick={() => navigate(`/doctor/patient/${patient.id}`)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: "#4A6D5A",
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {patient.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: {patient.id}
                      </Typography>
                    </Box>
                    <Chip
                      label={patient.status}
                      size="small"
                      color={getStatusColor(patient.status)}
                      sx={{ ml: "auto" }}
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Email: {patient.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Treatment: {patient.currentTreatment}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last Visit: {patient.lastVisit}
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      mt: 2,
                      borderColor: "#4A6D5A",
                      color: "#4A6D5A",
                      "&:hover": {
                        borderColor: "#3A5D4A",
                        bgcolor: "rgba(74, 109, 90, 0.1)",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DoctorPatients;
