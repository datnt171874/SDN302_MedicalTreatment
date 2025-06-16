import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import { Add } from '@mui/icons-material';

const DoctorProfile = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [workSchedule, setWorkSchedule] = useState('');
  const [inputSkill, setInputSkill] = useState('');
  const [inputCert, setInputCert] = useState('');
  const [inputExp, setInputExp] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        console.log('Fetching doctor with userId:', userId, 'token:', localStorage.getItem('token'));
        const res = await fetch(`http://localhost:3000/api/doctors/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch doctor data: ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Doctor data:', data);
        setDoctorId(data._id);
        setSkills(Array.isArray(data.skills) ? data.skills.map(s => `${s.name} (${s.level})`) : []);
        setCertificates(Array.isArray(data.certificates) ? data.certificates.map(c => `${c.name} (${c.issuedBy || 'N/A'}, ${new Date(c.date).toLocaleDateString()})`) : []);
        setExperiences(Array.isArray(data.experiences) ? data.experiences.map(e => `${e.position} tại ${e.organization} (${new Date(e.startDate).getFullYear()} - ${e.endDate ? new Date(e.endDate).getFullYear() : 'nay'})`) : []);
        setWorkSchedule(
          data.workSchedule
            ? `${(data.workSchedule.days || []).join(', ') || 'Chưa xác định'}, ${
                data.workSchedule.hours?.start || 'N/A'
              } - ${data.workSchedule.hours?.end || 'N/A'}`
            : ''
        );
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchDoctorData();
    } else {
      setError('User ID not found. Please log in again.');
      setLoading(false);
    }
  }, [userId]);

  const addSkill = () => {
    if (inputSkill.trim()) {
      setSkills([...skills, inputSkill.trim()]);
      setInputSkill('');
    }
  };

  const addCertificate = () => {
    if (inputCert.trim()) {
      const date = new Date().toISOString(); // Temporary; consider adding date input
      setCertificates([...certificates, `${inputCert.trim()} (N/A, ${new Date(date).toLocaleDateString()})`]);
      setInputCert('');
    }
  };

  const addExperience = () => {
    if (inputExp.trim()) {
      const match = inputExp.match(/(.+) tại (.+) \((\d{4}) - (\d{4}|nay)\)/);
      if (match) {
        const [, position, organization, startYear, endYear] = match;
        setExperiences([...experiences, `${position.trim()} tại ${organization.trim()} (${startYear} - ${endYear})`]);
      } else {
        setExperiences([...experiences, inputExp.trim()]);
      }
      setInputExp('');
    }
  };

  const handleSave = async () => {
    if (!doctorId) {
      setError('Doctor ID not found. Cannot update profile.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          skills: skills.map(s => {
            const [name, level] = s.split(' (');
            return { name: name.trim(), level: level.replace(')', '').trim() };
          }),
          certificates: certificates.map(c => {
            const [name, details] = c.split(' (');
            const [issuedBy, dateStr] = details ? details.replace(')', '').split(', ') : ['N/A', new Date().toISOString()];
            return { name: name.trim(), issuedBy, date: new Date(dateStr).toISOString() };
          }),
          experiences: experiences.map(e => {
            const match = e.match(/(.+) tại (.+) \((\d{4}) - (\d{4}|nay)\)/);
            if (match) {
              const [, position, organization, startYear, endYear] = match;
              return {
                position: position.trim(),
                organization: organization.trim(),
                startDate: new Date(`${startYear}-01-01`).toISOString(),
                endDate: endYear === 'nay' ? null : new Date(`${endYear}-12-31`).toISOString(),
              };
            }
            return { position: e.trim(), organization: 'N/A', startDate: new Date().toISOString() };
          }),
          workSchedule: {
            days: workSchedule.split(',')[0]?.trim().split(' - ').filter(Boolean) || [],
            hours: {
              start: workSchedule.split('-')[1]?.split(',')[0]?.trim() || '',
              end: workSchedule.split('-')[1]?.split(',')[1]?.trim() || '',
            },
          },
        }),
      });
      if (!res.ok) {
        throw new Error(`Failed to update doctor profile: ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      console.log('Update response:', data);
      alert('Cập nhật hồ sơ thành công!');
    } catch (err) {
      console.error('Save error:', err);
      setError(`Failed to update doctor profile: ${err.message}`);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>Loading...</Box>;
  }

  if (error) {
    return (
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 5, px: 2 }}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>Thử lại</Button>
      </Box>
    );
  }

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
            label="Thêm kỹ năng (HIV Management (Expert))"
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
            label="Thêm chứng chỉ (Chứng chỉ HIV/AIDS (ĐH Y Hà Nội, 5/12/2021))"
            value={inputCert}
            onChange={(e) => setInputCert(e.target.value)}
            fullWidth
          />
          <IconButton color="primary" onClick={addCertificate}><Add /></IconButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Kinh nghiệm
        </Typography>
        <Grid container spacing={1} mb={2}>
          {experiences.map((exp, index) => (
            <Grid item key={index}><Chip label={exp} /></Grid>
          ))}
        </Grid>
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            label="Thêm kinh nghiệm (Bác sĩ tại BV Chợ Rẫy (2019 - nay))"
            value={inputExp}
            onChange={(e) => setInputExp(e.target.value)}
            fullWidth
          />
          <IconButton color="primary" onClick={addExperience}><Add /></IconButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Lịch làm việc
        </Typography>
        <TextField
          fullWidth
          value={workSchedule}
          onChange={(e) => setWorkSchedule(e.target.value)}
          label="Cập nhật lịch làm việc (Thứ Hai - Thứ Tư - 9:00, 17:00)"
        />

        <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={handleSave}>
          Lưu thay đổi
        </Button>
      </Paper>
    </Box>
  );
};

export default DoctorProfile;