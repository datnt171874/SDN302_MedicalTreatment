import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Badge,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Send as SendIcon, 
  Search as SearchIcon,
  FilterList as FilterListIcon 
} from '@mui/icons-material';

function MessagesComments() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'Dr. Emily White', 
      content: 'Hi John, your lab results are ready. Please schedule a follow-up.', 
      time: '2 hours ago', 
      avatar: '/static/images/avatar/dr_white.jpg',
      type: 'doctor',
      unread: true
    },
    { 
      id: 2, 
      sender: 'You', 
      content: 'Okay, thank you Dr. White. I will book an appointment soon.', 
      time: '1 hour ago', 
      avatar: '/static/images/avatar/user.jpg',
      type: 'user',
      unread: false
    },
    { 
      id: 3, 
      sender: 'Admin', 
      content: 'Your annual health check-up reminder is due next month.', 
      time: '1 day ago', 
      avatar: '/static/images/avatar/admin.jpg',
      type: 'admin',
      unread: true
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          id: prevMessages.length + 1, 
          sender: 'You', 
          content: newMessage, 
          time: 'Just now', 
          avatar: '/static/images/avatar/user.jpg',
          type: 'user',
          unread: false
        }
      ]);
      setNewMessage('');
      setSnackbarMessage("Message sent successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Please enter a message.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'doctor': return '#2196f3';
      case 'admin': return '#ff9800';
      default: return '#4A6D5A';
    }
  };

  const getMessageTypeLabel = (type) => {
    switch (type) {
      case 'doctor': return 'Doctor';
      case 'admin': return 'Admin';
      default: return 'You';
    }
  };

  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(msg => msg.unread && msg.type !== 'user').length;

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#333333' }}>
              Messages & Comments
            </Typography>
            {unreadCount > 0 && (
              <Badge badgeContent={unreadCount} color="error">
                <Chip label="New Messages" color="primary" size="small" />
              </Badge>
            )}
          </Box>
          <IconButton color="primary">
            <FilterListIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {/* Messages List */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ boxShadow: 3, height: '75vh', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Search Bar */}
                <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                    }}
                  />
                </Box>

                {/* Messages */}
                <List sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                  {filteredMessages.map((message, index) => (
                    <React.Fragment key={message.id}>
                      <ListItem 
                        alignItems="flex-start" 
                        sx={{ 
                          py: 2, 
                          px: 2,
                          bgcolor: message.unread && message.type !== 'user' ? '#f3f4f6' : 'transparent',
                          '&:hover': { bgcolor: '#f8f9fa' }
                        }}
                      >
                        <Avatar 
                          alt={message.sender} 
                          src={message.avatar} 
                          sx={{ 
                            mr: 2, 
                            width: 45, 
                            height: 45,
                            border: `2px solid ${getMessageTypeColor(message.type)}`
                          }} 
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                              {message.sender}
                            </Typography>
                            <Chip 
                              label={getMessageTypeLabel(message.type)}
                              size="small"
                              sx={{ 
                                bgcolor: getMessageTypeColor(message.type),
                                color: 'white',
                                fontSize: '0.7rem',
                                height: 20
                              }}
                            />
                            {message.unread && message.type !== 'user' && (
                              <Chip label="New" color="error" size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                            )}
                          </Box>
                          <Typography variant="body1" sx={{ color: '#555', mb: 1, lineHeight: 1.5 }}>
                            {message.content}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {message.time}
                          </Typography>
                        </Box>
                      </ListItem>
                      {index < filteredMessages.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>

                {/* Message Input */}
                <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            bgcolor: 'white'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleSendMessage}
                        sx={{ backgroundColor: '#4A6D5A', '&:hover': { backgroundColor: '#3A5C4B' } }}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Quick Stats */}
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Statistics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography variant="h4" sx={{ color: '#4A6D5A', fontWeight: 700 }}>
                          {messages.length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Total Messages
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography variant="h4" sx={{ color: '#f44336', fontWeight: 700 }}>
                          {unreadCount}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Unread
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Mark all as read
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Delete old messages
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Set notification settings
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* Recent Contacts */}
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Recent Contacts
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <Avatar sx={{ mr: 2 }} src="/static/images/avatar/dr_white.jpg" />
                      <ListItemText 
                        primary="Dr. Emily White"
                        secondary="Doctor"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <Avatar sx={{ mr: 2 }} src="/static/images/avatar/admin.jpg" />
                      <ListItemText 
                        primary="Admin"
                        secondary="Technical Support"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MessagesComments;