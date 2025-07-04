import React, {useEffect, useState} from 'react';
import NavBar from "./components/NavBar/NavBar.js";
import Container from "@mui/material/Container";
import {Route, Routes} from "react-router";
import Homepage from "./components/Pages/Homepage/Homepage";
import AboutMe from "./components/Pages/AboutMe/AboutMe";
import Box from "@mui/material/Box";

function App() {
      const [message, setMessage] = useState('');

      useEffect(() => {
        fetch('/healthcheck')
          .then(response => response.json())
          .then(data => setMessage(data.message))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

      return (
        <Box className="App" sx={{bgcolor:'green', width:'100%', height:'100%'}}>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about_me" element={<AboutMe />} />
            </Routes>
        </Box>
      );
    }

    export default App;
