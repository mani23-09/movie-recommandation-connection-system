import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import '../App.css'
const slides = [
  {
    title: 'Slide 1',
    image: 'https://picsum.photos/500/300?random=1',
    description: 'This is the first slide.',
  },
  {
    title: 'Slide 2',
    image: 'https://picsum.photos/500/300?random=2',
    description: 'This is the second slide.',
  },
  {
    title: 'Slide 3',
    image: 'https://picsum.photos/500/300?random=3',
    description: 'This is the third slide.',
  },
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically go to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Card sx={{ width: '500px', maxWidth: '100%', borderRadius: '10px' }}>
        <CardMedia
          component="img"
          alt={slides[currentSlide].title}
          height="300"
          image={slides[currentSlide].image}
          sx={{ borderRadius: '10px' }}
        />
      </Card>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {slides[currentSlide].title}
      </Typography>
      <Typography sx={{ textAlign: 'center', mb: 2 }}>
        {slides[currentSlide].description}
      </Typography>
    </Box>
  );
};

export default Slideshow;
