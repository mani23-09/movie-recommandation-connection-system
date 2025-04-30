import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";

export function Sel_movi() {
  const userg = localStorage.getItem("user");
  const roleg = localStorage.getItem("role");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getusermovi?user=${userg}&role=${roleg}`)
      .then((response) => {
        setMovies(response.data.message || []);
      })
      .catch((error) => {
        console.error("Error fetching recommended movies:", error);
        setMovies([]); // fallback to empty list
      });
  }, []);

  const handleGo = (movie, e) => {
    e.preventDefault();
    window.location.href = `http://localhost:3000/selmov?movie=${movie}`;
  };

  const handleDelete = (movie) => {
    axios
      .get(
        `http://localhost:5000/popedmovi?user=${userg}&&role=${roleg}&&movie=${movie}`
      )
      .then((response) => {
        alert(response.data.message);
        setMovies((prevMovies) => prevMovies.filter((m) => m !== movie));
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Selected Movies
      </Typography>

      <TableContainer component={Paper} elevation={6}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Movie Title
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      sx={{ cursor: "pointer", color: "#1976d2", textDecoration: "underline" }}
                      onClick={(e) => handleGo(movie, e)}
                    >
                      {movie}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(movie)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No movies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
