import React, {useEffect, useState} from 'react';
import NavBar from "./components/NavBar/NavBar.js";
import Container from "@mui/material/Container";
import ChatBox from "./components/ChatBox/ChatBox";
import NewVisitorModal from "./components/NewVisitorModal/NewVisitorModal";
import ContentBox from "./components/ContentBox/ContentBox";

function App() {
      const [message, setMessage] = useState('');

      useEffect(() => {
        fetch('/healthcheck')
          .then(response => response.json())
          .then(data => setMessage(data.message))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

      return (
        <div className="App">
            <NewVisitorModal/>
            <NavBar/>
            <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 4, gap: 4 }}
            >
                <ContentBox sx={{border: 1,padding: "1rem", borderRadius: 1}} text={'Matt'}/>
                <ChatBox/>
            </Container>
        </div>
      );
    }

    export default App;
