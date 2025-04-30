import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  BottomNavigation,
  BottomNavigationAction,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography

} from "@mui/material";
import '../App.css'
import { Home, Movie, Favorite, Person, Chat, Add, ManageAccounts, BuildCircle } from "@mui/icons-material"; 
import axios from "axios";
import myImage from '../assets/IMDB_Logo.png';
import '../components/Dashboard_audience.css';
import { Sel_movi } from "./Sel_movi";
import { linearGradient } from "framer-motion/client";
import { Spec_User } from "./Spec_user";
import { UpdateProfileForm } from "./Update_user";
import { AddMovieForm } from "./Movie_manage";
import { Update_movie } from "./Update_movie";
import MovieManager from "./Movie_Handle";
import TheatreManager from "./Theatre_manager";
import ThreePaperRowManual from "./TheatreManage";
import Slideshow from "./Predict_t_m";

export function Dashboard_audience() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); 
  const [mobile, setMobile] = useState(""); 
  const [error, setError] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") || "user");
  const [topActors, setTopActors] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/studio")
      .then((response) => {
        setTopActors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top actors:", error);
      });

    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleClickOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);
  
  const handleClickOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);

  const handleSignIn = async () => {
    try {
      const response = await axios.get("http://localhost:5000/signin", {
        params: { username, password, role },
      });
      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", username);
        localStorage.setItem("pass", password);
        localStorage.setItem("role", role);
        setIsLoggedIn(true);
        setOpenSignIn(false);
        setRole(localStorage.getItem("role"))
      }
    } catch (error) {
      setError("Invalid username, password, or role.");
    }
  };
  const handleProfileClick=(e)=>{
    e.preventDefault();
    window.location.href='/specuser'
  }
  const handleProfileClick2=(e)=>{
    e.preventDefault();
    window.location.href='/theatremanager'
  }
  const handleProfileClick3=(e)=>{
    e.preventDefault();
    window.location.href='/moviemanager'
  }
  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("pass");
    setIsLoggedIn(false); 
    window.location.reload(); 
  };

  const handleStudios = (studio) => {
    if (studio) {
      window.location.href = `http://localhost:3000/resstudio?studioname=${btoa(studio)}`;
    }
  };

  

  const handleSignUp = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/signup?username=${username}&password=${password}&email=${email}&mobile=${mobile}&role=${role}`
      );
      if (response.status === 201) {
        setError("Sign-up successful! You can now log in.");
        setOpenSignUp(false);
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (error) {
      setError("Sign-up failed.");
    }
  };

  return (
    <div style={{ background: "gray", position: "relative" }}>
      <div id="header" style={{paddingBottom:150}}>
        <div className="container">
          <nav>
            <a href={btoa("mood")}>
              <img src={myImage} alt="IMDB Logo" width="300" />
            </a>
            <ul id="homenu">
              <li>
                <a href="#">Top Studios</a>
                <ul>
                  {topActors.map((studio, index) => (
                    <li key={index} style={{ fontSize: 7 }}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleStudios(studio.studio);
                        }}
                      >
                        {studio.studio}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <div className="button-container">
              {!isLoggedIn ? (
                <>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={handleClickOpenSignIn}
                    className="btn"
                  >
                    Sign in
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={handleClickOpenSignUp}
                    className="btn"
                  >
                    Sign Up
                  </a>
                </>
              ) : (
                <a
                  style={{ cursor: "pointer" }}
                  onClick={handleSignOut}
                  className="btn"
                >
                  Sign Out
                </a>
              )}
            </div>
          </nav>
          <div>
            <div className="header-text" style={{ color: "white"  }}>
              <h1>Movies Recommendation</h1>
              <h2>
                Overwhelmed by endless streaming choices? <br /> Let us help you
                pick the perfect movie!
              </h2>
            </div>
            <a href={btoa("mood")} className="btn1">
              Discover Movies
            </a>
          </div>
        </div>
      </div>
      
      {role=="user" || value==0 && 
      <>
      <div className="contents" style={{color:'white',marginTop:50}}>
      <h3>The Ultimate Movie Picker by IMDb</h3>
      <p>We all love watching movies, but choosing the right one can feel like an endless quest. From scrolling through streaming platforms to debating IMDb ratings, picking the perfect film often eats into your movie time. Sound familiar?
        With IMDb’s smart movie recommendation engine, your decision-making just got a whole lot easier!</p>
      <h3>Why Choose IMDb’s Movie Recommendation Engine?</h3>
      <ul className="why">
        <li><span>Curated Selections:</span> All movies are carefully handpicked by movie buffs to ensure top-quality suggestions</li>
        <li><span>Mood-Based Picks:</span> Get recommendations that perfectly match your vibe and occasion</li>
        <li><span>Integrated Trailers:</span> Watch movie trailers directly on our platform before making your choice</li>
        <li><span>Streamlined Decisions:</span> One movie suggestion at a time—no endless lists, just clarity</li>
        <li><span>Regular Updates:</span> New movies are added frequently to keep things fresh</li>
        <li><span>Special Date Picks:</span> Impress your crush with our handpicked date-perfect movie suggestions</li>
      </ul>
      <h3>Simplify Your Movie Nights</h3>
      <p>Our quiz-based movie picker is designed to match your mood, occasion, and preferences in just a few clicks. 
        Whether you're flying solo, hosting a movie night with friends, or planning a cozy date, IMDb’s tool will guide 
        you to the perfect film.
      </p>
      <h3>Ready to find your next favorite movie? Let IMDb’s smart movie picker do the work while you sit back 
        and enjoy the show!
      </h3>
    </div>
      </>
      }

      {isLoggedIn && (
        <div className="role-content" style={{ padding: "20px", color: "white" }}>
          {role === "Client" && value===6 && <h1>Show Profile</h1>}
          {role === "Director" && <p>Welcome, Director! Manage your projects and view your filmography.</p>}
          {role === "Producer" && <p>Welcome, Producer! Check out the latest projects and collaborate with directors.</p>}
          {role === "Theatre Admin" && <p>Welcome, Theatre Admin! Manage your theatre schedules and bookings.</p>}
          {role === "admin" && <p>Welcome, Admin! You have full access to manage users and content.</p>}
        </div>
      )}

    

      {/* ➕ Favorites Section (Shown when value === 2) */}
      {value === 3 && isLoggedIn && (
        <>
        <Sel_movi/>
        </>
      )}
      {value === 5 && isLoggedIn && (
        <>
        <Slideshow/>
        </>
      )}
      {value === 4 && isLoggedIn && (
        <>
        <ThreePaperRowManual/>
        </>
      )}
      {value === 1 && isLoggedIn && (
        <>
        <Box
          className="a1"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: 2,
            p: 3,
            width: 'auto',
            boxShadow: 2,
            m: 'auto',
            mt: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'justify' }}>
            The <strong>"Add Theatre Admin"</strong> feature allows you to register a new user with
            administrative privileges for a specific theatre. By providing details such as username,
            password, email, mobile number, and the theatre's name, a new user can be added to the system
            with a role of <strong>"Theatre Admin"</strong>. This user will have control over managing
            theatre-specific operations, such as scheduling, movie listings, and handling customer
            requests. The system also generates a unique avatar for the admin, using the username as a
            seed for a custom emoji, giving each admin a personalized profile image. This functionality
            ensures that only authorized users are able to manage the theatre operations, maintaining
            secure and efficient management of the theatre system. If the username already exists, the
            system prevents duplicate entries to avoid conflicts and ensure data integrity.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfileClick2}
            sx={{ width: 'fit-content' }}
          >
            Add User
          </Button>
        </Box>
      </>
      
      )}
       {value === 2 && isLoggedIn && (
        <>
        <Box
          className="a2"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: 2,
            p: 3,
            width: 'auto',
            boxShadow: 2,
            m: 'auto',
            mt: 4,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
          The "Manage Movies" page empowers authorized users, such as directors, producers, or admins, to efficiently handle movie records in the system. This feature allows users to add new movies, update existing entries, or delete outdated or incorrect information. The form captures essential details like the movie title, genre, language, release date, duration, cast, director, and a brief description. Users can also upload a poster image and trailer link to enhance visual appeal. All changes are reflected in the backend database, ensuring that the movie list remains accurate, up-to-date, and relevant for viewers and theatre admins based on their role permissions.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfileClick3}
            sx={{ width: 'auto' }} // Button width can be auto or fixed
          >
            Manage movie
          </Button>
        </Box>
        </>
      )}
{value === 6 && isLoggedIn && (
        <Box
        className="a3"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #ccc',
          borderRadius: 2,
          p: 3,
          width: 'auto',
          boxShadow: 2,
          m: 'auto',
          mt: 4,
        }}
      >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
          By clicking the button below, you can view your personal profile, explore other users in the system, and easily contact them via email or phone. Stay connected and get to know more people within the platform
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfileClick}
            sx={{ width: 'auto' }} // Button width can be auto or fixed
          >
            Show Profile
          </Button>
        </Box>
      )}
      {/* Sign In Dialog */}
      <Dialog open={openSignIn} onClose={handleCloseSignIn}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="Client">Client</MenuItem>
              <MenuItem value="Director">Director</MenuItem>
              <MenuItem value="Producer">Producer</MenuItem>
              <MenuItem value="Theatre Admin">Theatre Admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignIn} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSignIn} color="primary">
            Sign In
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sign Up Dialog */}
      <Dialog open={openSignUp} onClose={handleCloseSignUp}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Mobile Number"
            type="text"
            fullWidth
            variant="outlined"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="Client">Client</MenuItem>
              <MenuItem value="Director">Director</MenuItem>
              <MenuItem value="Producer">Producer</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignUp} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSignUp} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
      <div className="copyright">
        
      <p onClick={()=>alert(value)}>Copyright @ Team <i className="fa-solid fa-heart"></i></p>
    </div>
      {/* Bottom Navigation Bar */}
      {isLoggedIn && (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          showLabels
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            backgroundColor: "rgb(51 51 51 / 60%)",
            color: "white",
          }}
        >
          <BottomNavigationAction label="Home" icon={<Home />} />
          {/* <BottomNavigationAction label="Movie Bot" icon={<Chat />} /> */}
          
          {role === "admin" && (
            <BottomNavigationAction label="Add theatre_owner" icon={<Add/>} />
          )}
          {role === "admin" && (
            <BottomNavigationAction label="Add movie"  icon={<Add/>} />
          )}
          {["Client", "Director", "Producer","admin"].includes(role)  && (
            <BottomNavigationAction label="Favorites" icon={<Favorite />} />
          )}
          {role === "Theatre Admin" && (
            <BottomNavigationAction label="Theatre Management" icon={ <BuildCircle
              sx={{
                background: "linear-gradient(to right, red, green)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            />}  />
          )}
          {role === "Theatre Admin" && (
            <BottomNavigationAction label="predict movie" icon={<Movie />} />
          )}
          <BottomNavigationAction label="DashBoard" icon={<Favorite />} />
        </BottomNavigation>
      )}
    </div>
  );
}
