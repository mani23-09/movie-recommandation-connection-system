import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  CardMedia,
  Divider
} from "@mui/material";

export function Show_sel_movie() {
  const [data, setData] = useState(null);
  const [image, setImage] = useState('');
  const url = new URLSearchParams(window.location.search);
  const movie = url.get("movie");

  useEffect(() => {
    if (movie) {
      axios.get(`http://localhost:5000/returnmovie?movie=${movie}`)
        .then(res => {
          setData(res.data.message);
        })
        .catch(err => {
          console.error(err);
        });

      axios.get(`http://127.0.0.1:5000/hello?movie=${movie}`)
        .then(res => {
          setImage(res.data.url);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [movie]);

  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ display: 'flex', p: 2, borderRadius: 4, boxShadow: 5 }}>
        <CardMedia
          component="img"
          image={image}
          alt={data.movie_title}
          sx={{ width: 300, borderRadius: 2, objectFit: 'cover' }}
        />

        <CardContent sx={{ flex: 1, ml: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
            {data.movie_title}
          </Typography>
          <Typography variant="body1" gutterBottom>{data.movie_info}</Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><strong>Genre:</strong> {data.genre}</Typography>
              <Typography><strong>Director:</strong> {data.directors}</Typography>
              <Typography><strong>Cast:</strong> {data.cast}</Typography>
              <Typography><strong>Runtime:</strong> {data.runtime_in_minutes} mins</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography><strong>Release Date:</strong> {data.in_theaters_date}</Typography>
              <Typography><strong>Streaming Date:</strong> {data.on_streaming_date}</Typography>
              <Typography><strong>Audience Rating:</strong> {data.audience_rating}</Typography>
              <Typography>
                <strong>Tomatometer:</strong> {data.tomatometer_rating}% ({data.tomatometer_status})
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
