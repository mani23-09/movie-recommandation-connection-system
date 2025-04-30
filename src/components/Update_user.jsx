import { useState } from 'react';
import { TextField, Button, Avatar, Box, Typography } from '@mui/material';
import '../App.css'
export function UpdateProfileForm() {
  const [formData, setFormData] = useState({
    usern: localStorage.getItem("user") || '',
    rolen: localStorage.getItem("role") || '',
    email: '',
    password: '',
    phone: '',
    imgurl: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      // Manually build query with double &&
      const queryString = `usern=${encodeURIComponent(formData.usern)}&&rolen=${encodeURIComponent(formData.rolen)}&&email=${encodeURIComponent(formData.email)}&&Password=${encodeURIComponent(formData.password)}&&phone=${encodeURIComponent(formData.phone)}&&imgurl=${encodeURIComponent(formData.imgurl)}`;
      const response = await fetch(`http://localhost:5000/updateuser?${queryString}`);
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Update Profile</Typography>

      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="phone"
        label="Phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="imgurl"
        label="Image URL"
        value={formData.imgurl}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {formData.imgurl && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Avatar src={formData.imgurl} alt="Avatar" sx={{ width: 64, height: 64 }} />
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Update
      </Button>
      {message && (
        <Typography mt={2} color="success.main">
          {message}
        </Typography>
      )}
    </Box>
  );
}
