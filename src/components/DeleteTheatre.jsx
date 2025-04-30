import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import '../App.css'
export function Delete_Theatre() {
    const [movieTitles, setMovieTitles] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");
    const [isVal,setVal]=useState('')
    var ur=localStorage.getItem("user")

    useEffect(() => {
        fetch(`http://localhost:5000/titless?user=${ur}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    setMovieTitles(data.message);
                }
            })
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

    const handleDelete = () => {
        

        axios.get(`http://localhost:5000/delmov2?title=${encodeURIComponent(isVal)}&&user=${ur}`)
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
            <h1 style={{color:"purple"}}>Delete Movie</h1>
            <h2>
                Search Movie
            </h2>
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