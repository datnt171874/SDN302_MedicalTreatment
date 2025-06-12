import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  Grid,
  Divider,
  IconButton
} from '@mui/material';
import { Add } from '@mui/icons-material';

const DoctorProfile = () => {
  const [skills, setSkills] = useState(['HIV Management', 'ARV Therapy']);
  const [certificates, setCertificates] = useState(['Chứng chỉ HIV/AIDS', 'Bằng Bác sĩ chuyên khoa']);
  const [workSchedule, setWorkSchedule] = useState('Thứ 2 - Thứ 6, 08:00 - 17:00');
  const [inputSkill, setInputSkill] = useState('');
  const [inputCert, setInputCert] = useState('');

  const addSkill = () => {
    if (inputSkill.trim()) {
      setSkills([...skills, inputSkill.trim()]);
      setInputSkill('');
    }
  };

  const addCertificate = () => {
    if (inputCert.trim()) {
      setCertificates([...certificates, inputCert.trim()]);
      setInputCert('');
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 5, px: 2 }}>
      <Paper elevation={4} sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="black" textAlign="center">
          Hồ sơ bác sĩ
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Kỹ năng
        </Typography>
        <Grid container spacing={1} mb={2}>
          {skills.map((skill, index) => (
            <Grid item key={index}><Chip label={skill} /></Grid>
          ))}
        </Grid>
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            label="Thêm kỹ năng"
            value={inputSkill}
            onChange={(e) => setInputSkill(e.target.value)}
            fullWidth
          />
          <IconButton color="primary" onClick={addSkill}><Add /></IconButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Chứng chỉ
        </Typography>
        <Grid container spacing={1} mb={2}>
          {certificates.map((cert, index) => (
            <Grid item key={index}><Chip label={cert} /></Grid>
          ))}
        </Grid>
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            label="Thêm chứng chỉ"
            value={inputCert}
            onChange={(e) => setInputCert(e.target.value)}
            fullWidth
          />
          <IconButton color="primary" onClick={addCertificate}><Add /></IconButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Lịch làm việc
        </Typography>
        <TextField
          fullWidth
          value={workSchedule}
          onChange={(e) => setWorkSchedule(e.target.value)}
          label="Cập nhật lịch làm việc"
        />

        <Button variant="contained" sx={{ mt: 3 }} fullWidth>
          Lưu thay đổi
        </Button>
      </Paper>
    </Box>
  );
};

export default DoctorProfile;
