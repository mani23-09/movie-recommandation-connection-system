import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import '../App.css'
export function Update_movie() {
    const [movieTitles, setMovieTitles] = useState([]);
    const [isVal, setVal] = useState('');
    const [movieData, setMovieData] = useState(null); // original data
    const [formData, setFormData] = useState({});     // editable fields

    useEffect(() => {
        fetch("http://localhost:5000/titles")
            .then(res => res.json())
            .then(data => {
                if (data.message) setMovieTitles(data.message);
            })
            .catch(err => console.error("Error fetching movies:", err));
    }, []);

    const handleSubmit = () => {
        axios.get(`http://localhost:5000/returnmovie?movie=${isVal}`)
            .then(res => {
                setMovieData(res.data.message);
                setFormData(res.data.message); // populate editable data
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

        axios.get(`http://localhost:5000/updateMovie?${queryString}`)
            .then(res => {
                alert(res.data.message || "Movie updated successfully!");
            })
            .catch(err => {
                console.error(err);
                alert("Error updating movie.");
            });
    };

    return (
        <div style={{ textAlign: 'center' ,}}>
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


export function Delete_movie() {
    const [movieTitles, setMovieTitles] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");
    const [isVal,setVal]=useState('')

    useEffect(() => {
        fetch("http://localhost:5000/titles")
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    setMovieTitles(data.message);
                }
            })
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

    const handleDelete = () => {
        

        axios.get(`http://localhost:5000/delmov?title=${encodeURIComponent(isVal)}`)
            .then(res => {
                setDeleteMessage(res.data.message);
                // Optionally refresh the movie titles after deletion
                setMovieTitles(movieTitles.filter(title => title !== selectedMovie));
                setSelectedMovie(""); // Clear the selection
            })
            .catch(err => {
                console.error(err);
                setDeleteMessage("Error deleting the movie.");
            });
    };

    return (
        <div style={{ textAlign: 'center',height:'100vh' }} >
            <Typography variant="h4" gutterBottom>
                Search Movie
            </Typography>
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
            <datalist id="movies">
                {movieTitles.map((title, index) => (
                    <option key={index} value={title} />
                ))}
            </datalist>
                <br /><br />
            <Button variant="contained" color="primary" onClick={handleDelete}>
                Submit
            </Button>
            {deleteMessage && (
                <Typography variant="body1" style={{ marginTop: '20px', color: 'red' }}>
                    {deleteMessage}
                </Typography>
            )}
        </div>
    );
}