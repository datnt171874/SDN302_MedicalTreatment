import React, { useState, useEffect } from "react";
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
  MenuItem,
  Select,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import DoctorLayout from "../../components/DoctorLayout";

const DoctorProfile = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [workSchedules, setWorkSchedules] = useState([
    { days: [], hours: { start: "08:00", end: "17:00" } },
  ]);
  const [inputSkill, setInputSkill] = useState("");
  const [inputCert, setInputCert] = useState("");
  const [inputExp, setInputExp] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/doctors/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error(
            `Failed to fetch doctor data: ${res.status} - ${res.statusText}`
          );
        }
        const data = await res.json();
        console.log("Fetched doctor data:", data);
        setDoctorId(data._id);
        setSkills(
          Array.isArray(data.skills)
            ? data.skills.map((s) => `${s.name} (${s.level})`)
            : []
        );
        setCertificates(
          Array.isArray(data.certificates)
            ? data.certificates.map(
                (c) =>
                  `${c.name} (${c.issuedBy || "N/A"}, ${new Date(
                    c.date
                  ).toLocaleDateString()})`
              )
            : []
        );
        setExperiences(
          Array.isArray(data.experiences)
            ? data.experiences.map(
                (e) =>
                  `${e.position} tại ${e.organization} (${new Date(
                    e.startDate
                  ).getFullYear()} - ${
                    e.endDate ? new Date(e.endDate).getFullYear() : "nay"
                  })`
              )
            : []
        );
        setWorkSchedules(
          data.workSchedule || [
            { days: [], hours: { start: "08:00", end: "17:00" } },
          ]
        );
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) fetchDoctorData();
    else {
      setError("User ID not found. Please log in again.");
      setLoading(false);
    }
  }, [userId]);

  const addSkill = () => {
    if (inputSkill.trim()) {
      setSkills([...skills, inputSkill.trim()]);
      setInputSkill("");
    }
  };

  const addCertificate = () => {
    if (inputCert.trim()) {
      const date = new Date().toISOString();
      setCertificates([
        ...certificates,
        `${inputCert.trim()} (N/A, ${new Date(date).toLocaleDateString()})`,
      ]);
      setInputCert("");
    }
  };

  const addExperience = () => {
    if (inputExp.trim()) {
      const match = inputExp.match(/(.+) tại (.+) \((\d{4}) - (\d{4}|nay)\)/);
      if (match) {
        const [, position, organization, startYear, endYear] = match;
        setExperiences([
          ...experiences,
          `${position.trim()} tại ${organization.trim()} (${startYear} - ${endYear})`,
        ]);
      } else {
        setExperiences([...experiences, inputExp.trim()]);
      }
      setInputExp("");
    }
  };

  const addWorkSchedule = () => {
    setWorkSchedules([
      ...workSchedules,
      { days: [], hours: { start: "08:00", end: "17:00" } },
    ]);
  };

  const updateWorkSchedule = (index, field, value) => {
    const newSchedules = [...workSchedules];
    if (field === "start" || field === "end") {
      newSchedules[index] = {
        ...newSchedules[index],
        hours: {
          ...newSchedules[index].hours,
          [field]: value,
        },
      };
    } else {
      newSchedules[index] = {
        ...newSchedules[index],
        [field]: value,
      };
    }
    setWorkSchedules(newSchedules);
  };

  const handleSave = async () => {
    if (!doctorId) {
      setError("Doctor ID not found. Cannot update profile.");
      return;
    }
    try {
      const requestBody = {
        skills: skills.map((s) => {
          const [name, level] = s.split(" (");
          return { name: name.trim(), level: level.replace(")", "").trim() };
        }),
        certificates: certificates.map((c) => {
          const [name, details] = c.split(" (");
          const [issuedBy, dateStr] = details
            ? details.replace(")", "").split(", ")
            : ["N/A", new Date().toISOString()];
          return {
            name: name.trim(),
            issuedBy,
            date: new Date(dateStr).toISOString(),
          };
        }),
        experiences: experiences.map((e) => {
          const match = e.match(/(.+) tại (.+) \((\d{4}) - (\d{4}|nay)\)/);
          if (match) {
            const [, position, organization, startYear, endYear] = match;
            return {
              position: position.trim(),
              organization: organization.trim(),
              startDate: new Date(`${startYear}-01-01`).toISOString(),
              endDate:
                endYear === "nay"
                  ? null
                  : new Date(`${endYear}-12-31`).toISOString(),
            };
          }
          return {
            position: e.trim(),
            organization: "N/A",
            startDate: new Date().toISOString(),
          };
        }),
        workSchedule: workSchedules,
      };
      console.log("Request body:", requestBody);
      const res = await fetch(`http://localhost:3000/api/doctors/${doctorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) throw new Error(`Failed to update: ${res.status}`);
      const data = await res.json();
      console.log("Update response:", data);
      alert("Cập nhật hồ sơ thành công!");
    } catch (err) {
      setError(`Failed to update: ${err.message}`);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        Loading...
      </Box>
    );
  if (error)
    return (
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 5, px: 2 }}>
        <Typography color="error">{error}</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Thử lại
        </Button>
      </Box>
    );

  return (
    <DoctorLayout activeItem="Profile">
      <Box sx={{ p: 4 }}>
        <Paper elevation={4} sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            color="black"
            textAlign="center"
          >
            Hồ sơ bác sĩ
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Kỹ năng
          </Typography>
          <Grid container spacing={1} mb={2}>
            {skills.map((skill, index) => (
              <Grid item key={index}>
                <Chip label={skill} />
              </Grid>
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
            <IconButton color="primary" onClick={addSkill}>
              <Add />
            </IconButton>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Chứng chỉ
          </Typography>
          <Grid container spacing={1} mb={2}>
            {certificates.map((cert, index) => (
              <Grid item key={index}>
                <Chip label={cert} />
              </Grid>
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
            <IconButton color="primary" onClick={addCertificate}>
              <Add />
            </IconButton>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Kinh nghiệm
          </Typography>
          <Grid container spacing={1} mb={2}>
            {experiences.map((exp, index) => (
              <Grid item key={index}>
                <Chip label={exp} />
              </Grid>
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
            <IconButton color="primary" onClick={addExperience}>
              <Add />
            </IconButton>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Lịch làm việc
          </Typography>
          {workSchedules.map((schedule, index) => (
            <Box key={index} mb={2}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={4}>
                  <Select
                    fullWidth
                    multiple
                    value={schedule.days || []}
                    onChange={(e) =>
                      updateWorkSchedule(index, "days", e.target.value)
                    }
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    select
                    label="Start Time"
                    value={schedule.hours.start || "08:00"}
                    onChange={(e) =>
                      updateWorkSchedule(index, "start", e.target.value)
                    }
                  >
                    {Array.from({ length: 19 }, (_, i) => {
                      const hour = 8 + Math.floor(i / 2);
                      const minute = (i % 2) * 30;
                      const time = `${hour.toString().padStart(2, "0")}:${minute
                        .toString()
                        .padStart(2, "0")}`;
                      return (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    select
                    label="End Time"
                    value={schedule.hours.end || "17:00"}
                    onChange={(e) =>
                      updateWorkSchedule(index, "end", e.target.value)
                    }
                  >
                    {Array.from({ length: 19 }, (_, i) => {
                      const hour = 8 + Math.floor(i / 2);
                      const minute = (i % 2) * 30;
                      const time = `${hour.toString().padStart(2, "0")}:${minute
                        .toString()
                        .padStart(2, "0")}`;
                      return (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="outlined"
                    onClick={addWorkSchedule}
                    fullWidth
                  >
                    Thêm lịch
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleSave}
          >
            Lưu thay đổi
          </Button>
        </Paper>
      </Box>
    </DoctorLayout>
  );
};

export default DoctorProfile;
