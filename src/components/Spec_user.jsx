import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css'
import {
  Avatar,
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Paper,
  IconButton
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";

import { UpdateProfileForm } from "./Update_user";

const drawerWidth = 240;

export function Spec_User() {
  const username = localStorage.getItem("user");
  const [isUser, setUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab ? parseInt(savedTab, 10) : 0;
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user?usern=${username}`)
      .then((res) => {
        setUser(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [username]);

  const handlePeopleClick = () => {
    axios
      .get(`http://localhost:5000/others?usern=${username}`)
      .then((res) => {
        setOtherUsers(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
    setActiveTab(1);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setActiveTab(2);
  };

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    localStorage.setItem("activeTab", tabIndex);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            User Dashboard
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => handleTabChange(0)}
            sx={{
              backgroundColor: activeTab === 0 ? "#ddd" : "transparent",
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          <ListItem
            button
            onClick={handlePeopleClick}
            sx={{
              backgroundColor: activeTab === 1 ? "#d3d3d3" : "transparent",
            }}
          >
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="Peoples" />
          </ListItem>

          <ListItem
            button
            onClick={() => handleTabChange(3)}
            sx={{
              backgroundColor: activeTab === 3 ? "#d3d3d3" : "transparent",
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Update Profile" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#fafafa",
          p: 3,
          minHeight: "100vh",
        }}
      >
        {activeTab === 0 && isUser && (
          <>
            <Typography variant="h5" gutterBottom>
              Welcome, {isUser?.username}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <Avatar
                      src={isUser.avatar}
                      alt={isUser.username}
                      sx={{ width: 100, height: 100 }}
                    />
                    <Typography variant="h6">{isUser.username}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Role: {isUser.role}
                    </Typography>
                      {
                        isUser.role === "Theatre Admin" ?
                        <Typography variant="body2" color="text.secondary">{isUser.theatre}</Typography>:null
                      }
                    
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography>Email: {isUser.email}</Typography>
                    <Typography>Phone: {isUser.mobile}</Typography>
                    <Typography>Username: {isUser.username}</Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Selected Movies
                  </Typography>
                  <ul>
                    {/* {isUser.role!="admin" && isUser.role!="Theatre Admin" && (
                      {isUser.selmovies.map((movie, idx) => (
                        <li key={idx}>
                          <Typography>{movie}</Typography>
                        </li>
                      ))}
                    ) } */}
                  </ul>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}

        {/* People List */}
        {activeTab === 1 && (
          <Grid container spacing={3}>
            {otherUsers.map((user) => (
              <Grid item xs={12} md={6} lg={4} key={user._id}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                    onClick={() => handleUserClick(user)}
                    sx={{ cursor: "pointer" }}
                  >
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
            ))}
          </Grid>
        )}

        {/* Selected User Profile */}
        {activeTab === 2 && selectedUser && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              {selectedUser.username}'s Profile
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <Avatar
                      src={selectedUser.avatar}
                      alt={selectedUser.username}
                      sx={{ width: 100, height: 100 }}
                    />
                    <Typography variant="h6">{selectedUser.username}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Role: {selectedUser.role}
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
                    <Typography>Email: {selectedUser.email}</Typography>
                    <Typography>Phone: {selectedUser.mobile}</Typography>
                    <Typography>Username: {selectedUser.username}</Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>Email: </Typography>
                      <IconButton
                        component="a"
                        href={`mailto:${selectedUser.email}`}
                        color="primary"
                      >
                        <EmailIcon />
                      </IconButton>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>Phone: </Typography>
                      <IconButton
                        component="a"
                        href={`tel:${selectedUser.mobile}`}
                        color="primary"
                      >
                        <PhoneIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Update Profile Form */}
        {activeTab === 3 && (
          <Box sx={{ mt: 3 }}>
            <UpdateProfileForm />
          </Box>
        )}
      </Box>
    </Box>
  );
}
