import React from "react";
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import Mood from "./components/Mood";
import Genre from "./components/Genre";
import Resultpage from "./components/Resultpage";
import { Dashboard_audience } from './components/Dashboard_audience';
import Signup from "./components/Signup";
import Cool from "./components/Cool";
import ResultStudio from "./components/resStudio";
import { Chatbot } from "./components/Chatbot";


function App() {
  return (
    <Router>
    <Routes>
        <Route path="/signup" Component={Signup}/>
        <Route path="/" Component={Dashboard_audience}/>
        <Route path={btoa("mood")} Component={Mood}/>
        <Route path={"/star"} Component={Chatbot}/>
        <Route path={`${btoa('genre')}`} Component={Genre}/>
        <Route path={`result`} Component={Resultpage}/>
        <Route path={`resstudio`} Component={ResultStudio}/>
        <Route path={`cool`} Component={Cool}/>
      </Routes>
    </Router>
  );
}

export default App;
