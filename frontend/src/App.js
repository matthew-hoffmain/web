import React, {useEffect, useRef, useState} from 'react';
import NavBar from "./components/NavBar/NavBar.js";
import Box from "@mui/material/Box";
import {Route, Routes} from "react-router";
import Homepage from "./components/Pages/Homepage/Homepage";
import AboutMe from "./components/Pages/AboutMe/AboutMe";
import Showdown from "./components/Pages/Showdown/Showdown";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ChatIcon from '@mui/icons-material/Chat';
import ChatBox from "./components/ChatBox/ChatBox";
import Badge from '@mui/material/Badge';

function App() {

    const topRef = useRef(null);
    const [message, setMessage] = useState('');
    const [showVirgilBox, setShowVirgilBox] = useState(false);

      useEffect(() => {
        fetch('/healthcheck')
          .then(response => response.json())
          .then(data => setMessage(data.message))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

      return (
          <Box className="App" sx={{bgcolor: '#cccccc', width: '100%', minHeight: '100vh'}}>
              <div ref={topRef}/>
              <NavBar/>
              <Routes>
                  <Route path="/" element={<Homepage/>}/>
                  <Route path="/about_me" element={<AboutMe topRef={topRef}/>}/>
                  <Route path="/showdown" element={<Showdown/>}/>
              </Routes>

              {showVirgilBox && (
                  <ChatBox/>
              )}

              <Button
                  sx={{
                      minWidth: 40,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'block',
                      backgroundColor: '#222',
                      color: '#ffffff',
                      '&:hover': {
                          backgroundColor: '#444',
                      },
                      position: 'fixed',
                      bottom: 24,
                      right: 24,
                      zIndex: 1301,
                      p: 0,
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => setShowVirgilBox(prev => !prev)}
              >
                  <Badge badgeContent={'1'} color="secondary"
                         anchorOrigin={{
                             vertical: 'top',
                             horizontal: 'left',
                         }}>
                      <ChatIcon sx={{ transform: 'scaleX(-1)' }}/>
                  </Badge>
              </Button>
          </Box>
      );
}

export default App;
