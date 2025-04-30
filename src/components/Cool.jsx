import React, { useState } from 'react'; 
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Typography, Paper } from '@mui/material';

export default function GradeSelection() {
    const [grade, setGrade] = useState("");
    
    var url=new URLSearchParams(window.location.search);
    var mood=url.get('mood');
    var genre=url.get('genre');
    const handleGradeChange = (event) => {
        setGrade(event.target.value); // Update state when user selects a grade
    };

    const handleSubmit = ( e ) => {
        // Handle form submission here
        window.location=`/result?mood=${mood}&genre=${btoa(genre)}&grade=${btoa(grade)}`;
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(to right,#0000ff,#fff)', // Soft orange gradient
            fontFamily: 'Roboto, sans-serif',
            textAlign: 'center',
            padding: '20px'
        }}>
            <Paper elevation={8} style={{
                padding: '40px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                width: '40%',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            }}>
                <Typography variant="h4" style={{
                    marginBottom: '30px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    fontSize: '26px'
                }}>
                    Select Your Grade
                </Typography>

                <FormControl component="fieldset">
                    <FormLabel component="legend" style={{ marginBottom: '20px', fontSize: '18px', color: '#555' }}>
                        Please select your grade:
                    </FormLabel>
                    <RadioGroup value={grade} onChange={handleGradeChange} style={{ marginBottom: '30px' }}>
                        <FormControlLabel 
                            value="G" 
                            control={<Radio style={{ color: '#0000ff' }} />} 
                            label="G (General Audience)" 
                            style={{
                                display: 'block', 
                                marginBottom: '12px',
                                fontSize: '18px',
                                color: '#444',
                                background: 'transparent',
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        />
                        <FormControlLabel 
                            value="PG" 
                            control={<Radio style={{ color: '#0000ff' }} />} 
                            label="PG (Parental Guidance)" 
                            style={{
                                display: 'block', 
                                marginBottom: '12px',
                                fontSize: '18px',
                                color: '#444',
                                background: 'transparent',
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        />
                        <FormControlLabel 
                            value="PG-13" 
                            control={<Radio style={{ color: '#0000ff' }} />} 
                            label="PG-13 (Parents Strongly Cautioned)" 
                            style={{
                                display: 'block', 
                                marginBottom: '12px',
                                fontSize: '18px',
                                color: '#444',
                                background: 'transparent',
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        />
                        <FormControlLabel 
                            value="R" 
                            control={<Radio style={{ color: '#0000ff' }} />} 
                            label="R (Restricted)" 
                            style={{
                                display: 'block', 
                                marginBottom: '12px',
                                fontSize: '18px',
                                color: '#444',
                                background: 'transparent',
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        />
                        <FormControlLabel 
                            value="UR" 
                            control={<Radio style={{ color: '#0000ff' }} />} 
                            label="UR (Unrated)" 
                            style={{
                                display: 'block', 
                                marginBottom: '12px',
                                fontSize: '18px',
                                color: '#444',
                                background: 'transparent',
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        />
                    </RadioGroup>
                </FormControl>

                <Button 
                    variant="contained" 
                    onClick={handleSubmit} 
                    style={{
                        color: '#fff', 
                        padding: '12px 30px', 
                        borderRadius: '8px', 
                        width: '100%',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"} // Hover effect
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  
                >
                    Submit
                </Button>
            </Paper>
        </div>
    );
}
