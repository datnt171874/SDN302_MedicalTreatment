import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  Divider,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { PhotoCamera, Save } from "@mui/icons-material";
import { userService } from "../services/userService";
import axios from "axios";

function Account() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await userService.getProfile();
      setProfile(profile);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Không tìm thấy thông tin người dùng</div>;

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prev) => ({
          ...prev,
          imageUrl: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi request cập nhật profile
      const token = localStorage.getItem("token");
      const updateData = { ...profile };
      // Không gửi avatar nếu là base64 (chỉ gửi nếu backend hỗ trợ)
      await axios.put("http://localhost:3000/api/auth/me", updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbarMessage("Account information updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Update failed!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4, fontWeight: 600 }}
      >
        Account Information
      </Typography>

      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Avatar Section */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={profile.imageUrl}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                    size="small"
                    sx={{ mb: 2 }}
                  >
                    Change Photo
                  </Button>
                </label>
                <Typography variant="h6" align="center">
                  {profile.fullName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {profile.email}
                </Typography>
              </Box>
            </Grid>
            {/* Form Section */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      value={profile.fullName || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={profile.email || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={profile.phone || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={
                        profile.dateOfBirth
                          ? profile.dateOfBirth.slice(0, 10)
                          : ""
                      }
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={profile.address || ""}
                      onChange={handleChange}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    size="large"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Account;
