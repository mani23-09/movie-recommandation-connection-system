import React, { useState } from 'react'; 
import { flexst } from './Mood'; 
import { QuestionMarkRounded } from '@mui/icons-material'; 
import { FormControlLabel, Checkbox, Typography, Paper, Button } from '@mui/material';  

export default function Genre() {     
    const [selectedGenres, setSelectedGenres] = useState([]);     
    const url = new URLSearchParams(window.location.search);     
    const mood = url.get('mood'); // Retrieving 'mood' from the query params      

    const genreList = [
        'Drama', '😂 Comedy', '💥 Action', '🧟 Horror', '🚀 Sci-Fi', '🕵️ Mystery', '❤️ Romance', 
        '🧚 Fantasy', '🎤 Musical', '🤠 Western', '👨‍👩‍👧‍👦 Family', '🎬 Thriller', '👀 Suspense',
        '🗡️ Adventure',  '👻 Supernatural', '🧑‍⚖️ Crime'
    ];

    const handleGenreChange = (genre) => {
        const genreName = genre.replace(/[\p{Emoji}\p{P}]/gu, '').trim(); // Remove the emoji
        if (selectedGenres.includes(genreName)) {             
            setSelectedGenres(selectedGenres.filter(g => g !== genreName)); // Deselect genre if already selected         
        } else if (selectedGenres.length < 3) {             
            setSelectedGenres([...selectedGenres, genreName]); // Select genre if less than 3 selected         
        }     
    };      

    const handleSubmit = (e) => {         
        e.preventDefault(); // Prevent page reload         
        
        // Convert genres array to a string and encode it using encodeURIComponent
        const encodedGenres = encodeURIComponent(selectedGenres); // Directly use encodeURIComponent
        
        // Redirect to the new URL with selected genres
        window.location = `/Cool?mood=${mood}&genre=${btoa(encodedGenres)}`;     
    };      

    const backstyle = {         
        color: 'black',         
        height: '100vh',         
        width: '100%',         
        display: 'flex',         
        alignItems: 'center',         
        justifyContent: 'center',     
    };      

    return (         
        <div style={{ ...flexst, ...backstyle, background: 'radial-gradient(circle, #89CFF0, #0E4C92)', paddingTop: 50,paddingBottom:50,height:'auto' }}>             
            <div style={{ border: '7px solid #32CD32', borderLeft: 'none', width: '50vw', height: '60vh', borderRadius: 50, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>                 
                <div style={{ height: '50vh', width: '20vw', display: 'flex', marginTop: 20, marginLeft: -160 }}>                     
                    <h1><QuestionMarkRounded style={{ fontSize: 350, color: '#32CD32' }} /></h1>                 
                </div>             
            </div>             
            <Typography variant="h3" style={{ margin: '20px 0', color: '#FFF', textShadow: '2px 2px 4px #000' }}>                 
                Select Your Favorite Genres (Max 3)             
            </Typography>             
            <Typography variant="h6" style={{ margin: '10px 0', color: '#FFF' }}>                 
                Selected Genres: {selectedGenres.join(', ')}             
            </Typography>             
            <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', gap: 50 }}>                 
                {/* First Genre Paper */}                 
                <Paper elevation={10} style={{ width: '30vw', padding: 20, height: '60vh', borderRadius: 20, background: 'rgba(255, 255, 255, 0.9)' }}>                     
                    {genreList.slice(0, 8).map((genre, index) => (                         
                        <FormControlLabel                             
                            key={index}                             
                            control={<Checkbox                                 
                                checked={selectedGenres.includes(genre.replace(/[\p{Emoji}\p{P}]/gu, '').trim())}                                 
                                onChange={() => handleGenreChange(genre)}                                 
                                disabled={selectedGenres.length >= 3 && !selectedGenres.includes(genre.replace(/[\p{Emoji}\p{P}]/gu, '').trim())} // Disable if max limit reached                             
                            />}                             
                            label={genre}                             
                            style={{ margin: 10 }}                         
                        />                     
                    ))}                 
                </Paper>                  
                {/* Second Genre Paper */}                 
                <Paper elevation={10} style={{ width: '30vw', padding: 20, height: '60vh', borderRadius: 20, background: 'rgba(255, 255, 255, 0.9)' }}>                     
                    {genreList.slice(8).map((genre, index) => (                         
                        <FormControlLabel                             
                            key={index}                             
                            control={<Checkbox                                 
                                checked={selectedGenres.includes(genre.replace(/[\p{Emoji}\p{P}]/gu, '').trim())}                                 
                                onChange={() => handleGenreChange(genre)}                                 
                                disabled={selectedGenres.length >= 3 && !selectedGenres.includes(genre.replace(/[\p{Emoji}\p{P}]/gu, '').trim())} // Disable if max limit reached                             
                            />}                             
                            label={genre}                             
                            style={{ margin: 10 }}                         
                        />                     
                    ))}                 
                </Paper>             
            </div>             
            <Button variant="contained" style={{ marginBottom: 20,marginTop:50, width: '50vw' }} onClick={handleSubmit} fullWidth>                 
                Submit             
            </Button>                     
        </div>     
    ); 
}
