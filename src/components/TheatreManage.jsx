import React from 'react';
import { Grid, Paper, Button, Box, Typography } from '@mui/material';
import '../App.css'
const ThreePaperRowManual = () => {
  const handleClick = (title) => {
    window.location.href=`/theatre${title}`
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {/* Paper 1 */}
        <Grid item xs={12} sm={4}>
          <div className="flip-container">
            <div className="flipper">
              {/* Front: Text Content */}
              <Paper className="front" elevation={4}>
                <Typography variant="h6" fontWeight="bold">
                  ADD MOVIE
                </Typography>
                <Typography variant="body2">
                Adding a movie to a theatre involves selecting the movie and scheduling its showtime. This typically includes details like the movie's title, duration, and language. Once the movie is chosen, you assign it to a specific theatre or screening room and set the showtime. This helps the theatre manage its schedule and ensures that customers can book tickets for the right movie at the right time.
                </Typography>
              </Paper>

              {/* Back: Image + Button */}
              <Paper
                className="back"
                elevation={4}
                sx={{
                  backgroundImage: `url(https://staticg.sportskeeda.com/editor/2023/03/86193-16802630398623-1920.jpg?w=840)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick('add')}
                >
                  ADD MOVIE
                </Button>
              </Paper>
            </div>
          </div>
        </Grid>

        {/* Paper 2 */}
        <Grid item xs={12} sm={4}>
          <div className="flip-container">
            <div className="flipper">
              <Paper className="front" elevation={4}>
                <Typography variant="h6" fontWeight="bold">
                  Update Movie
                </Typography>
                <Typography variant="body2">
                Adding a movie to a theatre involves a few simple steps. First, you select the movie you want to show and gather key details such as the title, genre, duration, and language. Then, you schedule the movie by assigning it to a specific theatre or screening room. This also includes setting the showtimes, so customers know when the movie will be available. By doing this, the theatre can ensure smooth operations, provide accurate movie listings, and offer customers the ability to book tickets for their desired shows at the right time.
                </Typography>
              </Paper>
              <Paper
                className="back"
                elevation={4}
                sx={{
                  backgroundImage: `url(https://thumbs.dreamstime.com/z/dvd-movie-collection-studio-shot-21821993.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick('update')}
                >
                  UPDATE
                </Button>
              </Paper>
            </div>
          </div>
        </Grid>

        {/* Paper 3 */}
        <Grid item xs={12} sm={4}>
          <div className="flip-container">
            <div className="flipper">
              <Paper className="front" elevation={4}>
                <Typography variant="h6" fontWeight="bold">
                  Delete Movie
                </Typography>
                <Typography variant="body2">
                To delete a movie from a theatre, you need to remove it from the theatre's schedule or database. This involves selecting the movie you want to delete and ensuring that it's no longer assigned to any upcoming showtimes. Once identified, the movie is removed from the system, which means it will no longer appear in the showtime listings. This helps keep the schedule up-to-date and ensures that customers cannot book tickets for movies that are no longer being shown. Additionally, any associated data, such as showtimes, ticket sales, or promotional offers, may also be cleared to prevent confusion.
                </Typography>
              </Paper>
              <Paper
                className="back"
                elevation={4}
                sx={{
                  backgroundImage: `url(https://i.pinimg.com/736x/30/27/ac/3027ac189c6c5ffb667ee17e51f5597a.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick('delete')}
                >
                  Delete
                </Button>
              </Paper>
            </div>
          </div>
        </Grid>
      </Grid>

      {/* Flip Card CSS */}
      <style>{`
        .flip-container {
          perspective: 1000px;
          width: 100%;
          height: 300px;
        }

        .flipper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: 0.6s;
        }

        .flip-container:hover .flipper {
          transform: rotateY(180deg);
        }

        .front, .back {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          backface-visibility: hidden;
        }

        .back {
          transform: rotateY(180deg);
          color: white;
          background-color: #333;
        }

        .back button {
          margin-top: auto;
          background-color: rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </Box>
  );
};

export default ThreePaperRowManual;
