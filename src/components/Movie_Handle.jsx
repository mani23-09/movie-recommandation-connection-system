import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Box, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddMovieForm } from "./Movie_manage";
import { Delete_movie, Update_movie } from "./Update_movie";
import '../App.css'
const drawerWidth = 240;

export default function MovieManager() {
    const [activeTab, setActiveTab] = useState("add");

    const renderTabContent = () => {
        switch (activeTab) {
            case "add":
                return <AddMovieForm/>;
            case "update":
                return <Update_movie/>;
            case "delete":
                return <Delete_movie/>;
            default:
                return null;
        }
    };

    const menuItems = [
        { text: "Add", value: "add", icon: <AddIcon /> },
        { text: "Update", value: "update", icon: <UpdateIcon /> },
        { text: "Delete", value: "delete", icon: <DeleteIcon /> },
    ];

    return (
        <Box sx={{
            mt: 5,
            backgroundImage: 'url("https://c0.wallpaperflare.com/preview/57/497/73/movie-reel-projector-film.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "500px", 
            borderRadius: "10px",
            padding: 4 ,
            display: 'flex',
            color:"#FFF"
          }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Movie Manager
                    </Typography>
                </Box>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.value} disablePadding>
                            <ListItemButton selected={activeTab === item.value} onClick={() => setActiveTab(item.value)}>
                                {item.icon}
                                <ListItemText primary={item.text} sx={{ ml: 2 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Movie
                </Typography>
                {renderTabContent()}
            </Box>
        </Box>
    );
}
