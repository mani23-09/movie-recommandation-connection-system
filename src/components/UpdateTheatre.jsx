import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import '../App.css'
export function Update_Theatre() {
    const [movieTitles, setMovieTitles] = useState([]);
    const [isVal, setVal] = useState('');
    const [movieData, setMovieData] = useState(null); // original data
    const [formData, setFormData] = useState({});     // editable fields
    var ur=localStorage.getItem("user")
    useEffect(() => {
        fetch(`http://localhost:5000/titless?user=${ur}`)
            .then(res => res.json())
            .then(data => {
                if (data.message) setMovieTitles(data.message);
            })
            .catch(err => console.error("Error fetching movies:", err));
    }, []);

    const handleSubmit = () => {
        axios.get(`http://localhost:5000/returnmovie2?movie=${isVal}&&user=${ur}`)
            .then(res => {
                setMovieData(res.data.message);
                setFormData(res.data.message);
            })
            .catch(err => console.error(err));
    };

    const handleFieldChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleUpdate = () => {
        const queryString = new URLSearchParams(formData).toString();

        axios.get(`http://localhost:5000/update_movie_t?user=${localStorage.getItem("user")}&&role=${localStorage.getItem("role")}&&${queryString}`)
            .then(res => {
                alert(res.data.message);
            })
            .catch(err => {
                console.error(err);
                alert("Error updating movie.");
            });
    };

    return (
        <div style={{ textAlign: 'center' ,}}>
            <h1>Update Movie</h1>
            <Typography variant="h6">Search Movie:</Typography>
            <input
                list="movies"
                value={isVal}
                onChange={(e) => setVal(e.target.value)}
                placeholder="Type to search..."
                style={{
                    width: "60vw",
                    height: 50,
                    border: "2px solid #ccc",
                    borderRadius: "8px",
                    padding: "0 15px",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    outline: "none",
                    boxShadow: "0 0 0px rgba(0,0,0,0)",
                }}
                onFocus={(e) => {
                    e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.6)";
                    e.target.style.border = "2px solid #007bff";
                }}
                onBlur={(e) => {
                    e.target.style.boxShadow = "0 0 0px rgba(0,0,0,0)";
                    e.target.style.border = "2px solid #ccc";
                }}
            />

            <datalist id="movies" >
                {movieTitles.map((title, index) => (
                    <option key={index} value={title} />
                ))}
            </datalist>
            <br /><br />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>

            {movieData && (
                <div style={{ marginTop: '20px', mt: 5,
                    background:"#ffffffad",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat",
                    minHeight: "500px", // or any height
                    borderRadius: "10px", // optional
                    padding: 4  }} >
                    <Typography variant="h6">Edit Movie Information:</Typography>
                    <Grid container spacing={2}>
                        {Object.entries(formData).map(([key, value], index) => (
                            <Grid item xs={12} key={index}>
                                <TextField
                                    label={key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                                    value={value}
                                    onChange={(e) => handleFieldChange(key, e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <br />
                    <Button variant="contained" color="secondary" onClick={handleUpdate}>
                        Update Movie
                    </Button>
                </div>
            )}
        </div>
    );
}
