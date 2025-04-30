import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import '../App.css'
export const AddTheatre = () => {
  const [formData, setFormData] = useState({
    movie_title: '',
    movie_info: '',
    critics_consensus: '',
    grade: '',
    mood: '',
    genre: '',
    directors: '',
    writers: '',
    cast: '',
    in_theaters_date: '',
    on_streaming_date: '',
    runtime_in_minutes: '',
    studio_name: '',
    tomatometer_status: '',
    tomatometer_rating: '',
    tomatometer_count: '',
    audience_rating: '',
  });

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  var un=localStorage.getItem("user")
  var ro=localStorage.getItem("role")
  const handleSubmit = async () => {
    try {
      const params = new URLSearchParams(formData).toString();
      const response = await axios.get(`http://localhost:5000/theatreadd?user=${un}&&role=${ro}&&${params}`);
      setAlert({ open: true, message: response.data.message, severity: 'success' });
    } catch (error) {
      const msg =
        error.response?.data?.message || 'Something went wrong!';
      setAlert({ open: true, message: msg, severity: 'error' });
    }
  };

  return (
    <Container
        maxWidth="md"
        sx={{
          mt: 5,
          background:"#ffffffad",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          minHeight: "500px", // or any height
          borderRadius: "10px", // optional
          padding: 4 // optional
        }}
      >
      <h1>Add Theatre</h1>
      <Grid container spacing={2}>
        {Object.keys(formData).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              fullWidth
              label={key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              type={
                ['runtime_in_minutes', 'tomatometer_rating', 'tomatometer_count', 'audience_rating'].includes(key)
                  ? 'number'
                  : 'text'
              }
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Submit
      </Button>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

