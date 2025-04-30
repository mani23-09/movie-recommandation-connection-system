import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the username from the URL
import axios from "axios";
import '../App.css'
import {
  Avatar,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";

export function OthersProfile() {
  const { username } = useParams(); // Get username from the URL params
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user?usern=${username}`)
      .then((res) => {
        setUser(res.data.message); // Set user data
      })
      .catch((err) => {
        console.error(err);
      });
  }, [username]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {user.username}'s Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Avatar
                src={user.avatar}
                alt={user.username}
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body2" color="text.secondary">
                Role: {user.role}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon fontSize="small" />
                <Typography>{user.email}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon fontSize="small" />
                <Typography>{user.mobile}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon fontSize="small" />
                <Typography>Username: {user.username}</Typography>
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom>
              Selected Movies
            </Typography>
            <ul>
              {user.selmovies.map((movie, idx) => (
                <li key={idx}>
                  <Typography>{movie}</Typography>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
