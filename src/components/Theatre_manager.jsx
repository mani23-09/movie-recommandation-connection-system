import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';
import '../App.css'
const Theatre_manager = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    mobile: '',
    theatreName: '', // New field added
  });

  const [isMsg, setMsg] = useState(''); // Message state

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log form data for debugging
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/addtheatreadmin?username=${formData.username}&password=${formData.password}&email=${formData.email}&mobile=${formData.mobile}&theatre=${formData.theatreName}`
      );
      setMsg(res.data.message); // Set the success message
      setFormData({
        username: '',
        password: '',
        email: '',
        mobile: '',
        theatreName: '', // Reset all fields
      });
    } catch (err) {
      setMsg('Add failed'); // Set failure message
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Theatre Name"
            name="theatreName"
            value={formData.theatreName}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
        {isMsg && (
          <Typography variant="body1" color={isMsg === 'Add failed' ? 'error' : 'success'} sx={{ mt: 2 }}>
            {isMsg}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Theatre_manager;
