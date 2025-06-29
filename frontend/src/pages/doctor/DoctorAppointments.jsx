import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import DoctorLayout from "../../components/DoctorLayout";

const localizer = momentLocalizer(moment);

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/appointment/appointment",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const formattedAppointments = response.data.map((appt) => {
          const start = new Date(appt.appointmentDate);
          const duration = appt.duration ? parseInt(appt.duration) : 30;
          const end = new Date(start.getTime() + duration * 60000);
          return {
            id: appt._id,
            title: `${appt.appointmentType} - ${
              appt.userId?.fullName || "Unknown Patient"
            }`,
            start,
            end,
            allDay: false,
            resource: appt,
          };
        });

        setAppointments(formattedAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err.response?.data?.message || "Failed to fetch appointments");
      }
    };

    fetchAppointments();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const eventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: isSelected ? "#4A6D5A" : "#4A90E2",
      color: "white",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
    };
    return { style };
  };

  return (
    <DoctorLayout activeItem="Appointments">
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#000" }}
          >
            Quản lý lịch hẹn
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Calendar
            localizer={localizer}
            events={appointments}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, marginTop: "2rem" }}
            onSelectEvent={handleSelectEvent}
            selectable
            eventPropGetter={eventPropGetter}
            step={30}
            timeslots={1}
            defaultView="week"
            views={["month", "week", "day"]}
          />
        </Paper>
      </Container>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
          Appointment Details
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Appointment Type:</strong>{" "}
                {selectedEvent.resource.appointmentType}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Patient Name:</strong>{" "}
                {selectedEvent.resource.userId?.fullName || "Unknown Patient"}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Date & Time:</strong>{" "}
                {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm a")}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Duration:</strong>{" "}
                {selectedEvent.resource.duration || "30"} minutes
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Code:</strong>{" "}
                {selectedEvent.resource.appointmentCode || "N/A"}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Note:</strong>{" "}
                {selectedEvent.resource.note || "No notes"}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Age:</strong> {selectedEvent.resource.age || "N/A"}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Place of Birth:</strong>{" "}
                {selectedEvent.resource.placeOfBirth || "N/A"}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </DoctorLayout>
  );
};

export default DoctorAppointments;
