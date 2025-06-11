import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  IconButton
} from '@mui/material';
import {
  MedicalInformation as MedicalIcon,
  CalendarMonth as CalendarIcon,
  Chat as ChatIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

function Dashboard() {
  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Good Morning, User!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to your Medical Treatment dashboard.
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" startIcon={<AddIcon />}>
              New Appointment
            </Button>
            <Button variant="outlined" startIcon={<VisibilityIcon />}>
              View Records
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Main Content Area - mimicking the image layout */}
        <Grid item xs={12} md={7}>
          {/* Creating Polished Invoices Effortlessly - Placeholder */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Effortless Health Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Efficiently manage your medical appointments, records, and communications.
              </Typography>
              <Button variant="contained" color="primary">
                Learn More
              </Button>
            </CardContent>
          </Card>

          {/* Overview Cards - Similar to the current setup */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  avatar={<CalendarIcon color="primary" />}
                  title="Upcoming Appointments"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    2
                  </Typography>
                  <Typography color="text.secondary">
                    Appointments this week
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  avatar={<MedicalIcon color="primary" />}
                  title="Medical Records"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    5
                  </Typography>
                  <Typography color="text.secondary">
                    Recent visits
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  avatar={<ChatIcon color="primary" />}
                  title="New Messages"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    3
                  </Typography>
                  <Typography color="text.secondary">
                    Unread messages
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Spendings - Placeholder */}
          <Card>
            <CardHeader title="Health Spendings" action={<IconButton><MoreVertIcon /></IconButton>} />
            <CardContent>
              <Typography variant="h6">$1,567 / $5,000</Typography>
              <Typography color="text.secondary">Annual Health Budget</Typography>
              {/* Add a progress bar here if needed */}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Charts and Quick Transfer */}
        <Grid item xs={12} md={5}>
          {/* Total Revenue - Placeholder for a chart */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Total Health Expenses" action={<IconButton><MoreVertIcon /></IconButton>} />
            <CardContent>
              <Typography variant="h5">$4,592.34</Typography>
              <Typography color="text.secondary">+0.89% than last week</Typography>
              <Box sx={{ height: 200, bgcolor: 'grey.200', borderRadius: 1 }} /> {/* Placeholder for chart */}
            </CardContent>
          </Card>

          {/* Withdrawn - Placeholder */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Payments Made" action={<IconButton><MoreVertIcon /></IconButton>} />
            <CardContent>
              <Typography variant="h6">4,583</Typography>
              <Typography color="text.secondary">+1.2% than last week</Typography>
              {/* Add a small chart or progress here */}
            </CardContent>
          </Card>

          {/* Quick Transfer - Placeholder */}
          <Card>
            <CardHeader title="Quick Contact" action={<IconButton><MoreVertIcon /></IconButton>} />
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Contact a medical professional.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                <Avatar src="" />
                <Box>
                  <Typography variant="subtitle1">Dr. John Doe</Typography>
                  <Typography variant="body2" color="text.secondary">Cardiologist</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src="" />
                <Box>
                  <Typography variant="subtitle1">Nurse Jane Smith</Typography>
                  <Typography variant="body2" color="text.secondary">General Nurse</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;