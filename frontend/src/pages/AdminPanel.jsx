import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    roleName: 'Customer',
    doctorDetails: {
      certificates: [{ name: '', issuedBy: '', date: '' }],
      experiences: [{ position: '', organization: '', startDate: '', endDate: '' }],
      skills: [{ name: '', level: '' }],
      workSchedule: { days: [], start: '', end: '' },
    },
  });
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editUserId ? `http://localhost:3000/api/auth/users/${editUserId}` : 'http://localhost:3000/api/auth/register';
      const method = editUserId ? 'put' : 'post';

      // Prepare payload
      const payload = {
        userName: formData.userName,
        password: formData.password,
        email: formData.email,
        roleName: formData.roleName,
      };

      // Include doctor details if role is Doctor
      if (formData.roleName === 'Doctor') {
        payload.doctorDetails = {
          certificates: formData.doctorDetails.certificates.filter(c => c.name && c.date),
          experiences: formData.doctorDetails.experiences.filter(e => e.position && e.organization && e.startDate),
          skills: formData.doctorDetails.skills.filter(s => s.name && s.level),
          workSchedule: {
            days: formData.doctorDetails.workSchedule.days,
            hours: {
              start: formData.doctorDetails.workSchedule.start,
              end: formData.doctorDetails.workSchedule.end,
            },
          },
        };
      }

      const response = await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(editUserId ? users.map(u => u._id === editUserId ? response.data : u) : [...users, response.data]);
      setFormData({
        userName: '',
        password: '',
        email: '',
        roleName: 'Customer',
        doctorDetails: {
          certificates: [{ name: '', issuedBy: '', date: '' }],
          experiences: [{ position: '', organization: '', startDate: '', endDate: '' }],
          skills: [{ name: '', level: '' }],
          workSchedule: { days: [], start: '', end: '' },
        },
      });
      setEditUserId(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(u => u._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      userName: user.userName,
      password: '',
      email: user.email,
      roleName: user.roleName,
      doctorDetails: user.doctorDetails || {
        certificates: [{ name: '', issuedBy: '', date: '' }],
        experiences: [{ position: '', organization: '', startDate: '', endDate: '' }],
        skills: [{ name: '', level: '' }],
        workSchedule: { days: [], start: '', end: '' },
      },
    });
    setEditUserId(user._id);
  };

  // Handlers for doctor details
  const addCertificate = () => {
    setFormData({
      ...formData,
      doctorDetails: {
        ...formData.doctorDetails,
        certificates: [...formData.doctorDetails.certificates, { name: '', issuedBy: '', date: '' }],
      },
    });
  };

  const updateCertificate = (index, field, value) => {
    const updatedCertificates = formData.doctorDetails.certificates.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    setFormData({
      ...formData,
      doctorDetails: { ...formData.doctorDetails, certificates: updatedCertificates },
    });
  };

  const removeCertificate = (index) => {
    setFormData({
      ...formData,
      doctorDetails: {
        ...formData.doctorDetails,
        certificates: formData.doctorDetails.certificates.filter((_, i) => i !== index),
      },
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      doctorDetails: {
        ...formData.doctorDetails,
        experiences: [...formData.doctorDetails.experiences, { position: '', organization: '', startDate: '', endDate: '' }],
      },
    });
  };

  const updateExperience = (index, field, value) => {
    const updatedExperiences = formData.doctorDetails.experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setFormData({
      ...formData,
      doctorDetails: { ...formData.doctorDetails, experiences: updatedExperiences },
    });
  };

  const removeExperience = (index) => {
    setFormData({
      ...formData,
      doctorDetails: {
        ...formData.doctorDetails,
        experiences: formData.doctorDetails.experiences.filter((_, i) => i !== index),
      },
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      doctorDetails: {
        ...formData.doctorDetails,
        skills: [...formData.doctorDetails.skills, { name: '', level: '' }],
      },
    });
  };

  const updateSkill = (index, field, value) => {
    const updatedSkills = formData.doctorDetails.skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    setFormData({
      ...formData,
      doctorDetails: { ...formData.doctorDetails, skills: updatedSkills },
    });
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      doctorDetails: {
        ...formData.doctorDetails,
        skills: formData.doctorDetails.skills.filter((_, i) => i !== index),
      },
    });
  };

  const handleWorkScheduleChange = (field, value) => {
    setFormData({
      ...formData,
      doctorDetails: {
        ...formData.doctorDetails,
        workSchedule: {
          ...formData.doctorDetails.workSchedule,
          [field === 'start' || field === 'end' ? 'hours' : field]: 
            field === 'start' || field === 'end' 
              ? { ...formData.doctorDetails.workSchedule.hours, [field]: value }
              : value,
        },
      },
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={4}>
          Admin Panel - Manage Accounts
        </Typography>
        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: 'white',
                boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {editUserId ? 'Edit User' : 'Add New User'}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="password"
                  label="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editUserId}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <TextField
                  select
                  fullWidth
                  margin="normal"
                  label="Role"
                  value={formData.roleName}
                  onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                >
                  <MenuItem value="Customer">Customer</MenuItem>
                  <MenuItem value="Staff">Staff</MenuItem>
                  <MenuItem value="Doctor">Doctor</MenuItem>
                </TextField>

                {formData.roleName === 'Doctor' && (
                  <>
                    {/* Certificates */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={3} mb={1}>
                      Certificates
                    </Typography>
                    {formData.doctorDetails.certificates.map((cert, index) => (
                      <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            label="Certificate Name"
                            value={cert.name}
                            onChange={(e) => updateCertificate(index, 'name', e.target.value)}
                            required
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            label="Issued By"
                            value={cert.issuedBy}
                            onChange={(e) => updateCertificate(index, 'issuedBy', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            type="date"
                            label="Date"
                            InputLabelProps={{ shrink: true }}
                            value={cert.date}
                            onChange={(e) => updateCertificate(index, 'date', e.target.value)}
                            required
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton onClick={() => removeCertificate(index)} color="error">
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <Button startIcon={<Add />} onClick={addCertificate} sx={{ mb: 2 }}>
                      Add Certificate
                    </Button>

                    {/* Experiences */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={3} mb={1}>
                      Experiences
                    </Typography>
                    {formData.doctorDetails.experiences.map((exp, index) => (
                      <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            label="Position"
                            value={exp.position}
                            onChange={(e) => updateExperience(index, 'position', e.target.value)}
                            required
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            label="Organization"
                            value={exp.organization}
                            onChange={(e) => updateExperience(index, 'organization', e.target.value)}
                            required
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            fullWidth
                            type="date"
                            label="Start Date"
                            InputLabelProps={{ shrink: true }}
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                            required
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            fullWidth
                            type="date"
                            label="End Date"
                            InputLabelProps={{ shrink: true }}
                            value={exp.endDate}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton onClick={() => removeExperience(index)} color="error">
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <Button startIcon={<Add />} onClick={addExperience} sx={{ mb: 2 }}>
                      Add Experience
                    </Button>

                    {/* Skills */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={3} mb={1}>
                      Skills
                    </Typography>
                    {formData.doctorDetails.skills.map((skill, index) => (
                      <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            label="Skill Name"
                            value={skill.name}
                            onChange={(e) => updateSkill(index, 'name', e.target.value)}
                            required
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            label="Level"
                            value={skill.level}
                            onChange={(e) => updateSkill(index, 'level', e.target.value)}
                            required
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton onClick={() => removeSkill(index)} color="error">
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <Button startIcon={<Add />} onClick={addSkill} sx={{ mb: 2 }}>
                      Add Skill
                    </Button>

                    {/* Work Schedule */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={3} mb={1}>
                      Work Schedule
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Days (comma-separated)"
                      value={formData.doctorDetails.workSchedule.days.join(',')}
                      onChange={(e) => handleWorkScheduleChange('days', e.target.value.split(','))}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Start Time"
                          type="time"
                          InputLabelProps={{ shrink: true }}
                          value={formData.doctorDetails.workSchedule.start}
                          onChange={(e) => handleWorkScheduleChange('start', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="End Time"
                          type="time"
                          InputLabelProps={{ shrink: true }}
                          value={formData.doctorDetails.workSchedule.end}
                          onChange={(e) => handleWorkScheduleChange('end', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontWeight: 'bold',
                    fontSize: 16,
                    borderRadius: 2,
                  }}
                >
                  {editUserId ? 'Update User' : 'Add User'}
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Table Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: 'white',
                boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={3}>
                User List
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'grey.200' }}>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id} sx={{ '&:hover': { backgroundColor: 'grey.100' } }}>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.roleName}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleEdit(user)}
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(user._id)}
                            variant="contained"
                            color="error"
                            size="small"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminPanel;