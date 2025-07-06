import React, {useEffect, useRef, useState} from 'react';
import NavBar from "./components/NavBar/NavBar.js";
import Box from "@mui/material/Box";
import {Route, Routes} from "react-router";
import Homepage from "./components/Pages/Homepage/Homepage";
import Timeline from "./components/Pages/Timeline/Timeline";
import Showdown from "./components/Pages/Showdown/Showdown";
import FAQ from "./components/Pages/FAQ/FAQ";
import Button from "@mui/material/Button";
import ChatBox from "./components/ChatBox/ChatBox";
import AudioBox from "./components/AudioBox/AudioBox";
import AssistantIcon from '@mui/icons-material/Assistant';
import Badge from '@mui/material/Badge';
import Cyforge from "./components/Pages/Cyforge/Cyforge";


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
                  <Route path="/timeline" element={<Timeline topRef={topRef}/>}/>
                  <Route path="/cyforge" element={<Cyforge/>}/>
                  <Route path="/showdown" element={<Showdown/>}/>
                  <Route path="/faq" element={<FAQ/>}/>
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
                      <AssistantIcon sx={{ transform: 'scaleX(-1)' }}/>
                  </Badge>
              </Button>
              <AudioBox/>
          </Box>
      );
}

export default App;
