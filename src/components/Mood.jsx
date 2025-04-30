import React, { useState } from 'react';
import { LinearProgress, Slider, Box, Typography,Button, IconButton } from "@mui/material";
import { AccessAlarm ,AccessAlarmOutlined,ArrowBack,ArrowForward,SentimentDissatisfied,SentimentSatisfied,SentimentVerySatisfied} from '@mui/icons-material';
import { motion} from "framer-motion"
export const flexst={
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center',
}
const ProgressBar = () => {
  
  const [progress, setProgress] = useState(0);
  const [happy,setHappy]=useState(0)
  
  const br={
    borderRadius:'100vh',
  }
  const butst={
    height:'30vh',
    margin:'2vh',
    width:'30%',
    color:'white',
    fontWeight:'bold',
    fontSize:120,
    border:'none',
  }
  function GoGenre(){
    if(happy!==0){
      window.location=`/${btoa("genre")}?mood=${happy == 1 ? btoa("Happy") : happy == 2 ? btoa("Normal") :btoa("Sad")}`
    }
    else{
      alert('choce one');
    }
  }
  return (
    <Box 
      sx={{ 
        ...flexst,
        alignItems: 'center', 
        height: 'auto', 
        width: '100%' ,
        paddingBottom:10,
        background:'radial-gradient(#18dff5,#FFF)'
      }}

    >
      {/* Progress Bar */}
      <Box sx={{ width: '60%',height:'15vh',...flexst}}>
        <Typography variant="body1" align="center"></Typography>
        <LinearProgress variant="determinate" value={0} style={{...br,height:'3vh'}} />
      </Box>
      <Box sx={{ width: "60%", height: "10vh"}}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}>
        <Box sx={{width:'40%',height:'15px',background:'white',...br}}></Box><br />
        <Box sx={{width:'20%',height:'15px',background:'white',...br}}></Box>
      </Box>
      <Box sx={{ width: '60%',height:'15vh',...flexst}}>
        <Typography variant="body1" align="center">What is your Current Mood?</Typography>
      </Box>
      <Box sx={{ width: '60%',height:'40vh',...flexst,flexDirection:'row'}}>
      <Button
      variant="contained"
      color="primary"
      onClick={()=>setHappy(1)}
      sx={{ ...butst, background: happy == 1 ? "white": "#348ce9a8", color: happy === 1 ? "#348ce9a8": "white" }} // Removed duplicate spread
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.8 }}
    >
      <SentimentVerySatisfied style={{ fontSize: "20vh" }} /> {/* Fixed fontSize */}
    </Button>
    <Button
      variant="contained"
      color="primary"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onClick={()=>setHappy(2)}
      sx={{ ...butst, background: happy === 2 ? "white": "#348ce9a8", color: happy === 2 ? "#348ce9a8": "white" }}
      transition={{ duration: 1.8 }}
    >
      <SentimentSatisfied style={{ fontSize: "20vh" }} /> {/* Fixed fontSize */}
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={()=>setHappy(3)}
      sx={{ ...butst, background: happy == 3 ? "white": "#348ce9a8", color: happy == 3 ? "#348ce9a8": "white" }}
      initial={{ scale: 0.8, opacity: 0 }}

      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.8 }}
    >
      <SentimentDissatisfied style={{ fontSize: "20vh" }} /> {/* Fixed fontSize */}
    </Button>
      </Box>
      <Box sx={{...flexst,width:'60%',height:'15vh',flexDirection:'row'}}>
        <Box sx={{...butst,border:'none',fontSize:20}}>HAPPY
        <Box sx={{width:'60%',height:'10px',background:'white',...br,marginBottom:1}}></Box>
        <Box sx={{width:'30%',height:'10px',background:'white',...br}}></Box>
        </Box>
        <Box sx={{...butst,border:'none',fontSize:20}}>NORMAL
        <Box sx={{width:'60%',height:'10px',background:'white',...br,marginBottom:1}}></Box>
        <Box sx={{width:'30%',height:'10px',background:'white',...br}}></Box>
        </Box>
        <Box sx={{...butst,border:'none',fontSize:20}}>SAD
        <Box sx={{width:'60%',height:'10px',background:'white',...br,marginBottom:1}}></Box>
        <Box sx={{width:'30%',height:'10px',background:'white',...br}}></Box>
        </Box>
      </Box>
      <Box sx={{ width: '60%',height:'10vh',...flexst,flexDirection:'row'}}>
        <Box sx={{width:'50%'}}>
          <Button sx={{width:'10%',fontWeight:'bold',fontFamily:'Arial',color:'white'}} startIcon={<ArrowBack/>}>Back</Button>
        </Box>
        <Box sx={{width:'50%',textAlign:'right'}}>
        <Button variant='contained' onClick={(e)=>GoGenre(e.preventDefault())}  sx={{borderRadius:'10px',fontFamily:'Arial',width:'30%'}}>Next </Button>
        </Box>
      </Box>
      
    </Box>
  );
};

export default ProgressBar;  