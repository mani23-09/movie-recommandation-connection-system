import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import IMDB from "../assets/IMDB_Logo.png"
import './Result_page.css'; 
import { Box, Accordion, AccordionSummary, AccordionDetails, Button, Typography, CircularProgress } from '@mui/material'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 

export default function Resultpage() { 
    const [movies, setMovies] = useState([]); 
    const [isCast, setCast] = useState('');
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState('');
    const [rnt, setRnt] = useState('');
    const [isImg, setImg] = useState('https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak\\u003d/v3/t/assets/p163191_p_v8_al.jpg');  
    const [loadingImg, setLoadingImg] = useState(false); 
    var url = new URLSearchParams(window.location.search);
    var mood = atob(url.get('mood'));
    var genre = atob(url.get('genre'));
    var grade = atob(url.get('grade'));
    console.log(mood);

    useEffect(() => { 
        axios.get(`http://127.0.0.1:5000/recommanded?genre=${genre}&grade=${grade}&mood=${mood}`) 
            .then(response => { 
                setMovies(response.data); 
            }) 
            .catch(error => { 
                console.error('There was an error fetching the data!', error); 
            }); 
    }, []);

    function handleImg(movieTitle, cast, dat, runt, rati) {
        setLoadingImg(true);  
        axios.get(`http://127.0.0.1:5000/hello?movie=${movieTitle}`)
        .then(res => { 
            setImg(res.data.url); // Update image URL
            setLoadingImg(false);  // Set loading to false once the image is loaded
        })
        .catch(err => { 
            console.error('There was an error fetching the image data!', err); 
            setLoadingImg(false);  
        });

        setCast(cast);
        setDate(dat);
        setRnt(runt);
        setRating(parseInt(rati) / 10);
    }

    const handleAlert = (movieTitle) => {
        alert(`You clicked on ${movieTitle}`);
    };

    const flexst = { 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
    };

    return ( 
        <div className='back' style={{ ...flexst, height: 'auto' }}> 
            <div id='hell' style={{ margin: 20, background: "white", height: '20vh', borderRadius: '20vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{width:'30vw'}}>
                    <img src={IMDB} alt="Movie Recommendation" style={{ width: '30%', borderRadius: '20px', marginRight: 100 }} />
                </div>
                <Typography variant="h5" align="center" style={{ fontWeight: 'bold', color: '#3f51b5' }}>Movie Recommendation System</Typography>
            </div> 

            <div style={{ ...flexst, flexDirection: 'row'}} className='back'> 
                <Box sx={{ width: '100%', margin: 3, borderRadius: 5 }}> 
                    {movies.map((movie, index) => ( 
                        <Accordion key={index}> 
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
                                <Typography>{movie.movie_title}</Typography> 
                            </AccordionSummary> 
                            <AccordionDetails> 
                                <Typography>{movie.movie_info}</Typography> 
                                <Button 
                                    variant='outlined' 
                                    sx={{ mt: 2 }} 
                                    onClick={() => handleAlert(movie.movie_title)}> 
                                    Alert Movie Title 
                                </Button>
                            </AccordionDetails> 
                            <div style={{ width: '100%', textAlign: 'right' }}> 
                                <Button 
                                    variant='contained' 
                                    sx={{ mt: 2, margin: 2 }} 
                                    onClick={() => handleImg(movie.movie_title, movie.cast, movie.in_theaters_date, movie.runtime_in_minutes, movie.audience_rating)}> 
                                    Show Images & Details 
                                </Button> 
                            </div> 
                        </Accordion> 
                    ))} 
                </Box> 

                <Box sx={{ width: '20%', height: 'auto', overflowY: 'scroll', maxHeight: '80vh', padding: 3, borderRadius: 5 }}>
                    <div style={{position:'fixed',opacity:'0.5',height: '100%', background: 'blue', overflowY: 'scroll', maxHeight: '80vh', padding: 3, borderRadius: 5}}>
                    
                    <Box sx={{ width: '100%', height: 'auto', padding: 5, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                        {loadingImg ? ( 
                            <CircularProgress color='white' />  // Display the spinner while the image is loading
                        ) : (
                            isImg ? ( 
                                <img src={isImg} alt="Movie" style={{ width: '100%', height: '50%', borderRadius: 5 }} /> 
                            ) : (
                                <Typography>No image available</Typography> 
                            )
                        )}
                    </Box> 

                    {/* Movie Details Section */}
                    <Box sx={{ marginTop: 5 ,color:'white'}}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                        <span
                            key={star}
                            style={{
                            fontSize: '30px',
                            cursor: 'pointer',
                            color: star <= rating ? 'gold' : 'gray',
                            }}>
                            ★
                        </span>
                        ))}
                    </div>
                        <Typography variant="h6" gutterBottom><strong>Running Time:</strong> {rating * 10} minutes</Typography>
                        <Typography variant="h6" gutterBottom><strong>Release Date:</strong> {date}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Cast:</strong> {isCast}</Typography>
                        <div style={{height:50}}></div>
                    </Box>
                    </div>
                </Box>
            </div> 
        </div> 
    ); 
}